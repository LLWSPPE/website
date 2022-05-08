import '../App.css';
import React, { useEffect } from 'react';
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {Col, Container, Row, Button, Form, Navbar, Nav, Badge, Modal, ListGroup} from 'react-bootstrap';
import Axios from "axios";
import { useState } from 'react';
import {ReactSession} from "react-client-session";
import  { Navigate } from 'react-router-dom'

function Trading(){

  document.title = 'Salle de marché : Accueil'

  /// liste nom entreprise
  const [data_name, setData_name] = useState([]);
  const [full_name,setFull_name] = useState("");
  const [stock_opening_value,setStock_opening_value] = useState("0");
  const [stock_closing_value,setStock_closing_value] = useState("0");
  const [stock_highest_value,setStock_highest_value] = useState("0");
  const [stock_lowest_value,setStock_lowest_value] = useState("0");
  const [stock_volume,setStock_volume] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [mouvementShow, setMouvementShow] = useState(false);
  
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

  const user = ReactSession.get('user')


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

  if(!user){
    return(
      <Navigate to="/login" />
    )
  }
  else {
    return(
        <Container fluid className='trading_back'>
          <FenetrePortefeuille
              show={modalShow}
              onHide={() => setModalShow(false)}
          />

          <FenetreMouvements
              show={mouvementShow}
              onHide={() => setMouvementShow(false)}
          />
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="">LLWS</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => setModalShow(true)} >Mon portefeuille</Nav.Link>
                <Nav.Link onClick={() => setMouvementShow(true)}>Mes opérations</Nav.Link>
              </Nav>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <h5 className='badge-budget'><Badge bg="success" className="mr-2 spanbadge">Budget : {user["budget"]} €</Badge></h5>
                </Navbar.Text>
                <Navbar.Text>
                  Bonjour, <strong style={{color:'white'}}>{user["first_name"]} {user["last_name"]}</strong>
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
                    <>
                      <Row>
                        <h2 className="mt-2">Opérations</h2>
                      </Row>
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
                    </>
                }

              </Col>

              <Row className="mt-3">
                <h3 className="mt-2">Mon budget : <Badge bg="primary">{user["budget"]} €</Badge></h3>
              </Row>

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
    );
  }
}

function FenetrePortefeuille(props) {
  const portefeuille = ReactSession.get('portefeuille')

  const listePortefeuille = []

  portefeuille.map(item => {
    listePortefeuille.push(<ListGroup.Item><strong>{item.full_name}</strong> (ISIN: {item.isin_code} - Quantité : <Badge bg="primary">{item.quantite}</Badge> </ListGroup.Item>)
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Portefeuill d'actifs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ListGroup>
            {listePortefeuille}
          </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function FenetreMouvements(props) {
  const mouvements = ReactSession.get('mouvements')
  console.log(mouvements)

  const listeMouvements = []

  mouvements.map(item => {
    listeMouvements.push(<ListGroup.Item variant={item.type_mouvement === "BUY" ? "warning" : "success"}><strong>{item.type_mouvement === "BUY" ? "ACHAT" : "VENTE"}</strong> (ISIN: {item.isin_code} - Montant : <Badge bg="primary">{item.montant} € </Badge> Quantité : <Badge bg="primary" pill>{item.quantite}</Badge></ListGroup.Item>)
  });

  return (
      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Mes opérations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {listeMouvements}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
  );
}


export default Trading;