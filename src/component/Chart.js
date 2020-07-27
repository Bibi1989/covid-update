import React, { useContext } from "react";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import { CovidContext } from "../context/Covid19ApiContext";

const Chart = () => {
  let { states } = useContext(CovidContext);

  const options = {
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
  };

  const admission =
    (states !== undefined &&
      states
        .map((state) => {
          return state.casesOnAdmission;
        })
        .slice(0, 10)) ||
    [];

  const discharged =
    (states !== undefined &&
      states
        .map((state) => {
          return state.discharged;
        })
        .slice(0, 10)) ||
    [];

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
        label: "Confirm Cases",
        stack: "stack",
        data: cases !== undefined && cases,
        // data: [1000, 1000, 800, 1200, 1200, 400, 800],
        backgroundColor: [
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
          "orangered",
        ],
      },
      {
        label: "Discharged",
        stack: "stack",
        data: discharged !== undefined && discharged,
        // data: [1000, 1000, 800, 1200, 1200, 400, 800],
        backgroundColor: [
          "green",
          "green",
          "green",
          "green",
          "green",
          "green",
          "green",
          "green",
          "green",
          "green",
        ],
      },
      {
        label: "Admission",
        stack: "stack",
        data: admission !== undefined && admission,
        // data: [1000, 1000, 800, 1200, 1200, 400, 800],
        backgroundColor: [
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
          "cyan",
        ],
      },
      {
        label: "Deaths",
        stack: "stack",
        data: deaths !== undefined && deaths,
        // data: [1000, 1000, 800, 1200, 1200, 400, 800],
        backgroundColor: [
          "red",
          "red",
          "red",
          "red",
          "red",
          "red",
          "red",
          "red",
          "red",
          "red",
        ],
      },
    ],
  };
  const deathData = {
    labels: newStates !== undefined && newStates,
    // labels: newStates !== undefined && newStates,
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
        <Bar data={confirmCasesData} options={options}></Bar>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <Pie data={deathData} options={options}></Pie>
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
