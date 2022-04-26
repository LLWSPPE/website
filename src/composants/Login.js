import '../App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Axios from "axios";
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Session from 'react-session-api';
import {Link} from 'react-router-dom';

function Login() {
    
  const [mail,setMail] = useState("");    
  const [mdp,setMdp] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [id, setId] = useState("");
  Session.set("budget", budget);
  Session.set("id", id);
  
  const login = () => {
    Axios.post("http://localhost:9000/login", {
      email: mail,
      password: mdp,
    }).then((response) => {
      console.log(response.data.status)
      if (response.data.status==="ERROR"){ 
        setLoginStatus("Authentification échoué");
        setChange("");
      } if (response.data.status==="SUCCESS"){
        setLoginStatus("Authentification réussie");
        Session.set("connect", "oui");
        setChange(navigate("/trading"));  
        const test = response.data.result;
        test.map(item =>(
          setBudget(item.budget), setId(item.id)
        ))
        
      }
      });
};


const disable = () => {
  document.getElementById("container").style.visibility = "hidden";
}



  
  return (
        <Container className='login_container' id="container">
        <Row>
          <Col className='login_form'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control type="email" onChange={(e) => {
              setMail(e.target.value);}}/>
            </Form.Group>
          </Form>
          </Col>
        </Row>
        <Row>
          <Col className='login_form'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" onChange={(e) => {
              setMdp(e.target.value);}}/>
            </Form.Group>
          </Form>
          </Col>
        </Row>
        <Row>
          <Col className='login_button'>
          {change} <Col className='login_button'><Button variant="outline-light" onClick={login}>Connection</Button>{' '}</Col>
          </Col>
        </Row>
        <Row>
          <Col className='login_button'>
          <Link to="/register"><Col className='login_button'><Button variant="outline-light" onClick={disable}>Inscription</Button>{' '}</Col></Link>
          </Col>
        </Row>
        <Row>
          <Col>{loginStatus}</Col>
        </Row>
      </Container>
    );
  }
  
  export default Login;