import React,{useState,useEffect} from "react";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Irecipe.css";
import history from "../history";

const Irecipe=()=>{
const [show,setShow]=useState(true)
const[logged]=useState(localStorage.getItem("token")) 
const submitDetails=()=>{
  Axios.post('http://localhost:3001/api/insert_recipe',{Rname:recipe,uname:logged,category:Category,cuisine:Cuisine,Dis:dis}).then(()=>{
    alert("recipe posted");
  });
  handleSubmit();
};

const[ing,setIng]=useState("")
const[proportion,setProportion]=useState("")
const[dis,setDis]=useState("")
const[recipe,setRecipe]=useState("")
const[Category,setCategory]=useState("")
const[Cuisine,setCuisine]=useState("")
const[stepno,setStepno]=useState("")
const[step,setStep]=useState("")

const [fields, setFields] = useState([{ value: null,amt: null }]);
const [stepfield, setStepfield] = useState([{ discrip: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }
  function handleChange2(i, event) {
    const values = [...fields];
    values[i].amt = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  function handleChangeS(i, event) {
    console.log("f called");
    console.log(stepfield);
    const values = [...stepfield];
    values[i].discrip = event.target.value;
    setStepfield(values);
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

  function subStep(){
    console.log(stepfield);
    stepfield.map((data)=>{
      Axios.post('http://localhost:3001/api/insert_step',{Recname:recipe,Step:data.discrip}).then(()=>{
      });
    }
    )
  }


  function handleSubmit() {
    console.log(fields);
    subStep();
    fields.map( (data)=>{
        Axios.post('http://localhost:3001/api/insert_ingrediant',{Iname:data.value,Rname:recipe,Proportion:data.amt}).then(()=>{
          setIng("");
        })
    });
    history.replace('/User_navbar')
  }
 if(logged===null){
  history.replace('/')
 }  return (
   <>
  <div className="ir_container">
    <div className="ir_left">
          <h1 style={{textAlign:"center"}}>Insert the recipe</h1>
        <Form style={{justifyContent:"center", width:"400px"}}>
      {console.log("hi")}
      <Form.Group controlId="formBasicEmail">
        <Form.Label >RName</Form.Label>
        <Form.Control
          type="text"
          defaultValue={""}
          onChange={(e) => setRecipe(e.target.value)}
        />
      </Form.Group>

      {/* <Form.Group controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          defaultValue={logged}
          // onChange={(e) => setUname(e.target.value)}
        />
      </Form.Group> */}

      <Form.Group controlId="formBasicEmail">
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

      </Form.Group>

      {/* <Form.Group controlId="formBasicEmail">
        <Form.Label>Cuisine</Form.Label>
        <Form.Control
          type="text"
          defaultValue={""}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </Form.Group> */}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            onChange={(e) => setDis(e.target.value)}
            />
      </Form.Group>

      {/* <Button variant="primary"  block onClick={submitDetails}>
        Insert
      </Button> */}

    </Form>
  </div>

  <div className="ir_right">
  <Button variant="primary"  block onClick={() => handleAdd()}>
        Add Ingredient
      </Button>
    {/* <button type="button" onClick={() => handleAdd()}>
        Add
      </button> */}

      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            {console.log(idx+1)}
            <input style={{width:"50%"}} className="ir_input"
              type="text"
              placeholder="Enter ingrediants"
              value={field.value || ""}
              onChange={(e) => handleChange(idx, e)}
            />
            <input className="ir_input"
              type="text"
              placeholder="Enter amount"
              value={field.amt || ""}
              onChange={(e) => handleChange2(idx, e)}
            />
            <button style={{borderRadius:"8px"}} type="button" onClick={() => handleRemove(idx)}>
              Remove
            </button>
          </div>
        );
      })}
      {/* <button type="button" onClick={() => handleSubmit()}>
        Submit
      </button> */}
  </div>
  <div  className="ir_right">
  <Button variant="primary"  block onClick={() => handleAddS()}>
        Add Step
      </Button>

      {stepfield.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            {console.log(idx+1)}
            <input style={{width:"80%"}} className="ir_input"
              type="text"
              placeholder="Enter Steps"
              value={field.discrip || ""}
              onChange={(e) => handleChangeS(idx, e)}
            />
            <button  style={{borderRadius:"8px"}} type="button" onClick={() => handleRemoveS(idx)}>
              Remove
            </button>
          </div>
        );
      })}
  </div>
    </div>
    <Button variant="primary"  block onClick={submitDetails}>
        Insert
      </Button>
  </>
        
    )
}
export default Irecipe;



