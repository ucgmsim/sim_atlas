import pathlib
import datetime
import csv

from obspy.imaging.beachball import beachball
import matplotlib.pyplot as plt
import pandas as pd
import pytz


def create_beach_balls(geonet_data: pd.DataFrame, beachball_path: pathlib.Path):
    """Create beach ball images and store some information to csv
    based on a given moment tensor information
    """
    beach_balls = []
    for _, row in geonet_data.iterrows():
        if row["Mw"] < 5:
            face_color = [0.25, 0.41, 0.88]  # royal blue
        elif 5 <= row["Mw"] < 6:
            face_color = [0.32, 0.44, 0.21]  # green (fenway grass)
        elif 6 <= row["Mw"] < 7:
            face_color = [0.99, 0.71, 0.08]  # deep yellow (packer gold)
        else:  # 7 <= Mw
            face_color = [0.75, 0.15, 0.15]

        file_name = f"{row['PublicID']}.png"

        width = 100
        # Obspy does not close the fig in the end
        # as we want to save the file instead of getting anything returned.
        # We pass the fig and close it after.
        # Otherwise, we will face a runtime warning
        # which could potentially lead us to crash the script
        fig = plt.figure(figsize=(3, 3), dpi=100)
        fig.subplots_adjust(left=0, bottom=0, right=1, top=1)
        fig.set_figheight(width // 100)
        fig.set_figwidth(width // 100)
        beachball(
            [
                float(row["strike1"]),
                float(row["dip1"]),
                float(row["rake1"]),
                float(row["strike2"]),
                float(row["dip2"]),
                float(row["rake2"]),
            ],
            facecolor=face_color,
            bgcolor=[0.8, 0.8, 0.8],
            width=width,
            outfile=f"{beachball_path}/{file_name}",
            fig=fig,
        )
        plt.close(fig)

        nz_timezone = pytz.timezone("Pacific/Auckland")
        utc_time = datetime.datetime.strptime(str(row["Date"]), "%Y%m%d%H%M%S").replace(
            tzinfo=pytz.utc
        )

        beach_balls.append(
            {
                "id": row["PublicID"],
                "date": utc_time.astimezone(nz_timezone).strftime("%Y-%m-%d %H:%M:%S"),
                "mw": row["Mw"],
                "lat": f"{row['Latitude']:.4f}",
                "lon": f"{row['Longitude']:.4f}",
                "img": file_name,
            }
        )

    return beach_balls


if __name__ == "__main__":
    # Beachball path which is in the frontend
    root_repo_path = pathlib.Path(__file__).resolve().parent.parent.parent
    beachball_path = (
        root_repo_path / "frontend" / "src" / "assets" / "images" / "beachballs"
    )
    beachball_path.mkdir(parents=True, exist_ok=True)

    beachballs = create_beach_balls(
        pd.read_csv(
            root_repo_path / "backend" / "data" / "GeoNet_CMT_solutions_July_2022.csv"
        ),
        beachball_path,
    )

    with open("Beachballs.csv", "w") as csvfile:
        writer = csv.DictWriter(
            csvfile, fieldnames=["id", "date", "mw", "lat", "lon", "img"]
        )
        writer.writeheader()
        for x in beachballs:
            writer.writerow(x)
