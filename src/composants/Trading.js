import '../App.css';
import React, { useEffect } from 'react';
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {Col, Container, Row, Button, Form} from 'react-bootstrap';
import Axios from "axios";
import { useState } from 'react';
import Session from 'react-session-api';


function Trading(){

  /// liste nom entreprise
  const [data_name, setData_name] = useState([]);
  const [full_name,setFull_name] = useState();
  const [stock_opening_value,setStock_opening_value] = useState();
  const [stock_closing_value,setStock_closing_value] = useState();
  const [stock_highest_value,setStock_highest_value] = useState();
  const [stock_lowest_value,setStock_lowest_value] = useState();
  const [stock_volume,setStock_volume] = useState();
  
/// graphe
const data_chart = {
  labels: ["", "", "", "",],
  datasets: [{
    label: full_name,
    data: [stock_opening_value, stock_lowest_value, stock_highest_value, stock_closing_value],
    backgroundColor:"red"
  }]
};
/// graphe

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(
        'http://localhost:9000/cotations/entreprise',
      );
      setData_name(result.data);
      console.log(result.data)
    };

    fetchData();
  }, [])
  
  let connect = Session.get("connect");
  console.log(connect)

  let budget = Session.get("budget");
  console.log(budget)

  let id = Session.get("id");
  console.log(id)

  if (connect !== "oui")
  {
    return( 
      <Container fluid className='trading_back'>
      Veuillez vous connectez
      </Container>
              
              
      );
  }
  else
  {
  return( 
    <Container fluid className='trading_back'>
    <Row className='trading_name'>
      <Col className='trading_name_1' xl={2}>
      {data_name.map(item =>(
        <p className='test' onClick={() => {setFull_name(item.full_name);setStock_opening_value(item.stock_opening_value);setStock_closing_value(item.stock_closing_value);setStock_highest_value(item.stock_highest_value);setStock_lowest_value(item.stock_lowest_value);setStock_volume(item.stock_volume);}}>{item.full_name}</p>     
      ))}
      </Col>
      <Col className='trading_graphe' xl={8}><Line data={data_chart} /></Col>
      <Col className='trading_interface'>
      
      <Row>
    <Col className='title_right'>{full_name}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>valeur actuelle</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{stock_closing_value}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>valeur d'ouverture du stock</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{stock_opening_value}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>valeur la plus élevée des actions</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{stock_highest_value}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>valeur la plus basse du stock</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{stock_lowest_value}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>volume des stocks</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{stock_volume}</Col>
  </Row>
  <Row>
    <Col className='valeur_right'>budget</Col>
  </Row>
  <Row>
    <Col className='name_valeur_right'>{budget}</Col>
  </Row>
  <Row>
    <Col><Button variant="outline-dark">Achat</Button></Col>
    <Col>
    <Form.Control
    type="text"
    id=""
    aria-describedby=""
    />
  </Col>
  </Row>
  <Row>
    <Col><Button variant="outline-dark">Vente</Button></Col>
    <Col>
    <Form.Control
    type="text"
    id=""
    aria-describedby=""
    />
    </Col>
  </Row>
  
      
      </Col>
    </Row>
  </Container>
            
            
    ); }
}

export default Trading;