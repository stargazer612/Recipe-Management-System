import React,{useState,useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import '../User_login.css';
import history from '../history'

const Login=()=> {

  const[UserName,setUserName]=useState('')
  const[Password,setPassword]=useState('')
  const[loginStatus,setLoginStatus] = useState(localStorage.getItem("token"));
  const[adminname] = useState('admin')
  const[adminpass] = useState('1234') 
  const[runame,setRuname]=useState('')
  const[rname,setRname]=useState('')
  const[rpass,setRpass]=useState('')
  const[rcity,setRcity]=useState('')
  const[rstate,setRstate]=useState('')
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitDetails=()=>{

    console.log(UserName,"  ",adminname)
  if(UserName===adminname && Password===adminpass){
    localStorage.setItem("token",adminname)
    console.log("admin verified")
    setLoginStatus(adminname)
    console.log("2",loginStatus)
  }else{
    Axios.post('http://localhost:3001/api/login',{uname:UserName,password:Password}).then((response)=>{
    
      if(response.data.message){
        alert(response.data.message)
        console.log(response.data.message)
      }
      else{
          setLoginStatus(response.data[0].uname)
          console.log("user verified",loginStatus)
          localStorage.setItem("token",response.data[0].uname)
      }
      });
  }
  setUserName("")
  setPassword("")
  };

  const insert=()=>{
		Axios.post('http://localhost:3001/api/insert_user',{name:rname,uname:runame,password:rpass,city:rcity,state:rstate}).then(()=>{
		  alert("Registered");
		  setRname("");
		  setRuname("");
		  setRpass("");
      setRcity("");
      setRstate("");
      handleClose();
		});
	  }

  const logout=(e)=>{
    e.preventDefault();
    console.log("logout func")
    setLoginStatus("")
  }
  const mystyle = {
    textAlign: "center",
    color: "white",
    fontFamily: "Varela Round, sans-serif",
  };


  if(loginStatus===adminname){
    console.log("admin already logged in ")
    history.push('/Admin_navbar')
  }else if(loginStatus){
    console.log("user alreaady logged in ")
    history.push('/User_navbar')
  } return (
        <div className="containlg">
          <div className="heading">
          <h1>Recipe Management System</h1>
        </div>
        <div class="login-wrap">
        <div class="login-html">
          {/* <input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab" style={mystyle}>Login</label> */}
          {/* <input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Register</label> */}
          <h1 style={mystyle}>Login</h1>
          <div class="login-form">
              <div class="group">
                <label for="user" class="label">Username</label>
                <input id="user" type="text" class="input" onChange={(e)=>{setUserName(e.target.value)}}/>
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input id="pass" type="password" class="input" data-type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div class="group">
                <input type="submit" class="button" value="Login" onClick={submitDetails}/>
              </div>
              <div class="group">
                <input type="submit" class="button" value="Register" onClick={handleShow}/>
              </div>
              
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="login-wrap1" >
	                <div class="login-html1">
	                	<div class="login-form">
	                		<div class="group">
	                				<label for="user" class="label">Name</label>
	                				<input id="user" type="text" class="input" onChange={(e)=>{setRname(e.target.value)}}/>
	                			</div>
	                			<div class="group">
	                				<label for="user" class="label">Username</label>
	                				<input id="user" type="text" class="input" onChange={(e)=>{setRuname(e.target.value)}}/>
	                			</div>
	                			<div class="group">
	                				<label for="pass" class="label">Password</label>
	                				<input id="pass" type="password" class="input" data-type="password" onChange={(e)=>{setRpass(e.target.value)}}/>
	                			</div>
                        <div class="group">
	                				<label for="pass" class="label">City</label>
	                				<input id="pass" type="text" class="input"  onChange={(e)=>{setRcity(e.target.value)}}/>
	                			</div>
                        <div class="group">
	                				<label for="pass" class="label">State</label>
	                				<input id="pass" type="text" class="input"  onChange={(e)=>{setRstate(e.target.value)}}/>
	                			</div>
	                			<div class="group">
	                				<input type="submit" class="button" value="Register" onClick={insert}/>
	                			</div>
	                		</div>
	                	</div>
	              </div>
              </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
        </div>
  );
}

export default Login;