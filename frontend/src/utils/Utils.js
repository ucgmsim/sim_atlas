import L from "leaflet";
import ReactGA from "react-ga4";

import * as CONSTANTS from "constants/Constants";

/*
When a user brings a cursor over any faults
change its opacity with a given opa 
to control the transparency.
*/
export const customMouseOverOutAction = (e, opa, fopa, weight) => {
  // Hovering over the faults to change some CSS
  e.target.setStyle({
    opacity: opa,
    weight: weight,
    fillOpacity: fopa,
  });
};

/*
When a user clicks a fault,
Add extra image layer if srf image is avilable for the selected fault
*/
const imageOverlayObj = {};
export const customOnClick = (e, fault, map, opa, fopa, weight) => {
  e.target.setStyle({
    opacity: opa,
    weight: weight,
    fillOpacity: fopa,
  });

  try {
    // Try to get an srf image and add extra image overlay
    let imageURL = `${process.env.REACT_APP_SRF_IMAGE_PATH}/${fault.name}.png`;
    // Check if server has an image
    fetch(imageURL).then((response) => {
      if (response.status == 200) {
        let imageBounds = L.latLngBounds(fault.planes);
        let imageLayer = L.imageOverlay(imageURL, imageBounds);
        
        // Add a layer only if image is avilable
        if (imageOverlayObj[fault.name] == null) {
          map.addLayer(imageLayer);
          imageOverlayObj[fault.name] = imageLayer;
        }
      }
    });
  } catch {
    // Most likely the image does not exist
    console.error("Image does not exist.");
  } finally {
    //Remove image overlays elsewhere
    for (let key in imageOverlayObj) {
      if (key !== fault.name && imageOverlayObj[key] !== null) {
        map.removeLayer(imageOverlayObj[key]);
        imageOverlayObj[key] = null;
      }
    }
  }
};

export const colorCode = (selectedType, rate) => {
  let colorCode = CONSTANTS.dark_red;

  if (selectedType === "prob") {
    if (rate < 0.1) colorCode = CONSTANTS.blue;
    else if (rate < 0.5) colorCode = CONSTANTS.dark_cyan;
    else if (rate < 1.0) colorCode = CONSTANTS.strong_cyan;
    else if (rate < 5.0) colorCode = CONSTANTS.orange;
    else if (rate < 10.0) colorCode = CONSTANTS.red;
  } else if (selectedType === "magnitude") {
    if (rate < 6.5) colorCode = CONSTANTS.blue;
    else if (rate < 7) colorCode = CONSTANTS.dark_cyan;
    else if (rate < 7.5) colorCode = CONSTANTS.orange;
    else if (rate < 8) colorCode = CONSTANTS.strong_orange;
  }

  return colorCode;
};

/* Function to get the distance between two coordinates */
const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
};

/*
Function to decide the weight of leaflet polygon.
For instance, the fault like MS02 is very hard to click when weight is only 1.
Hence, giving some extra weights to the polygon to make it easier to be clicked.
*/
export const getPlaneWeight = (planes) => {
  const eps = 0.001;

  // Compare the distance between each coordinates
  const results = planes.map((plane) => {
    if (
      (getDistance(plane[0], plane[1]) < eps &&
        getDistance(plane[2], plane[3]) < eps) ||
      (getDistance(plane[0], plane[3]) < eps &&
        getDistance(plane[1], plane[2]) < eps)
    ) {
      return true;
    }
    return false;
  });

  // To tell if all the elements of the array, results, are True
  const isPolyLine = results.every(Boolean);

  return isPolyLine ? 5 : 1;
};

/* Function to record user actions to Google Analytics */
export const googleAnalytics = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
