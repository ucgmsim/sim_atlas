import L from "leaflet";

export const API_URL = process.env.REACT_APP_API_URL;
export const API_FAULTS_GET_ENDPOINT = "/api/faults";

export const CENTER = [-41.2728, 173.2995];
export const fopa = 0.1;
export const opa = 0.5;
export const blue = "#0000ff";
export const dark_cyan = "#00a659";
export const strong_cyan = "#00c43b";
export const orange = "#ffa600";
export const strong_orange = "#ff7000";
export const red = "#fe0000";
export const dark_red = "#980000";

export const TECTONIC_COLOR = {
  Crustal: blue,
  Volcanic: orange,
  Subduction: dark_red,
};

const MAGNITUDE_COLOR = {
  "<6.5Mw": blue,
  "6.5-7Mw": dark_cyan,
  "7-7.5Mw": orange,
  "7.5-8Mw": strong_orange,
  ">8Mw": dark_red,
};

const PROBABILITY_COLOR = {
  "<0.1%": blue,
  "0.1-0.5%": dark_cyan,
  "0.5-1%": strong_cyan,
  "1-5%": orange,
  "5-10%": red,
  ">10%": dark_red,
};

const createUtilInfoDiv = (title, colors) => {
  let labels = typeof title === "string" ? [title] : title;

  for (const [key, value] of Object.entries(colors)) {
    labels.push(
      `<i style='background:${value}'>&nbsp;&nbsp;&nbsp;&nbsp;</i> ${key}`
    );
  }

  return labels;
};
const getTectonicInfo = () => {
  return createUtilInfoDiv("Tectonic Type", TECTONIC_COLOR);
};

const getProbabilityInfo = () => {
  return createUtilInfoDiv(["Probability", "in 50 years"], PROBABILITY_COLOR);
};

const getMagnitudeInfo = () => {
  return createUtilInfoDiv("Magnitude (Mw)", MAGNITUDE_COLOR);
};

export const tectonicUtilInfo = new L.Control({ position: "bottomright" });
tectonicUtilInfo.onAdd = () => {
  let div = L.DomUtil.create("div", "info-legend");
  div.innerHTML = getTectonicInfo().join("<br>");
  return div;
};

export const probabilityUtilInfo = new L.Control({ position: "bottomright" });
probabilityUtilInfo.onAdd = () => {
  let div = L.DomUtil.create("div", "info-legend");
  div.innerHTML = getProbabilityInfo().join("<br>");
  return div;
};

export const magnitudeUtilInfo = new L.Control({ position: "bottomright" });
magnitudeUtilInfo.onAdd = () => {
  let div = L.DomUtil.create("div", "info-legend");
  div.innerHTML = getMagnitudeInfo().join("<br>");
  return div;
};
