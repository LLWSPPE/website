import '../App.css';
import React, { useEffect } from 'react';
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {Col, Container, Row, Button, Form, Navbar, Nav, Badge, Modal} from 'react-bootstrap';
import Axios from "axios";
import { useState } from 'react';
import Session from 'react-session-api';
import  { Navigate } from 'react-router-dom'

function Trading(){

  let connect = Session.get("connect");
  let budget = Session.get("budget");
  let id = Session.get("id");
  let firstName = Session.get("firstName")
  let lastName = Session.get("lastName")
  let loginToken = Session.get("loginToken")

  /// liste nom entreprise
  const [data_name, setData_name] = useState([]);
  const [full_name,setFull_name] = useState(null);
  const [stock_opening_value,setStock_opening_value] = useState("0");
  const [stock_closing_value,setStock_closing_value] = useState("0");
  const [stock_highest_value,setStock_highest_value] = useState("0");
  const [stock_lowest_value,setStock_lowest_value] = useState("0");
  const [stock_volume,setStock_volume] = useState();

  const [modalShow, setModalShow] = useState(false);
  
/// graphe

const data_chart = {
  labels: ["", "", "", "",],
  datasets: [{
    label: "Prix (€)",
    data: [stock_opening_value, stock_lowest_value, stock_highest_value, stock_closing_value],
    backgroundColor:"#fc5c65",
    borderColor: "#eb3b5a",
    fill: true
  }]
};

const chart_options = {
  elements: {
    line: {
        tension: 0.5
    }
}
}
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
  


  if (connect !== "oui")
  {
    return( 
      <Navigate to="/login" />
      );
  }
  else
  {
  return(
    <Container fluid className='trading_back'>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="">LLWS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setModalShow(true)} >Mon portefeuille</Nav.Link>
            <Nav.Link href="#pricing">Mes opérations</Nav.Link>
          </Nav>
          <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <h5 className='badge-budget'><Badge bg="success" className="mr-2 spanbadge">Budget : {budget} €</Badge></h5>
              </Navbar.Text>
              <Navbar.Text>
                Bonjour, <strong style={{color:'white'}}>{firstName} {lastName}</strong>
              </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Row className='trading_name'>
      <Col className='trading_name_1' xl={2}>
      {data_name.map(item =>(
        <p className='enterprise-item' onClick={() => {setFull_name(item.full_name);setStock_opening_value(item.stock_opening_value);setStock_closing_value(item.stock_closing_value);setStock_highest_value(item.stock_highest_value);setStock_lowest_value(item.stock_lowest_value);setStock_volume(item.stock_volume);}}>{item.full_name}</p>     
      ))}
      </Col>
      <Col className='trading_graphe col-8'>
        <Line data={data_chart} options={chart_options}/>
        <Col className='panelActions'>
        {full_name !== "" && 
          <Row className='mb-2'>
              <Col>
                <Form.Control
                    type="number"
                    min={1}
                    step="1"
                    id=""
                    aria-describedby=""
                    placeholder='Quantité (max. 100)'
                />
              </Col>
              <Col><Button variant="btn btn-success">Achat</Button></Col>
          </Row>

            <Row>
              <Col>
                <Form.Control
                    type="number"
                    min={1}
                    step="1"
                    id=""
                    aria-describedby=""
                    placeholder='Quantité (max. 100)'
                />
              </Col>

              <Col><Button type="number" min="1" max="100" step="1" variant="btn btn-warning">Vente</Button></Col>
            
            </Row>

          </Col>

          <Row>
            <h2 className="mt-2">Budget : <Badge bg="primary">{budget} €</Badge></h2>
          </Row>
 
      
      }
      </Col> 

      <Col className='trading_interface'>
      
      <Row>
        <Col className='title_right'>{full_name}</Col>
      </Row>
      <Row>
        <Col className='valeur_right'>Valeur actuelle</Col>
      </Row>
      <Row>
        <Col className='name_valeur_right'><h4><Badge bg="primary">{stock_closing_value} €</Badge></h4></Col>
      </Row>
      <Row>
        <Col className='valeur_right'>Prix ouverture</Col>
      </Row>
      <Row>
        <Col className='name_valeur_right'><h4><Badge bg="primary">{stock_opening_value} €</Badge></h4></Col>
      </Row>
      <Row>
        <Col className='valeur_right'>Plus haute</Col>
      </Row>
      <Row>
        <Col className='name_valeur_right'><h4><Badge bg="primary">{stock_highest_value} €</Badge></h4></Col>
      </Row>
      <Row>
        <Col className='valeur_right'>Plus basse</Col>
      </Row>
      <Row>
        <Col className='name_valeur_right'><h4><Badge bg="primary">{stock_lowest_value} €</Badge></h4></Col>
      </Row>
      <Row>
        <Col className='valeur_right'>Volume de transaction</Col>
      </Row>
      <Row>
        <Col className='name_valeur_right'><h4><Badge bg="primary">{stock_volume}</Badge></h4></Col>
      </Row>
      <Row>
        
      </Row>
      <Row>
        
      </Row>
          </Col>

    </Row>
  </Container>
            
            
    ); }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Trading;