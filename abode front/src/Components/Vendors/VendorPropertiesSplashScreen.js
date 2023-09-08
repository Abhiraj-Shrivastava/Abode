import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles } from "./VendorPropertiesSplashScreenCss"
import { getData,PostData,serverURL } from "../Api/ServerServices"
import { Button } from "@mui/material"
import { useNavigate,useLocation } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import VendorNavigation from "../MyComponents/VendorNavigation"
import PrevNext from "../MyComponents/PrevNext"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function VendorPropertiesSplashScreen()
{ 
  var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  
  var navigate=useNavigate()
  var location=useLocation()
  var dispatch=useDispatch()
  console.log("bbb",location)

const classes=useStyles()

var vendorData=useSelector(state=>state.vendor)
var vendor=Object.values(vendorData)[0]
var vendorDBData=useSelector(state=>state.vendorDBData)
var vendorDB=Object.values(vendorDBData)[0]
var propertyid=''
if(vendorDB.propertyid!=null)
{
propertyid=vendorDB.propertyid
}
var propertyData=useSelector(state=>state.properties)
var property=Object.values(propertyData)[0]
 

try{
    propertyid=property.propertyid
}
catch(e)
{}


const [properties,setProperties]=useState([])
const [selectedPropertyId,setSelectPropertyId]=useState(propertyid)



const fetchAllProperties=async()=>{
    const result=await getData('vendors/displayallproperties')
        setProperties(result.data)

}
useEffect(function(){
    fetchAllProperties()
},[])


const handleShadow=(item)=>{
    setSelectPropertyId(item.propertyid)
    dispatch({type:'ADD_PROPERTIES',payload:[vendor.mobileno,item]})

}

const showAllProperties=()=>{
    return properties.map((item)=>{
        return(
          
            <div style={{minHeight:'45px',maxHeight:'45px'}} variant="Secondary" onClick={()=>handleShadow(item)} className={item.propertyid===selectedPropertyId?classes.boxShade:classes.box}>{item.propertytype}

            <div style={{display:'flex', justifyContent:'flex-end',width:'inherit',marginRight:50,  }}>
             <img src={`${serverURL}/images/${item.propertyicon}`} style={{width: 60, borderRadius: 20}}/>
            </div>
            </div>
       
        )
    })
}


return(
      <div style={{display:'flex',height:'100vh'}}>
      {matches?<div className={classes.gradient}>
          <p style={{marginLeft:30}}> What kind of place will<br/> you host?</p>
        </div>:<></>}

        <div style={{display:'flex',flexDirection:'column',width:matches?"50%":"100%"}}>
        <VendorNavigation data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTIES"}} vendorName={vendor.firstname+' '+vendor.lastname} myurl='/addproperties'/>
        <div className={classes.content}>
       
           {showAllProperties()}
        </div>
        <PrevNext data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTIES"}}   nextUrl='/vendorsubproperties'/>
        </div>
       
        
      </div>

)


}