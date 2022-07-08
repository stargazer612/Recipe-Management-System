import React,{useState,useEffect} from "react";
import Axios from 'axios';
import './Display.css'
function Display() {
   
    const[rlist,setRlist]=useState([])
    const[ilist,setIlist]=useState([])
    const[slist,setSlist]=useState([])
    const[recipe]=useState(localStorage.getItem("recipe"))
	const getRDetails=()=>{
		Axios.get('http://localhost:3001/api/get_r',{params:{r:recipe}}).then((response)=>{
            // console.log(response.data);
          setRlist(response.data)
        });
	}
	const getIDetails=()=>{
		Axios.get('http://localhost:3001/api/get_i',{params:{r:recipe}}).then((response)=>{
            // console.log(response.data);
          setIlist(response.data)
        });
	}
	const getSDetails=()=>{
		Axios.get('http://localhost:3001/api/get_s',{params:{r:recipe}}).then((response)=>{
            // console.log(response.data);
          setSlist(response.data)
        });
	}
	useEffect(()=>{
		getRDetails();
		getIDetails();
		getSDetails();
	  },[]);

    return (
        <div className="display_container">
			{/* {console.log("r-",localStorage.getItem("recipe"))} */}
            <div className="display_left">
				{rlist.map((val)=>{
					return<> 
						<h1>{val.Rname}</h1>
						<hr/>
						<div>
						<h3 style={{padding:"20px 0px 20px 0px"}}> By~ {val.uname}</h3>
						<h3 style={{padding:"0px 10px 0px 10px"}}>{val.Description}</h3>
						</div></>
				})}
            
            </div>
            <div className="display_right">
            <div class="login2-wrap">
	<div class="login2-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">Steps</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Ingredients</label>
		<div class="login2-form">
			<div class="sign-up-htm">
			{slist.map((val,idx)=>{
					return <><h2>{idx+1}. {val.dis}</h2>
					</>
				})}
				{/* <div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password"/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign In"/>
				</div> */}
				{/* <div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div> */}
			</div>
			<div class="sign-in-htm">
			{ilist.map((val,idx)=>{
					return <><h2>{idx+1}. {val.Iname}-{val.proportion}</h2>
					</>
				})}
			
				{/* <div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input id="pass" type="password" class="input" data-type="password"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input id="pass" type="text" class="input"/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign Up"/>
				</div> */}
				{/* <div class="hr"></div> */}
			</div>
		</div>
	</div>
</div>
            </div>
            {/* selected {recipe}
            {rlist.map((val)=>{
                return <>{val.Rname}-{val.uname}-{val.steps}</>
            })} */}
        </div>
    )
}

export default Display
