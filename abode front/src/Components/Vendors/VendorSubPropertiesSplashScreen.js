import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles } from "./VendorSubPropertiesSplashScreenCss"
import { getData,postData,serverURL } from "../Api/ServerServices"
import { Button } from "@mui/material"
import PrevNext from "../MyComponents/PrevNext"
import { useSelector } from "react-redux"
import VendorNavigation from "../MyComponents/VendorNavigation"
import { useDispatch } from "react-redux"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function VendorSubPropertiesSplashScreen()
{
    var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  
    const [subProperties,setSubProperties]=useState([])
    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorDBData=useSelector(state=>state.vendorDBData)
var vendorDB=Object.values(vendorDBData)[0]
var subpropertyid=''
if(vendorDB.subpropertyid!=null)
{
subpropertyid=vendorDB.subpropertyid
}

    var propertyData=useSelector(state=>state.properties)
    var property=Object.values(propertyData)[0]
    var propertySubData=useSelector(state=>state.subProperties)
    var subProperty=Object.values(propertySubData)[0]
  
    try{
     subpropertyid=subProperty.subpropertyid
    }
    catch(e){}
    const [selectedSubPropertyId,setSelectedSubPropertyId]=useState(subpropertyid)
    var dispatch=useDispatch()
    

const fetchAllSubProperties=async()=>{
    
    var result =await postData('vendors/subproperty_by_propertyid',{propertyid:property.propertyid})
      setSubProperties(result.data)


}

const handleShadow=(item)=>{
    setSelectedSubPropertyId(item.subpropertyid)
    dispatch({type:'ADD_SUB_PROPERTIES',payload:[vendor.mobileno,item]})


}
const showSubProperties=()=>{
return subProperties.map((item)=>{

return(

<div variant="secondary" onClick={()=>handleShadow(item)} className={item.subpropertyid===selectedSubPropertyId?classes.boxShade:classes.box}>

<div>
{item.subpropertyname}
</div>
<div style={{fontSize:'14px',fontWeight:'200' }} >
{item.description}

</div>
</div>
)

})



}


useEffect(function(){

fetchAllSubProperties()


},[])

const classes=useStyles()

return(
<div className={classes.container} >

{matches?<div className={classes.gradient} >

<p style={{marginLeft:20}}>
Which of these best <br/> describes your place?
</p>

</div>:<></>}
<div style={{display:'flex',flexDirection:'column',width:matches?"50%":"100%"}}>
<VendorNavigation data={{subpropertyid:subpropertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_SUBPROPERTIES"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
<div className={classes.content}>

{showSubProperties()}

</div>

<PrevNext data={{subpropertyid:subpropertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_SUBPROPERTIES"}} nextUrl='/thirdpage' backUrl='/vendorproperties' />

</div>
</div>

)




}

