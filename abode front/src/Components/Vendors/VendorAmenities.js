import React,{useState,useEffect} from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import {Grid} from '@mui/material';
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from "./VendorAmenitiesCss";
import { getData } from "../Api/ServerServices";
import { serverURL } from "../Api/ServerServices";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import VendorNavigation from '../MyComponents/VendorNavigation'
import PrevNext from "../MyComponents/PrevNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";  





const theme = createTheme();

export default function VendorAmenities(props) {
  var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  
  var location=useLocation()
  var dispatch=useDispatch()
  var navigate=useNavigate()
  var vendorData=useSelector(state=>state.vendor)
  var vendor=Object.values(vendorData)[0]
  var vendorDBData=useSelector(state=>state.vendorDBData)
  var vendorDB=Object.values(vendorDBData)[0]

var amenitiesValues={}
if(vendorDB.amenities!=null)
{
  amenitiesValues=JSON.parse(vendorDB.amenities)
}
    


  var amenitiesData=useSelector(state=>state.amenities)
  var amenitiesDatas=Object.values(amenitiesData)[0]
 try{ 
 if(JSON.stringify(amenitiesData)!="{}")
 {
  amenitiesValues=amenitiesDatas
 }
 }catch(e){}
  

  

  const [selectedAmenities,setSelectedAmenities]=useState(amenitiesValues)
  const [amenitiesoptions,setAmenitiesoptions]=useState([])
 
  const classes=useStyles()
  // alert(JSON.stringify(result.data))

  const fetchAllAmenitiesoptions=async()=>{
    const result=await getData('vendors/displayallamenities_vendor')
    setAmenitiesoptions(result.data)
}


const handleAmenitiesClick=(item)=>{
  var options=selectedAmenities

  if(options[item.optionid]==undefined)
  {
  options[item.optionid]=item

  setSelectedAmenities({...options})
  }
  else
  {
    delete options[item.optionid]
    setSelectedAmenities({...options})
  }
    dispatch({type:'ADD_AMENITIES',payload:[vendor.mobileno,options]})
    
}



const setClass=(item)=>{
  try{
  var values=Object.values(selectedAmenities)
  
if(values.length>0)
{
  var result=false
  for(var i=0;i<values.length;i++)
  {
    if(values[i].optionid==item.optionid)
    {
      result=true
      break
    }

  }
  return result
}
else{
return false
}
  }catch(e)
  {
    return false
  }
}

 

  const displayVendorAmenitiesOptions=()=>
  amenitiesoptions.map((item)=>{

      return(
          <div style={{padding:10}}>
          <div style={{fontSize:18,fontWeight:400,paddingBottom:10,paddingTop:10}}>{item.amenities}</div>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
          {displayOptions(JSON.parse('['+item.optionlist+']'))}
          </div>
          </div>
           )
     
    })

    const displayOptions=(list)=>{
    return list.map((item)=>{
  
        return(<div>
  
            
            <div className={setClass(item)?classes.displaySelectedContent:classes.displayContent} onClick={()=>handleAmenitiesClick(item)}>
            <span className={classes.spanStyle}><img src={`${serverURL}/Images/${item.icon}`} style={{width: 50,display:'flex',flexWrap:'wrap-reverse', borderRadius: 5}}/></span> 
        <span className={classes.spanOne}>{item.optionname}</span>

            
            </div>
             </div>)
       
      })
    }

useEffect(function(){
  
fetchAllAmenitiesoptions()

},[])


 return (
  <div className={classes.container} >

  {matches?<div className={classes.gradient} >
  
  <p style={{marginLeft:20}}>
  Let guests know what<br/>
            your place has to offer
  </p>
  
  </div>:<></>}
  <div style={{display:'flex',flexDirection:'column',width:matches?"50%":"100%"}}>
  <VendorNavigation  data={{amenities:JSON.stringify(amenitiesValues),mobileno:vendor.mobileno,opr:"ADD_VENDOR_AMENITIES"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
  <div className={classes.content}>
  
  {displayVendorAmenitiesOptions()}
  
  </div>
  <div style={{margin:10}}>
  <PrevNext data={{amenities:JSON.stringify(amenitiesValues),mobileno:vendor.mobileno,opr:"ADD_VENDOR_AMENITIES"}} nextUrl='/uploadvendorpicture' backUrl='/guest' />
  </div>
  </div>
  </div>
  
  );
}