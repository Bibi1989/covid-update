import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const FETCH = "FETCH";

export const CovidContext = createContext();

const initialState = {
  covids: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        covids: action.payload,
      };

    default:
      return state;
  }
};

export const CovidProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { covids } = state;
  const { states } = covids || [];

  let [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCovid19 = async () => {
    setLoading(true);
    const response = await axios.get(`https://covidnigeria.herokuapp.com/api`);
    setLoading(false);
    setArray([...response.data.data.states]);
    dispatch({ type: FETCH, payload: response.data.data });
    // console.log(response.data.data);
  };
  useEffect(() => {
    fetchCovid19();
  }, []);
  return (
    <CovidContext.Provider
      value={{ covids, states, array: array.slice(0, 10), loading }}
    >
      {children}
    </CovidContext.Provider>
  );
};
