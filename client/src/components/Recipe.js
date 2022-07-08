import React,{useState,useEffect} from 'react'
import {Redirect,Link } from 'react-router-dom';
import Axios from 'axios';
import './Recipe.css'
import recipeicon from './recipeicon.png'
import history from '../history'
const Recipe=(props)=>{
    const[cuisine]=useState(localStorage.getItem("cuisine"))
    const[Category]=useState(localStorage.getItem("cat"))
    const[rec,setRec]=useState("")
    const[rlist,setRlist]=useState([])
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get_recipe',{params:{Cuisine:cuisine,category:Category}}).then((response)=>{
          setRlist(response.data)
           console.log("history recipe =",props.history.location.pathname)
        });
      },[]);

    const selected=(e)=>{
      localStorage.setItem("recipe",e)
      // console.log("history =",props2.history.location.pathname)
      history.push(`${props.history.location.pathname}/Display`)
    }
    return (
        <div className="body">{console.log("cuisine selected")}
            
                <div class="container">
                {rlist.map((val)=>{
                return(
                    
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img src={recipeicon}/>
                                <h3>{val.Rname}</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>{val.Description}</p>
                                {/* <Link to="/Display" className="btn btn-primary" onClick={(e)=>setRec(val.Rname)}>Read More</Link> */}
                                    <a href="" onClick={(e)=>selected(val.Rname)}>Read More</a>
                            </div>
                        </div>
                    </div>
                    
                );
                // return <input type="button" value={val.Rname} onClick={(e)=>setRec(e.target.value)}/>

            })}
                    {/* <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true"/>
                                <h3>Design</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                                    <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true"/>
                                <h3>Code</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                                    <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true"/>
                                <h3>Launch</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                                    <a href="#">Read More</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            

            {/* {rlist.map((val)=>{
                return(
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true"/>
                                <h3>{val.Rname}</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>{val.description}</p>
                                    <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                );
                // return <input type="button" value={val.Rname} onClick={(e)=>setRec(e.target.value)}/>

            })} */}
        </div>
    )
}

export default Recipe
