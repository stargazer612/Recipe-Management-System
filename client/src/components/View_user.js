import React,{useState,useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './View_user.css';
import {Redirect} from 'react-router-dom';
const LoginForm = ({ onSubmit,pk}) => {
  const [uname, setUname] = useState(pk.uname);
  const [Name, setName] = useState(pk.name);
  const [City, setCity] = useState(pk.city);
  const [State, setState] = useState(pk.state);

  const update=()=>{
      Axios.put('http://localhost:3001/api/update',{Uname:pk.uname,NewUname:uname,name:Name,city:City,state:State}).then(()=>{
    });
  }
  return (
    <Form onSubmit={onSubmit}>
      {console.log({pk})}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.uname}
          onChange={(e) => setUname(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.state}
          onChange={(e) => setState(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block onClick={update}>
        Update
      </Button>
    </Form>
  );
};

function App() {
  const[userlist,setUserlsit]=useState([])
  const[Value,setValue]=useState("")
  const[logged]=useState(localStorage.getItem("token"))
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  const handleShow = (val) => {
    setShow(true);
    setValue(val);
  }
  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setUserlsit(response.data)
    });
  };
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setUserlsit(response.data)
    });
  },[]);

  const deleteUser=(uname,i)=>{
    const values = [...userlist];
    values.splice(i, 1);
    setUserlsit(values);
    Axios.delete(`http://localhost:3001/api/delete/${uname}`).then(()=>{
      alert("Deleted");
  })};

  const mystyle={
    backgroundColor: '#ff0057',
    backgroundImage: 'linear-gradient(160deg, #ff0057 0%, #f55188 100%)', 
    width: '18rem',
  };
  // if(logged!=="admin"){
  //   console.log("admin not logged in ")
  //   return <Redirect to ="/"/>
  // }
  return (
    <div className="App">
        <CardColumns  style={{color: 'white'}}>
        {console.log(userlist)}
        {userlist.map((val,idx)=>{
          return(

            <Card style={mystyle} className="mb-2" text={'white'}>
                <Card.Header style={{textDecoration:'none' ,fontSize: '1.5em',fontFamily: 'consolas'}}>Name: {val.name}</Card.Header>
                <Card.Body>
                    <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>Username: {val.uname}</Card.Subtitle>
                    <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>City: {val.city}</Card.Subtitle>
                    <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>State:{val.state}</Card.Subtitle>
                    <hr/>
                    <Card.Link href="#" style={{color: 'black'}}  onClick={()=>{handleShow(val)}}>Update</Card.Link>
                    <Card.Link href="#" style={{color: 'black'}} onClick={()=>{deleteUser(val.uname,idx)}}>Delete</Card.Link>
                </Card.Body>
            </Card>
          ); 
            
        })}
      </CardColumns>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} pk={Value} />
        </Modal.Body>
      </Modal>
</div>
)
}

export default App;