import datetime

import pytz

import server


class Fault(server.db.Model):
    id = server.db.Column(server.db.Integer, primary_key=True, autoincrement=True)
    name = server.db.Column(server.db.VARCHAR(255), nullable=False, unique=True)
    tectonic_type = server.db.Column(server.db.VARCHAR(32), nullable=False)
    realname = server.db.Column(server.db.VARCHAR(255), nullable=True)
    magnitude = server.db.Column(server.db.Float, nullable=True)
    prob = server.db.Column(server.db.Float, nullable=True)
    video = server.db.Column(server.db.VARCHAR(255), nullable=True)
    rake = server.db.Column(server.db.Float, nullable=True)
    dip = server.db.Column(server.db.Float, nullable=True)
    dtop = server.db.Column(server.db.Float, nullable=True)
    fault_planes = server.db.relationship(
        "FaultPlane", back_populates="fault", lazy=True
    )

    def __init__(
        self,
        name,
        tectonic_type,
        realname=None,
        magnitude=None,
        prob=None,
        video=None,
        rake=None,
        dip=None,
        dtop=None,
    ):
        self.name = name
        self.tectonic_type = tectonic_type
        self.realname = realname
        self.magnitude = magnitude
        self.prob = prob
        self.video = video
        self.rake = rake
        self.dip = dip
        self.dtop = dtop


class FaultPlane(server.db.Model):
    id = server.db.Column(server.db.Integer, primary_key=True, autoincrement=True)
    fault_id = server.db.Column(server.db.Integer, server.db.ForeignKey("fault.id"))
    fault = server.db.relationship("Fault", back_populates="fault_planes")
    fault_traces = server.db.relationship("FaultTrace", back_populates="fault_plane")

    def __init__(self, fault):
        self.fault = fault


class FaultTrace(server.db.Model):
    id = server.db.Column(server.db.Integer, primary_key=True, autoincrement=True)
    trace_lat = server.db.Column(server.db.Float)
    trace_lon = server.db.Column(server.db.Float)
    plane_id = server.db.Column(
        server.db.Integer, server.db.ForeignKey("fault_plane.id")
    )
    fault_plane = server.db.relationship("FaultPlane", back_populates="fault_traces")

    def __init__(self, fault_plane, trace_lat, trace_lon):
        self.fault_plane = fault_plane
        self.trace_lat = trace_lat
        self.trace_lon = trace_lon


class HistoricEvent(server.db.Model):
    id = server.db.Column(server.db.Integer, primary_key=True, autoincrement=True)
    public_id = server.db.Column(server.db.VARCHAR(12))
    date = server.db.Column(server.db.VARCHAR(19))
    latitude = server.db.Column(server.db.Float)
    longitude = server.db.Column(server.db.Float)
    magnitude = server.db.Column(server.db.Float)

    def __init__(self, public_id, date_str, latitude, longitude, magnitude):
        self.public_id = public_id
        self.date = self.convert_timezone(date_str)
        self.latitude = latitude
        self.longitude = longitude
        self.magnitude = magnitude

    def convert_timezone(self, date_str):
        nz_timezone = pytz.timezone("Pacific/Auckland")
        utc_time = datetime.datetime.strptime(date_str, "%Y%m%d%H%M%S").replace(
            tzinfo=pytz.utc
        )
        return utc_time.astimezone(nz_timezone).strftime("%Y-%m-%d/%H:%M:%S")
