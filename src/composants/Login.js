import '../App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Axios from "axios";

function Login() {
    
  const [mail,setMail] = useState("");
  const [mdp,setMdp] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  
  const login = () => {
    Axios.post("http://localhost:9000/login", {
      mail: mail,
      mdp: mdp,
    }).then((response) => {
      
      if (response.data.message){ 
        setLoginStatus("Authentification échoué");
      } else {
        setLoginStatus("Authentification réussie");
      }
      
    });
  };
  
  return (
        <Container className='login_container'>
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
          <Col className='login_button'><Button variant="outline-light" onClick={login}>Connection</Button>{' '}</Col>
        </Row>
        <Row>
          <Col>{loginStatus}</Col>
        </Row>
      </Container>
    );
  }
  
  export default Login;