import React, { useState,createRef,useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ViewComponent from "./ViewComponent";
import { postData,getData } from "../Api/ServerServices";
import { serverURL } from "../Api/ServerServices";
import { useNavigate,useLocation } from "react-router-dom";
import ViewProperty from "./ViewProperty";

export default function PropertiesPage(props){
    var location = useLocation();
    const [property,setProperty]=useState([])
   
    const fetchPropertiesData = async () => {
        var body = { vpid: location.state.vendorpropertyid };
        var result = await postData("users/search_property_by_id", body);
        console.log(result.data)
        setProperty(result.data);
      };
      useEffect(function () {
        fetchPropertiesData();
      }, []);
      const showProperty=()=>{
        return property.map((item)=>{
            return (
                <ViewProperty pictures={item.pictures} data={item}  />
            )
        })
    }
    return(
        <div>
        <Header />
       <div style={{marginLeft:'150px',marginRight:'150px', marginTop:15,}}>
        <div style={{display:'flex',flexDirection:'column', }}>
        {showProperty()}
        </div>
        </div>
        <Footer/>
        </div>
    )

}