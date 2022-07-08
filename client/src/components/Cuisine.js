import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import Recipe from './Recipe'
import Axios from 'axios';
import './Cuisine.css'
import american from './american.jpg'
import indian from './indian.jpg'
import italian from './italian.jpg'
import chinese from './chinese.jpg'
import japanese from './japanese.jpg'
import history from "../history";

const Cuisine = (props) => {
    const[cus,setCus]=useState("")
    const[cuisinelist,setCuisinelist]=useState([])
    const[cat]=useState("")

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get_cuisine/${localStorage.getItem("cat")}`).then((response)=>{
            console.log(response.data)
          setCuisinelist(response.data)
        //   console.log("history =",props2.history.location.pathname)
        });
      },[]);

      const selected2=(e)=>{
        localStorage.setItem("cuisine",e)
        // console.log("history =",props2.history.location.pathname)
        history.push(`${props.history.location.pathname}/Recipe`)
      }
    return (
            <div id="cards_landscape_wrap-2">
                <div class="tempcontainer">
                    
                        <div  onClick={()=>{selected2('Indian')}}>
                            <a href="">
                                <div class="card-flyer">
                                    <div class="text-box">
                                        <div class="image-box">
                                            <img src="https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                                        </div>
                                        <div class="text-container">
                                            <h6>Indian</h6>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div  onClick={()=>{selected2('Italian')}}>
                            <a href="">
                                <div class="card-flyer">
                                    <div class="text-box">
                                        <div class="image-box">
                                            <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                                        </div>
                                        <div class="text-container">                                    
                                            <h6>Italian</h6>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div onClick={()=>{selected2('Chinese')}}>
                            <a href="">
                                <div class="card-flyer">
                                    <div class="text-box">
                                        <div class="image-box">
                                            <img src="https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                                        </div>
            
                                        <div class="text-container">
                                            <h6>Chinese</h6>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div  onClick={()=>{selected2('Japanese')}}>
                            <a href="">
                                <div class="card-flyer">
                                    <div class="text-box">
                                        <div class="image-box">
                                            <img src="https://images.pexels.com/photos/3535392/pexels-photo-3535392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                                        </div>
                                        <div class="text-container">
                                            <h6>Japanese</h6>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div  onClick={()=>{selected2('American')}}>
                            <a href="">
                                <div class="card-flyer">
                                    <div class="text-box">
                                        <div class="image-box">
                                            <img src="https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
                                        </div>
                                        <div class="text-container">
                                            <h6>American</h6>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    
                </div>
            </div>
        //     {cuisinelist.map((val)=>{
        //         return <input type="button" value={val.cuisine} onClick={(e)=>setCus(e.target.value)}/>
        //     })}
        //    category selectedd .....select cuisine 
        // </div>
    )
}

export default Cuisine
