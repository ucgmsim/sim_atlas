import React, { memo } from "react";

import { TileLayer, LayersControl } from "react-leaflet";

const LeafletTiles = () => {
  const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <LayersControl>
      <LayersControl.BaseLayer checked name="Grayscale">
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Colour">
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default memo(LeafletTiles);
