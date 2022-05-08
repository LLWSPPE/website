import '../App.css';
import { Container, Row, Col, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import {useEffect, useState} from 'react';
import Axios from "axios";
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Session from 'react-session-api';
import { ReactSession } from 'react-client-session';
import {Link, Navigate} from 'react-router-dom';

function Login() {

  document.title = 'Salle de marché : Connexion';

  const [show, setShow] = useState(false);
  const [mail,setMail] = useState("");    
  const [mdp,setMdp] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();
  const [portefeuille, setPortefeuille] = useState("")
  const user = ReactSession.get('user')

  const login = () => {
    Axios.post("http://localhost:9000/login", {
      email: mail,
      password: mdp,
    }).then((response) => {
        console.log(response.data.status)
        if (response.data.status==="ERROR")
        {
          setLoginStatus(response.data.message);
          setChange("");
          setShow(true)
        }
        if (response.data.status==="SUCCESS"){
          setLoginStatus("Authentification réusie");
          Session.set("connect", "oui");

          let resultat = response.data.result;

          ReactSession.set('user', resultat[0])

          console.log(ReactSession.get('user'))
          setChange(navigate("/trading"));

        }
      });
};


  if (ReactSession.get('user'))
  {
    return(
        <Navigate to="/trading" />
    );
  }
  else {
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

  }
  
  export default Login;

