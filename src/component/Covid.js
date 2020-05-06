import React, { useContext, useState, useEffect, useRef } from "react";
import { CovidContext } from "../context/Covid19ApiContext";
import styled from "styled-components";
import { Table, Icon } from "semantic-ui-react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Chart from "./Chart";

function Covid() {
  let { covids, states, array, loading } = useContext(CovidContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePerPost] = useState(10);
  const buttonRef = useRef();

  // const increase = states !== undefined && states.reduce((acc, val) => )

  const lastIndex = currentPage * pagePerPost;
  const firstIndex = lastIndex - pagePerPost;
  let newArray =
    states !== undefined && [...states].slice(firstIndex, lastIndex);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          animation='border'
          variant='danger'
          style={{ width: "5em", height: "5em" }}
        />
      </div>
    );
  }

  const incrementPage = () => {
    array.push(...newArray);
    setCurrentPage((c) => c + 1);
    if (newArray.length === 0) {
      buttonRef.current.className = "hide";
    }
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Card1>
            <h1 className='header'>Nigeria Covid19 Update</h1>
          </Card1>

          <Card1 style={{ background: "coral", color: "white" }}>
            <h2>People ested</h2>
            <h1 className='num'>
              {covids !== null && covids.totalSamplesTested}
            </h1>
          </Card1>
        </Row>

        <Row1>
          <Card style={{ background: "yellow", color: "white" }}>
            <h2>Confirmed Cases</h2>
            <h1 className='num'>
              {covids !== null && covids.totalConfirmedCases}
            </h1>
          </Card>
          <Card style={{ background: "brown", color: "white" }}>
            <h2>Active Cases</h2>
            <h1 className='num'>
              {covids !== null && covids.totalActiveCases}
            </h1>
          </Card>
          <Card style={{ background: "teal", color: "white" }}>
            <h2>Recovered Cases</h2>
            <h1 className='num'>{covids !== null && covids.discharged}</h1>
          </Card>
          <Card style={{ background: "orangered", color: "white" }}>
            <h2>Deaths</h2>
            <h1 className='num'>{covids !== null && covids.death}</h1>
          </Card>
        </Row1>
      </Container>
      <Chart />
      <States>
        <h1>Numbers of States Affected in Nigeria</h1>
        <Icon name='arrow right' style={{ marginLeft: "2em" }} />
        <h2 className='state'>
          {states !== undefined && covids.states.length}
        </h2>
      </States>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>States</Table.HeaderCell>
            <Table.HeaderCell>ConfirmedCases</Table.HeaderCell>
            <Table.HeaderCell>Discharged Cases</Table.HeaderCell>
            <Table.HeaderCell>Cases On Admission</Table.HeaderCell>
            <Table.HeaderCell>Deaths</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {array.map((covid, i) => (
            <Table.Row key={i}>
              <Table.Cell>{covid.state}</Table.Cell>
              <Table.Cell>{covid.confirmedCases}</Table.Cell>
              <Table.Cell>{covid.discharged}</Table.Cell>
              <Table.Cell>{covid.casesOnAdmission}</Table.Cell>
              <Table.Cell>{covid.death}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <button className='btn' onClick={incrementPage} ref={buttonRef}>
        Load More...
      </button>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  padding: 3% 10%;

  @media (max-width: 768px) {
    padding: 3% 1em;
  }

  .btn {
    display: block;
    padding: 0.5em 2em;
    border-radius: 0.25em;
    border: none;
    background: lightgray;
    outline: none;
    margin: auto;
  }

  .hide {
    display: none;
  }
`;
const Container = styled.div`
  /* @media (max-width: 768px) {
    grid-template-columns: 1fr;
  } */
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2em;
  /* border: 1px solid #999999; */
  border-radius: 0.4em;

  .num {
    font-size: 3em;
    font-weight: 800;
  }
`;
export const Card1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2em;
  /* border: 1px solid #999999; */
  border-radius: 0.4em;

  .num {
    font-size: 3em;
    font-weight: 800;
  }
`;
export const States = styled.div`
  padding: 2em 10%;
  display: flex;
  align-items: center;

  h2 {
    /* padding-left: 2em; */
    margin-left: 0.5em;
    margin-top: 0em;
    width: 40px;
    height: 40px;
    background: linen;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin: 0;
  }

  .state {
  }
`;
export const Row1 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const Row = styled.div`
  width: 100%;
  display: grid;
  padding: 2em 0;
  grid-template-columns: 70% 30%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .header {
      font-size: 1em;
    }
  }

  .header {
    font-size: 3em;
  }
`;
export const Button = styled.button`
  padding: 0.5em 2em;
  border-radius: 0.25em;
  border: none;
`;
// export const Card1 = styled.div``;
// export const Card = styled.div``

export default Covid;
