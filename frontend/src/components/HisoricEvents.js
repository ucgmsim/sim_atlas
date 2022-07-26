import React, { useState, useEffect, useMemo, memo } from "react";

import L from "leaflet";
import { useMap } from "react-leaflet";

import layerFactory from "utils/LeafletCanvasMarkers";
import { googleAnalytics } from "utils/Utils";

const HistoricEvents = ({ historicTraces, visibility }) => {
  const [customLayer, setCustomLayer] = useState(null);
  const map = useMap();

  const markers = useMemo(() => {
    return historicTraces.map((trace) => {
      let size = 100 * Math.pow(1.5, trace.magnitude - 7.8);
      let icon = L.icon({
        iconUrl: require(`assets/images/beachballs/${trace.public_id}.png`),
        iconSize: [size, size],
        shadowSize: [50, 64],
        iconAnchor: [0.5 * size, 0.5 * size], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],
      });

      const googleMapLink =
        "<a href=https://www.google.com/maps/search/?api=1&query=" +
        trace.latitude +
        "," +
        trace.longitude +
        " target=&quot;_blank&quot;> View Google Map</a>";
      const geonetLink =
        "<a href=https://www.geonet.org.nz/earthquake/" +
        trace.public_id +
        " target=&quot;_blank&quot;> More details</a>";

      const text =
        "<b>EventID</b>: " +
        trace.public_id +
        "<br><b>Date</b>: " +
        trace.date +
        "<br><b>Mw</b>: " +
        trace.magnitude +
        "<br>" +
        googleMapLink +
        "<br>" +
        geonetLink;

      let marker = L.marker(
        [
          trace.latitude,
          trace.longitude - Math.floor(trace.longitude / 360) * 360,
        ],
        {
          icon: icon,
        }
      ).bindPopup(text);
      return marker;
    });
  }, [historicTraces]);

  useEffect(() => {
    // Need to map apply canvasIconLayer
    if (!map) return;

    /*
    Depends on the visibility
    We decide to keep the existing layer or clear the layer
    */
    if (!visibility) {
      if (!customLayer) {
        return;
      } else {
        customLayer.clearLayers();
      }
    }

    // Init the custom canvasa layer for markers
    if (!customLayer) {
      window.L.CanvasIconLayer = layerFactory(L);

      const ciLayer = L.canvasIconLayer({}).addTo(map);
      ciLayer.addOnClickListener((e, ret) => {
        let popUpContents = ret[0].data.getPopup()._content;
        // To get public id of the selected historical data
        let publicId = popUpContents.substring(
          popUpContents.indexOf("</b>: ") + 6,
          popUpContents.indexOf("<br><b>Date")
        );
        googleAnalytics("User", "Historical data clicked", publicId);
      });
      setCustomLayer(ciLayer);
      return;
    }

    const ciLayer = customLayer;

    if (visibility) {
      // In case users click the adding historical data before the data is ready
      if (markers.length == 0) return;
      ciLayer.addLayers(markers);
    } else {
      ciLayer.clearLayers();
      map.removeLayer(ciLayer);
      setCustomLayer(null);
    }
  }, [customLayer, map, visibility, markers]);

  return null;
};

export default memo(HistoricEvents);