// import React,{useState,useEffect} from "react";
// import {Redirect} from 'react-router-dom';
// import Axios from 'axios';
// import { Modal, Button, Form } from "react-bootstrap";
// import "../styles.css";
// import "bootstrap/dist/css/bootstrap.css";
// import Dropdown from 'react-bootstrap/Dropdown'
// const Irecipe=()=>{
// const [show,setShow]=useState(true) 
// const[logged]=useState(localStorage.getItem("token"))
// const submitDetails=()=>{
//   Axios.post('http://localhost:3001/api/insert_recipe',{Rname:recipe,uname:logged,category:Category,cuisine:Cuisine,Dis:dis}).then(()=>{
//     alert("recipe posted");
//   });
// };
// const add=()=>{
//   Axios.post('http://localhost:3001/api/insert_ingrediant',{Iname:ing,Rname:recipe,Proportion:proportion}).then(()=>{
//     setIng("");
//     console.log("ing posted")
//   });
// };

// const addstep=()=>{
//   Axios.post('http://localhost:3001/api/insert_step',{stepid:stepno,Recname:recipe,Step:step}).then(()=>{
//     alert("ing posted");
//     console.log("ing posted")
//   });
// };

// const[ing,setIng]=useState("")
// const[proportion,setProportion]=useState("")
// const[dis,setDis]=useState("")
// const[recipe,setRecipe]=useState("")
// const[Category,setCategory]=useState("")
// const[Cuisine,setCuisine]=useState("")
// const[stepno,setStepno]=useState("")
// const[step,setStep]=useState("")
// if(logged===null){
//   return <Redirect to="/"/>
// }
//     return (
//         <div>
//           <h1>Insert the recipe</h1>
//         <Form style={{border:"2px solid black",justifyContent:"center", width:"500px"}}>
//       {console.log("hi")}
//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>RName</Form.Label>
//         <Form.Control
//           type="text"
//           defaultValue={""}
//           onChange={(e) => setRecipe(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicPassword">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           Value={logged}
//           // onChange={(e) => setUname(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>Category</Form.Label>
//         {/* <Form.Control
//           type="text"
//           defaultValue={""}
//           onChange={(e) => setCategory(e.target.value)}
//         /> */}
//         <Dropdown>
//           <Dropdown.Toggle variant="success" id="dropdown-basic">
//           Category
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1" onClick={() => setCategory("Vegetarian")}>Vegetarian</Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={() => setCategory("Non-Vegetarian")}>Non-Vegetarian</Dropdown.Item>
//         </Dropdown.Menu>
//         </Dropdown>
        
//         <Dropdown>
//           <Dropdown.Toggle variant="success" id="dropdown-basic">
//           Cuisine
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1" onClick={() => setCuisine("Italian")}>Italian</Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Japanese")}>Japanese</Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Chinese")}>Chinese</Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={() => setCuisine("Indian")}>Indian</Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={() => setCuisine("American")}>American</Dropdown.Item>
//         </Dropdown.Menu>
//         </Dropdown>

//       </Form.Group>

//       {/* <Form.Group controlId="formBasicEmail">
//         <Form.Label>Cuisine</Form.Label>
//         <Form.Control
//           type="text"
//           defaultValue={""}
//           onChange={(e) => setCuisine(e.target.value)}
//         />
//       </Form.Group> */}
//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>Description</Form.Label>
//         <textarea
//             className="form-control"
//             id="exampleFormControlTextarea1"
//             rows="5"
//             onChange={(e) => setDis(e.target.value)}
//             />
//       </Form.Group>

//       <Button variant="primary"  block onClick={submitDetails}>
//         Insert
//       </Button>

//     </Form>
//     <div><label>ingrediant</label>
//     <input type="text"   defaultValue={ing} onChange={(e)=>{setIng(e.target.value)}}/>
//     <label>proportion</label>
//     <input type="text"   defaultValue={proportion} onChange={(e)=>{setProportion(e.target.value)}}/>
//     <button onClick={add}>Add</button></div>
//     <div><label>step-no</label>
//     <input type="text"   defaultValue={stepno} onChange={(e)=>{setStepno(e.target.value)}}/>
//     <label>process</label>
//     <input type="text"   defaultValue={step} onChange={(e)=>{setStep(e.target.value)}}/>
//     <button onClick={addstep}>Add</button></div>
//         </div>
//     )
// }
// export default Irecipe;