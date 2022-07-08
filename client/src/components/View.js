import React,{useState,useEffect} from "react";
import {Route,Link} from 'react-router-dom';
import Axios from 'axios';
import './Category.css'
import veg from './veg.jpg'
import nonveg from './nonveg.jpg'
import Cuisine from "./Cuisine";
import history from "../history";
const View = (props) => {
    const[cat,setCat]=useState("")
    const[catlist,setCatlist]=useState([])
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/get_cat").then((response)=>{
          setCatlist(response.data)
        });
      },[]);
      const selected=(e)=>{
        
        localStorage.setItem("cat",e)
        // console.log("history =",props.history.location.pathname)
        // props.history.push(`${props.history.location.pathname}/cuisine`)
        history.push(`${props.history.location.pathname}/cuisine`)
      }
        return (
            <div>
              <div className="custcards-list">
                <div className="custcard 1" onClick={()=>{selected('Vegetarian')}}>
                  <div className="custcard_image"> <img src={veg} /> </div>
                  <div className="custcard_title title-white">
                    <p>Vegetarian</p>
                  </div>
                </div>

                <div className="custcard 2" onClick={()=>{selected('Non-Vegetarian')}}>
                <div className="custcard_image">
                  <img src={nonveg}/>
                  </div>
                <div className="custcard_title title-white">
                  <p>Non-Vegetarian</p>
                </div>
                </div>

              </div>
            </div>
                      )
                  }
    
    


export default View
