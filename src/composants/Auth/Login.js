import '../App.css';
import { Container, Row, Col, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import Axios from "axios";
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Session from 'react-session-api';
import {Link, Navigate} from 'react-router-dom';

function Login() {

  document.title = 'Salle de marché : Connexion';

  const [show, setShow] = useState(false);
  const [mail,setMail] = useState("");    
  const [mdp,setMdp] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAdmin, setIsAdmin] = useState("0")
  const [isResponsable, setIsResponsable] = useState("0")
  const [loginToken, setLoginToken] = useState("")
  const [portefeuille, setPortefeuille] = useState("")

  Session.set("firstName", firstName)
  Session.set("lastName", lastName)
  Session.set("loginToken", loginToken)
  Session.set("budget", budget);
  Session.set("id", id);
  Session.config(true)
  
  const login = () => {
    Axios.post("http://localhost:9000/login", {
      email: mail,
      password: mdp,
    }).then((response) => {
      console.log(response.data.status)
      if (response.data.status==="ERROR"){ 
        setLoginStatus(response.data.message);
        setChange("");
        setShow(true)
      } if (response.data.status==="SUCCESS"){
        setLoginStatus("Authentification réusie");
        Session.set("connect", "oui");
        setChange(navigate("/trading"));  
        const test = response.data.result;
        test.map(item =>(
              setBudget(item.budget),
              setId(item.id),
              setFirstName(item.first_name),
              setLastName(item.last_name),
              setLoginToken(item.loginToken),
              setIsAdmin(item.admin),
              setIsResponsable(item.responsable)
        ))
        
      }
      });
};

  
  return (
        <Container className='login_container' id="container">
        <Row>
          {show === true &&
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Erreur</Alert.Heading>
            <p>
              {loginStatus}
            </p>
          </Alert>
          }
          <Col className='login_form'>
          <Form>
          <FloatingLabel
              controlId="floatingInput"
              label="Adresse électronique"
              className="mb-3"
              style={{color: 'black'}}
            >
              <Form.Control type="email" placeholder="nom@exemple.com" onChange={(e) => {
              setMail(e.target.value);}}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Mot de passe" style={{color: 'black'}}>
              <Form.Control type="password" placeholder="Password" onChange={(e) => {
                  setMdp(e.target.value);}}/>
            </FloatingLabel>

            <Row className="mt-2">
            <Button className="btn btn-success" onClick={login}>Connexion</Button>
            <Link to="/page2"><Button className="btn btn-primary">Inscription</Button></Link>
            </Row>

            </Form>
          </Col>
          
        </Row>
      </Container>
    );
  }
  
  export default Login;

