import React, { useState,useEffect,useRef } from "react";
import AppBar from "@mui/material/AppBar";
import { useStyles } from "./HeaderCss";
import { useNavigate } from "react-router";
import { serverURL } from "../Api/ServerServices";
import { getData,postData } from "../Api/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { IconButton } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function StateHeader(props) {
  const classes = useStyles();
  const theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.down('sm'))
  var rs=useRef()
  const [states, setStates] = useState([]);
  const [buttonStyle, setButtonStyle] = useState({display: 'none'});
  const navigate = useNavigate();
  var settings = {
      
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: matches?4:8,
    slidesToScroll: matches?4:8
  };

  const handleShow=(index)=>{
    if(index==0 ||index==1 ||index==2 ||index==3 ||index==4 ||index==5 ||index==6 ||index==7  ){
      setButtonStyle({display: 'none'})
  
    }
  
  }
const handleCities=(item)=>{
  props.searchcity(item.stateid)
console.log(item.stateid);
}
 

  const showimages=()=>{
    return states.map((item,index)=>{
        return (
            <div style={{margin:9}}  onMouseEnter={()=>handleShow(index)}  >
              <div onClick={()=>handleCities(item)} style={{cursor:'pointer'}}>
            <div style={{padding:5,display:'flex',justifyContent:'center',borderRadius:8,height:50}}  >  
                <img style={{borderRadius:15}} src={`${serverURL}/images/${item.picture}`} width='50' />
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
            {item.statename}
            </div>
            </div>
            </div>       
        )
    })
  }
  const fetchAllStates=async()=>{
    const result=await getData('users/displayallstates')
    setStates(result.data)
}


useEffect(function(){
   fetchAllStates()

},[])

const handleNext=()=>{
    rs.current.slickNext()
    setButtonStyle({display: 'flex',position: "absolute",left: 5,top: 40,zIndex: 2,border: 0,borderRadius: 13,width: 26,height: 26,backgroundColor: "#fff",color: "#000",cursor: "pointer"})
}
const handlePrev=()=>{
  rs.current.slickPrev()
}

  return (
    <div style={{height:60,display:'flex',flexDirection:'row', marginTop:10}}>
         <>
<div style={{display:'inline-list-item',position:'relative',width:"100%"}} >
<IconButton onClick={handlePrev} variant="contained" style={buttonStyle} >
        <ArrowCircleLeftIcon /></IconButton>      
          
        <Slider {...settings} ref={rs}>
            {showimages()}
         </Slider>
         <IconButton onClick={handleNext} variant="contained" style={{display: 'flex',position: "absolute",right: 5,top: 40,zIndex: 2,border: 0,borderRadius: 13,width: 26,height: 26,backgroundColor: "#fff",color: "#000",cursor: "pointer"}} >
        <ArrowCircleRightIcon /></IconButton>
        
        
         </div>
         </>
          </div>
  );
}
