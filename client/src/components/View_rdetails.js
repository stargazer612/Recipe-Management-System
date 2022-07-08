import React,{useState,useEffect} from "react";
import {Redirect,Link} from 'react-router-dom';
import '../App.css';
import Axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Dropdown from 'react-bootstrap/Dropdown'

const LoginForm = ({ onSubmit,pk}) => {
  const [uname, setUname] = useState(pk.uname);
  const [rname, setRname] = useState(pk.Rname);
  const [category, setCategory] = useState(pk.category);
  const [cuisine, setCuisine] = useState(pk.cuisine);
  const [description, setDescription] = useState(pk.Description);


  const update=()=>{
      Axios.put('http://localhost:3001/api/update_R',{Rname:pk.Rname,newr:rname,Uname:uname,Cat:category,Cus:cuisine,des:description}).then(()=>{
      
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      {/* {console.log({pk})} */}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.Rname}
          onChange={(e) => setRname(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.uname}
          onChange={(e) => setUname(e.target.value)}
        />
      </Form.Group>
      <p>
      <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => setCategory("Vegetarian")}>Vegetarian</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setCategory("Non-Vegetarian")}>Non-Vegetarian</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          Cuisine
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => setCuisine("Italian")}>Italian</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Japanese")}>Japanese</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Chinese")}>Chinese</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Indian")}>Indian</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setCuisine("American")}>American</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </p>
      {/* <Form.Group controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group> */}
      {/* <Form.Group controlId="formBasicPassword">
        <Form.Label>Cuisine</Form.Label>
        <Form.Control
          type="text"
          defaultValue={pk.cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </Form.Group> */}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            defaultValue={pk.Description}
            onChange={(e) => setDescription(e.target.value)}
            />
      </Form.Group>
      <Button variant="primary" type="submit" block onClick={update}>
        Update
      </Button>
    </Form>
  );
};

function View_rdetails() {
  const[rlist,setRlsit]=useState([])
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
    getallrecipe();
  };
  const getallrecipe=()=>{
    console.log("rdetails called")
    Axios.get("http://localhost:3001/api/get_allrecipe").then((response)=>{
      setRlsit(response.data)
    });   
    // console.log(rlist);
  }
  useEffect(()=>{
    console.log("useeffect of rdetails")
    getallrecipe();
  },[]);

  const deleteR=(R,i)=>{
    const values = [...rlist];
    values.splice(i, 1);
    setRlsit(values);
    Axios.delete(`http://localhost:3001/api/delete_rec/${R}`).then(()=>{
      getallrecipe();  
    alert("Recipe Deleted");})
  };
  const mystyle={
    // backgroundImage:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundImage:" linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
    width: '18rem',
  };
  if(logged!=="admin"){
    console.log("admin not logged in ")
    return <Redirect to ="/Login"/>
  }
  return (
    <div className="App">
        <CardColumns>
        {console.log(rlist)}
        {rlist.map((val,idx)=>{
          return(

            <Card style={mystyle} className="mb-2" text={'black'}>
            <Card.Body>
            <Card.Title style={{textDecoration:'none' ,fontSize: '1.5em',fontFamily: 'consolas'}}>Name: {val.Rname}</Card.Title><hr/>
            <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>Username: {val.uname}</Card.Subtitle>
            <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>category: {val.category}</Card.Subtitle>
            <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>Cuisine:{val.cuisine}</Card.Subtitle>
            <Card.Subtitle style={{fontSize: '18px',margin:'3px',fontFamily: '"Lora", serif'}}>Description:{val.Description}</Card.Subtitle><hr/>
            <Link style={{padding:"0px 20px 0px 0px"}} to={{ 
              pathname: "/Admin_navbar/View_rdetails/Update_rec", 
              state: val 
              }}>Update</Link>
            {/* <Card.Link href="#" onClick={()=>{handleShow(val)}}>Update</Card.Link> */}
            <Card.Link href="#" onClick={()=>{deleteR(val.Rname,idx)}}>Delete</Card.Link>
            </Card.Body>
            </Card>
          ); 
            
        })}
      </CardColumns>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} pk={Value} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close 
          </Button>
        </Modal.Footer>
      </Modal>
</div>
)
}

export default  View_rdetails;