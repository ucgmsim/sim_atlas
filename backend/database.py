import pathlib
import ast
import csv
import os

from google.oauth2 import service_account
from dotenv import load_dotenv
import gspread

from qcore import nhm
import server
import models


class GoogleSheet:
    def __init__(self):
        load_dotenv()
        # use creds to create a client to interact with the Google Drive API
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive",
        ]
        variable_keys = {
            "type": os.environ.get("type"),
            "project_id": os.environ.get("project_id"),
            "private_key_id": os.environ.get("private_key_id"),
            "private_key": os.environ.get("private_key"),
            "client_email": os.environ.get("client_email"),
            "client_id": os.environ.get("client_id"),
            "auth_uri": os.environ.get("auth_uri"),
            "token_uri": os.environ.get("token_uri"),
            "auth_provider_x509_cert_url": os.environ.get(
                "auth_provider_x509_cert_url"
            ),
            "client_x509_cert_url": os.environ.get("client_x509_cert_url"),
        }

        creds = service_account.Credentials.from_service_account_info(
            variable_keys, scopes=scope
        )

        google_sheets = gspread.authorize(creds)

        # Find a workbook by name and open the first sheet
        # Make sure you use the right name here.
        self.sheet = google_sheets.open("SimAtlas Manager").sheet1


def update_database(db, event_csv_file, nhm_data):
    """insert data from google spreadsheet into the db"""
    google_sheet = GoogleSheet()

    fault_dict_list = google_sheet.sheet.get_all_records()
    for row in fault_dict_list:
        fault = models.Fault(
            row["name"],
            row["tectonic_type"],
            row["realname"],
            row["magnitude"],
            row["prob"],
            row["video"],
            nhm_data[row["name"]].rake,
            nhm_data[row["name"]].dip,
            nhm_data[row["name"]].dtop,
        )
        db.session.add(fault)
        fault_planes_csv = row["planes"].replace(
            "|", ","
        )  # | was used in CSV to avoid confusion
        fault_planes = ast.literal_eval(fault_planes_csv)
        for plane in fault_planes:
            fault_plane = models.FaultPlane(fault)
            db.session.add(fault_plane)
            for trace_lat, trace_lon in plane:
                fault_trace = models.FaultTrace(fault_plane, trace_lat, trace_lon)
                db.session.add(fault_trace)

    with open(event_csv_file, mode="r") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for event in csv_reader:
            historic_event = models.HistoricEvent(
                event["PublicID"],
                event["Date"],
                event["Latitude"],
                event["Longitude"],
                event["Mw"],
            )
            db.session.add(historic_event)
    db.session.commit()
    print("DB creation success")


if __name__ == "__main__":
    data_dir = pathlib.Path(__file__).resolve().parent / "data"
    csv_file = str(data_dir / "GeoNet_CMT_solutions_July_2022.csv")

    nhm_data = nhm.load_nhm(str(data_dir / "NZ_FLTmodel_2010.txt"))

    # Remove the old data then create a new one
    server.db.drop_all()
    server.db.create_all()
    update_database(server.db, csv_file, nhm_data)
