import React, { Fragment, memo } from "react";

import { Polygon, Popup, useMap } from "react-leaflet";

import * as CONSTANTS from "constants/Constants";

import {
  customMouseOverOutAction,
  colorCode,
  customOnClick,
  googleAnalytics,
  getPlaneWeight,
} from "utils/Utils";

const Faults = ({ faultsTraces, faultsType }) => {
  const map = useMap();

  return (
    <Fragment>
      {faultsTraces.map((fault, index) => {
        return (
          <Polygon
            id={fault["name"]}
            key={index}
            pathOptions={{
              color:
                faultsType === "tectonic_type"
                  ? CONSTANTS.TECTONIC_COLOR[fault[faultsType]]
                  : colorCode(faultsType, fault[faultsType]),
              opacity: faultsType === "tectonic_type" ? 0.5 : 0.9,
              weight: getPlaneWeight(fault["planes"]),
              fillOpacity: CONSTANTS.fopa,
            }}
            positions={fault["planes"]}
            eventHandlers={{
              mouseover: (e) => {
                customMouseOverOutAction(
                  e,
                  1,
                  3 * CONSTANTS.fopa,
                  getPlaneWeight(fault["planes"]) === 5 ? 5 : 3
                );
              },
              mouseout: (e) => {
                customMouseOverOutAction(
                  e,
                  CONSTANTS.opa,
                  CONSTANTS.fopa,
                  getPlaneWeight(fault["planes"]) === 5 ? 5 : 1
                );
              },
              click: (e) => {
                customOnClick(
                  e,
                  fault,
                  map,
                  CONSTANTS.opa * 2,
                  0,
                  getPlaneWeight(fault["planes"]) === 5 ? 5 : 3
                );
                googleAnalytics("User", "Fault clicked", fault.name);
              },
            }}
          >
            <Popup>
              <b>Fault Name: {fault["realname"] ? fault["realname"] : ""}</b> [
              {fault["name"]}] <br />
              Tectonic Type: {fault["tectonic_type"]}
              <br />
              Magnitude: {fault["magnitude"]}Mw
              <br />
              Avg. Rake: {fault["rake"]}&deg;
              <br />
              Avg. Dip: {fault["dip"]}&deg;
              <br />
              Rupture Top Depth: {fault["dtop"]}km
              <br />
              Probability in 50 years: {fault["prob"].toFixed(2)}% <br />
              {/* 
              PGA/PGV images and YouTube simulation videos might not be available for every
              fault, hence only display the labels if they are available.
              */}
              {fault["pgv_img"] ? (
                <Fragment>
                  <a
                    href={
                      process.env.REACT_APP_STATIC_DATA +
                      "/data/pgv/" +
                      fault["name"] +
                      "_PGV.png"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Peak Ground Velocity (PGV)
                  </a>
                  <br />
                </Fragment>
              ) : null}
              {fault["pga_img"] ? (
                <Fragment>
                  <a
                    href={
                      process.env.REACT_APP_STATIC_DATA +
                      "/data/pga/" +
                      fault["name"] +
                      "_PGA.png"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Peak Ground Acceleration (PGA)
                  </a>
                  <br />
                </Fragment>
              ) : null}
              {fault["video"] ? (
                <Fragment>
                  <a
                    href={fault["video"]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Simulation Video
                  </a>
                  <br />
                </Fragment>
              ) : null}
            </Popup>
          </Polygon>
        );
      })}
    </Fragment>
  );
};

export default memo(Faults);
