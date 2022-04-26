import '../App.css';
import React from 'react';
import { Container} from 'react-bootstrap';
import { useState, useEffect} from 'react';
import Axios from "axios";


function Register() {
  
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  useEffect(() => {
    document.getElementById("container").style.visibility = "hidden";
  }, [])
  

  const register = () => {
    Axios.post("http://localhost:9000/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }).then((response) => {
      console.log(response.data.status)
      if (response.data.status==="ERROR"){ 
        console.log("Il y a eu une erreur. Veuillez réessayer.");
      } if (response.data.status==="SUCCESS"){
        console.log("Cool");
      }
      });
};
 
  return (
    <Container fluid className='register_block'>
   
    <form action="http://localhost:3000" method='GET'>
  <div class="form-group">
    <label for="exampleInputEmail1">Prenom</label>
    <input required minlength="2" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
              setFirstName(e.target.value);}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Nom</label>
    <input minlength="2" required type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
              setLastName(e.target.value);}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
              setEmail(e.target.value);}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mot de passe</label>
    <input required minlength="8" type="password" class="form-control" id="password" onChange={(e) => {
              setPassword(e.target.value);}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Confirmation Mot de passe</label>
    <input required minlength="8" type="password" class="form-control" id="confirm_password" onChange={(e) => {
              setConfirmPassword(e.target.value);}}/>
  </div>
  <button class="btn btn-primary" onClick={register}>S'inscrire</button>
</form>

  </Container>
    );
  }
  
  export default Register;