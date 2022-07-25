from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import flask

import utils

app = flask.Flask("sim_atlas")
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///simatlas.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route("/api/faults", methods=["GET"])
def get_faults():
    from models import Fault, HistoricEvent

    faults = Fault.query.all()
    fault_traces = [
        {
            "name": fault.name,
            "tectonic_type": fault.tectonic_type,
            "video": fault.video,
            "realname": fault.realname,
            "magnitude": fault.magnitude,
            "prob": fault.prob,
            "dip": fault.dip,
            "rake": fault.rake,
            "dtop": fault.dtop,
            "planes": [
                [[trace.trace_lat, trace.trace_lon] for trace in plane.fault_traces]
                for plane in fault.fault_planes
            ],
            "pga_img": utils.exist_pga_pgv_image("pga", fault.name),
            "pgv_img": utils.exist_pga_pgv_image("pgv", fault.name),
        }
        for fault in faults
    ]

    events = HistoricEvent.query.all()
    historic_events = [
        {
            "public_id": event.public_id,
            "date": event.date,
            "latitude": event.latitude,
            "longitude": event.longitude,
            "magnitude": event.magnitude,
        }
        for event in events
    ]

    return flask.jsonify(
        {"fault_traces": fault_traces, "historic_events": historic_events}
    )
