import React,{useState,useEffect} from "react";
import Axios from 'axios';
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Irecipe.css";
import history from "../history";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";

const Update_rec=(props)=>{
const[logged]=useState(localStorage.getItem("token")) 
const [rname, setRname] = useState(props.location.state.Rname);
const [category, setCategory] = useState(props.location.state.category);
const [cuisine, setCuisine] = useState(props.location.state.cuisine);
const [description, setDescription] = useState(props.location.state.Description);
const[fields,setFields]=useState([]);
const[stepfield,setStepfield]=useState([]);
const update=()=>{
    Axios.put('http://localhost:3001/api/update_R',{Rname:props.location.state.Rname,newr:rname,Cat:category,Cus:cuisine,des:description}).then(()=>{
    
  });
  history.replace('/Admin_navbar/View_rdetails');
}
useEffect(()=>{
  console.log("useeffect of Update_rec",props.location.state.uname)
		Axios.get('http://localhost:3001/api/get_i',{params:{r:rname}}).then((response)=>{
            // console.log(response.data);
          setFields(response.data)
        });
    Axios.get('http://localhost:3001/api/get_s',{params:{r:rname}}).then((response)=>{
          // console.log(response.data);
        setStepfield(response.data)
      });
},[]);

function handleChange(i, event) {
  const values = [...fields];
  values[i].Iname = event.target.value;
  setFields(values);
}
function handleChange2(i, event) {
  const values = [...fields];
  values[i].proportion = event.target.value;
  setFields(values);
}
function handleRemove(i,field) {
  const values = [...fields];
  values.splice(i, 1);
  setFields(values);
  Axios.delete('http://localhost:3001/api/delete_ing', {params:{Iid:field.Iid}});
}
function handleUpdate(field) {
  Axios.put('http://localhost:3001/api/update_ing',{Iid:field.Iid, Iname:field.Iname,proportion:field.proportion}).then(()=>{});
}
function handleAddS() {
  const values = [...stepfield];
  values.push({ discrip: null });
  setStepfield(values);
}
function handleRemoveS(i) {
  const values = [...stepfield];
  values.splice(i, 1);
  setStepfield(values);
}
function handleChangeS(i, event) {
  console.log("f called");
  console.log(stepfield);
  const values = [...stepfield];
  values[i].dis = event.target.value;
  setStepfield(values);
}
function handleUpdateS(field) {
  Axios.put('http://localhost:3001/api/update_step',{idstep:field.idstep,dis:field.dis}).then(()=>{});
}

 if(logged===null){
  history.replace('/')  
 }  return (
   <>{console.log(props.location.state.Rname)}
        <div style={{height: "90vh" }} className="ir_container">
            <div className="ir_left">
                <h1 style={{textAlign:"center"}}>Update the Recipe Details</h1>
                <Form style={{justifyContent:"center", width:"400px"}} >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={props.location.state.Rname}
                    onChange={(e) => setRname(e.target.value)}
                  />
                </Form.Group>
                <Dropdown style={{padding:"0px 0px 10px 0px"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Category
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" onClick={() => setCategory("Vegetarian")}>Vegetarian</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => setCategory("Non-Vegetarian")}>Non-Vegetarian</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown style={{padding:"0px 0px 10px 0px"}}>
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      defaultValue={props.location.state.Description}
                      onChange={(e) => setDescription(e.target.value)}
                      />
                </Form.Group>
                <Button variant="primary" block onClick={update}>Update</Button>
                </Form>

            </div>

            <div className="ir_right">
              <h1 style={{textAlign:"center"}}>Edit/Delete Ingredients</h1>
              {fields.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`}>
                    {console.log(field)}
                    <input  style={{width:"40%"}} className="ir_input"
                      type="text"
                      // placeholder="Enter ingrediants"
                      Value={field.Iname}
                      onChange={(e) => handleChange(idx, e)}
                    />
                    <input className="ir_input"
                      type="text"
                      Value={field.proportion}
                      onChange={(e) => handleChange2(idx, e)}
                    />
                    <button style={{borderRadius:"8px"}} type="button" onClick={() => handleRemove(idx,field)}>
                      Delete
                    </button>
                    <button style={{borderRadius:"8px"}} type="button" onClick={() => handleUpdate(field)}>
                      Update
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="ir_right">
            <h1 style={{textAlign:"center"}}>Edit/Delete Steps</h1>
            {stepfield.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`}>
                  {console.log(idx+1)}
                  <input style={{width:"65%"}} className="ir_input"
                    type="text"
                    placeholder="Enter Steps"
                    Value={field.dis}
                    onChange={(e) => handleChangeS(idx, e)}
                  />
                  <button style={{borderRadius:"8px"}} type="button" onClick={() => handleRemoveS(idx)}>
                    Delete
                  </button>
                  <button style={{borderRadius:"8px"}} type="button" onClick={() => handleUpdateS(field)}>
                    Update
                  </button>
                </div>
              );
            })} 
            </div>
        </div>
    </>
        
    )
}
export default Update_rec;

