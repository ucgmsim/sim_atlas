import React, { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

import * as CONSTANTS from "constants/Constants";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const [totalRenderedFaults, setTotalRenderedFaults] = useState(0);
  const [selectedBaseLayer, setSelectedBaseLayer] = useState("Tectonic");

  const [selectFltOptions, setSelectFltOptions] = useState([]);
  const [faultsTraces, setFaultsTraces] = useState([]);
  const [historicEvents, setHistoricEvents] = useState([]);

  const [belowFiveMag, setBelowFiveMag] = useState([]);
  const [betwFiveSixMag, setBetwFiveSixMag] = useState([]);
  const [betwSixSevenMag, setBetwSixSevenMag] = useState([]);
  const [overSevenMag, setOverSevenMag] = useState([]);

  const [belowFiveMagCheckbox, setBelowFiveMagCheckbox] = useState(false);
  const [betwFiveSixMagCheckbox, setBetwFiveSixMagCheckbox] = useState(false);
  const [betwSixSevenMagCheckbox, setBetwSixSevenMagCheckbox] = useState(false);
  const [overSevenMagCheckbox, setOverSevenMagCheckbox] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getFaults = async () => {
      await fetch(CONSTANTS.API_URL + CONSTANTS.API_FAULTS_GET_ENDPOINT, {
        signal: signal,
      })
        .then(async (response) => {
          const faultsData = await response.json();

          setSelectFltOptions(
            faultsData["fault_traces"]
              .map((fault) => {
                return {
                  value: fault.name,
                  label: `${fault.realname} - ${fault.name}`,
                };
              })
              .sort((a, b) => {
                let nameA = a.label.toUpperCase();
                let nameB = b.label.toUpperCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              })
          );

          setFaultsTraces(faultsData["fault_traces"]);
          setHistoricEvents(faultsData["historic_events"]);
          let smaller = [];
          let small = [];
          let large = [];
          let largest = [];

          faultsData["historic_events"].forEach((data) => {
            if (data.magnitude < 5) {
              smaller.push(data);
            } else if (data.magnitude < 6) {
              small.push(data);
            } else if (data.magnitude < 7) {
              large.push(data);
            } else {
              largest.push(data);
            }
          });

          setBelowFiveMag(smaller);
          setBetwFiveSixMag(small);
          setBetwSixSevenMag(large);
          setOverSevenMag(largest);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getFaults();
  }, []);

  const globalContext = {
    totalRenderedFaults,
    setTotalRenderedFaults,
    selectedBaseLayer,
    setSelectedBaseLayer,
    selectFltOptions,
    faultsTraces,
    historicEvents,
    belowFiveMag,
    betwFiveSixMag,
    betwSixSevenMag,
    overSevenMag,
    belowFiveMagCheckbox,
    setBelowFiveMagCheckbox,
    betwFiveSixMagCheckbox,
    setBetwFiveSixMagCheckbox,
    betwSixSevenMagCheckbox,
    setBetwSixSevenMagCheckbox,
    overSevenMagCheckbox,
    setOverSevenMagCheckbox,
  };

  // pass the value in provider and return
  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  uhsRateTable: PropTypes.array,
};
