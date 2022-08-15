import React, { useContext, useState, useEffect, useRef, memo } from "react";

import L from "leaflet";
import {
  MapContainer,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { useSearchParams } from "react-router-dom";

import { GlobalContext } from "context";
import * as CONSTANTS from "constants/Constants";

import { CustomSelect, Faults, HistoricEvents, LeafletTiles } from "components";
import { googleAnalytics } from "utils/Utils";

import "assets/style/SimAtlas.css";
import logo from "assets/images/qc_st_logo.png";

const MapEventsHandler = () => {
  const {
    setSelectedBaseLayer,
    setBelowFiveMagCheckbox,
    setBetwFiveSixMagCheckbox,
    setBetwSixSevenMagCheckbox,
    setOverSevenMagCheckbox,
  } = useContext(GlobalContext);
  const leafletContext = useLeafletContext();

  // To add the Tetonic Util Info to the map at the very first rendering
  useEffect(() => {
    if (leafletContext.map) {
      CONSTANTS.tectonicUtilInfo.addTo(leafletContext.map);
    }
  }, [leafletContext]);

  const map = useMapEvents({
    baselayerchange: (e) => {
      if (e.name === "Tectonic") {
        setSelectedBaseLayer("Tectonic");
        CONSTANTS.tectonicUtilInfo.addTo(leafletContext.map);
        leafletContext.map.removeControl(CONSTANTS.probabilityUtilInfo);
        leafletContext.map.removeControl(CONSTANTS.magnitudeUtilInfo);
      } else if (e.name === "Probability") {
        setSelectedBaseLayer("Probability");
        CONSTANTS.probabilityUtilInfo.addTo(leafletContext.map);
        leafletContext.map.removeControl(CONSTANTS.tectonicUtilInfo);
        leafletContext.map.removeControl(CONSTANTS.magnitudeUtilInfo);
      } else if (e.name === "Magnitude") {
        setSelectedBaseLayer("Magnitude");
        CONSTANTS.magnitudeUtilInfo.addTo(leafletContext.map);
        leafletContext.map.removeControl(CONSTANTS.tectonicUtilInfo);
        leafletContext.map.removeControl(CONSTANTS.probabilityUtilInfo);
      }

      if (["Tectonic", "Probability", "Magnitude"].includes(e.name)) {
        googleAnalytics("User", "Baselayer - Faults changed", e.name);
      } else {
        googleAnalytics("User", "Map layer colour changed", e.name);
      }
    },

    // When overlays checkbox gets checked
    overlayadd: (e) => {
      googleAnalytics("User", "Overlayer - Historical data added", e.name);
      if (e.name === "Events (Below Mw 5)") {
        setBelowFiveMagCheckbox(true);
      } else if (e.name === "Events (Mw in [5,6])") {
        setBetwFiveSixMagCheckbox(true);
      } else if (e.name === "Events (Mw in [6,7])") {
        setBetwSixSevenMagCheckbox(true);
      } else if (e.name === "Events (Over Mw 7)") {
        setOverSevenMagCheckbox(true);
      }
    },

    // When overlays checkbox gets unchecked
    overlayremove: (e) => {
      if (e.name === "Events (Below Mw 5)") {
        setBelowFiveMagCheckbox(false);
      } else if (e.name === "Events (Mw in [5,6])") {
        setBetwFiveSixMagCheckbox(false);
      } else if (e.name === "Events (Mw in [6,7])") {
        setBetwSixSevenMagCheckbox(false);
      } else if (e.name === "Events (Over Mw 7)") {
        setOverSevenMagCheckbox(false);
      }
    },
  });

  return null;
};

const SimAtlas = () => {
  const {
    selectedBaseLayer,
    selectFltOptions,
    belowFiveMag,
    betwFiveSixMag,
    betwSixSevenMag,
    overSevenMag,
    faultsTraces,
    belowFiveMagCheckbox,
    betwFiveSixMagCheckbox,
    betwSixSevenMagCheckbox,
    overSevenMagCheckbox,
  } = useContext(GlobalContext);

  let tectTypeRef = useRef();
  let probRef = useRef();
  let magRef = useRef();

  const [map, setMap] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFromOutside, setIsFromOutside] = useState(
    searchParams.get("query") ? true : false
  );
  const [refs, setRefs] = useState({
    Tectonic: tectTypeRef,
    Probability: probRef,
    Magnitude: magRef,
  });

  /* 
  I could not find a better way of triggering flyToFault function
  The leaflet itself doesn't have a feature to see if rendering is finished
  Hence, it is currently hard-coded. Ideally, we want to trigger
  flyToFault function after every child component gets rendered.
  */
  useEffect(() => {
    const searchedRupture = searchParams.get("query");
    if (isFromOutside && searchedRupture) {
      setTimeout(() => {
        flyToFault(searchedRupture, isFromOutside);
      }, 2300);
    }
  }, [searchParams, map, isFromOutside]);

  // Fly to the searched fault
  const flyToFault = (targetFault, fromOutside = false) => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.options.id === targetFault) {
          let uniqueId = L.stamp(layer);
          map.flyToBounds(
            refs[selectedBaseLayer].current.getLayer(uniqueId)._bounds
          );
          refs[selectedBaseLayer].current.getLayer(uniqueId).openPopup();
          let originalWeight = layer.options.pathOptions.weight;
          layer.setStyle({ weight: 7 });

          /* 
          Setting layer(polygon)'s border a bit thicker to notify users the fault
          they are looking for, then after 3 seconds, bring back to its normal border
          thickness.
          */
          setTimeout(() => {
            layer.setStyle({ weight: originalWeight });
          }, 3000);
          if (fromOutside) {
            setIsFromOutside(false);
          }
        }
      });
    }
  };

  return (
    <div className="leaf-let-div">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={CONSTANTS.CENTER}
        zoom={5.5}
        scrollWheelZoom={true}
        preferCanvas={true}
        renderer={L.canvas()}
        whenCreated={setMap}
      >
        <LeafletTiles />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Tectonic">
            <FeatureGroup ref={tectTypeRef}>
              <Faults
                faultsTraces={faultsTraces}
                faultsType={"tectonic_type"}
              />
            </FeatureGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Probability">
            <FeatureGroup ref={probRef}>
              <Faults faultsTraces={faultsTraces} faultsType={"prob"} />
            </FeatureGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Magnitude">
            <FeatureGroup ref={magRef}>
              <Faults faultsTraces={faultsTraces} faultsType={"magnitude"} />
            </FeatureGroup>
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Events (Below Mw 5)">
            <LayerGroup>
              <HistoricEvents
                historicTraces={belowFiveMag}
                visibility={belowFiveMagCheckbox}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Events (Mw in [5,6])">
            <LayerGroup>
              <HistoricEvents
                historicTraces={betwFiveSixMag}
                visibility={betwFiveSixMagCheckbox}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Events (Mw in [6,7])">
            <LayerGroup>
              <HistoricEvents
                historicTraces={betwSixSevenMag}
                visibility={betwSixSevenMagCheckbox}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Events (Over Mw 7)">
            <LayerGroup>
              <HistoricEvents
                historicTraces={overSevenMag}
                visibility={overSevenMagCheckbox}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <MapEventsHandler />
      </MapContainer>

      <div className="item-box top-mid search-container">
        <CustomSelect
          className="custom-react-search"
          placeholder={"Search fault..."}
          options={selectFltOptions}
          onChange={(value) => {
            flyToFault(value.value);
            setSearchParams({ query: value.value });
          }}
        />
      </div>
      <div className="item-box left-bottom">
        <img src={logo} alt="logo" className="oq-seistech-logo" />
        <a
          href={process.env.REACT_APP_BASE_NAME + "/faq"}
          target="_blank"
          rel="noopener noreferrer"
          className="faq-link"
        >
          Frequently Asked Questions
        </a>
      </div>
    </div>
  );
};

export default memo(SimAtlas);
