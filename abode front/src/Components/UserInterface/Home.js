import React, { useState,createRef,useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ViewComponent from "./ViewComponent";
import { postData,getData } from "../Api/ServerServices";
import { useNavigate } from "react-router-dom";
import StateHeader from "./StateHeader";

export default function Home(props){
   
    var navigate=useNavigate()
    const [cities,setCities]=useState([])
    const getAllCities=async(state_city='',stateid)=>{
        var body={state_city:state_city,stateid:stateid}
        var result=await postData('users/displayallcities',body)
        setCities(result.data)
        
    }
    useEffect(function(){
    getAllCities('')
    },[])
    const handleNavigate=(city)=>{
       
       navigate("/secondpage",{state:{city:city}})

    }

    const showAllCities=()=>{
        return cities.map((item)=>{
            return (
                <ViewComponent pictures={item.picture} data={item} navigation={handleNavigate}  />
            )
        })
    }
   const searchingCityState=(city_state)=>{
    getAllCities(city_state,0)

   }
   
   const searchingCity=(stateid)=>{
    getAllCities("",stateid)
    

   }


    return(
        <div>
        <Header searchfn={searchingCityState}/>
        <StateHeader searchcity={searchingCity}/>
        <div style={{marginRight:10,display:'flex',justifyContent:'center',flexWrap:'wrap',flexDirection:'row',marginTop:15,marginBottom:40}}>
        {showAllCities()}
        </div>
        <Footer/>
        </div>
    )
} 