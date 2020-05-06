import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Bar, Line } from "react-chartjs-2";
import { CovidContext } from "../context/Covid19ApiContext";

const Chart = () => {
  let { covids, states } = useContext(CovidContext);
  const cases =
    (states !== undefined &&
      states
        .map((state) => {
          return state.confirmedCases;
        })
        .slice(0, 10)) ||
    [];
  const deaths =
    (states !== undefined &&
      states
        .map((state) => {
          return state.death;
        })
        .slice(0, 10)) ||
    [];
  const newStates =
    states !== undefined &&
    states
      .map((state) => {
        return state.state;
      })
      .slice(0, 10);
  cases.push(0);

  const confirmCasesData = {
    labels: newStates !== undefined && newStates,
    datasets: [
      {
        label: "10 highest states with confirmed cases",
        data: cases !== undefined && cases,
        // data: [1000, 1000, 800, 1200, 1200, 400, 800],
        backgroundColor: [
          "violet",
          "purple",
          "teal",
          "orangered",
          "linen",
          "cyan",
          "gold",
        ],
      },
    ],
  };
  const deathData = {
    labels: newStates !== undefined && newStates,
    datasets: [
      {
        label: "10 highest states with death cases",
        data: deaths !== undefined && deaths,
        backgroundColor: [
          "violet",
          "purple",
          "teal",
          "orangered",
          "linen",
          "cyan",
          "gold",
        ],
      },
    ],
  };
  return (
    <Row>
      <div style={{ width: "100%", height: "300px" }}>
        <Bar
          data={confirmCasesData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  barThickness: 20,
                },
              ],
            },
          }}
        ></Bar>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <Line
          data={deathData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  barThickness: 20,
                },
              ],
            },
          }}
        ></Line>
      </div>
    </Row>
  );
};

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  /* height: 13.1875em; */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .bar {
    width: 400px;
  }
`;

export default Chart;
