import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles } from "./ThirdPageCss"

import { useSelector,useDispatch } from "react-redux"
import PrevNext from "../MyComponents/PrevNext"
import VendorNavigation from "../MyComponents/VendorNavigation"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function ThirdPage()
{ 
    var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  
    const description=[{id:1,description:'An entire place'},{id:2,description:'A private room'},{id:3,description:'A shared room'}] 
    const classes=useStyles()

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorDBData=useSelector(state=>state.vendorDBData)
var vendorDB=Object.values(vendorDBData)[0]
var propertystatus=vendorDB.propertystatus
var id=''
if(parseInt(propertystatus)!=null)
{
id=parseInt(propertystatus)
}

    var descriptionData=useSelector(state=>state.description)
    var _description=Object.values(descriptionData)[0]
   
try{
 id=_description.id
}
catch(e)
{}

const [selectedDescriptionId,setSelectedDescriptionId]=useState(id)
const [selectedStatus,setSelectedStatus]=useState('')

var dispatch=useDispatch()

    const handleShadow=(item)=>{
        setSelectedDescriptionId(item.id)
        setSelectedStatus(item.description)

        dispatch({type:'ADD_PROPERTY_DESCRIPTION',payload:[vendor.mobileno,item]})
    
    }


    const showDescription=()=>{
        return description.map((item)=>{
        
        return(
        
        <div variant="secondary" onClick={()=>handleShadow(item)} className={item.id===selectedDescriptionId?classes.boxShade:classes.box}>
        
       
        <div style={{fontSize:'14px',fontWeight:'200' }} >
        {item.description}
        
        </div>
        </div>
        )
        
        })
        
        
        
        }

    

return(
<div className={classes.container} >
{matches?<div className={classes.gradient} >

<p style={{marginLeft:20}}>
What kind of space will <br/> guest have?
</p>

</div>:<></>}
<div style={{display:'flex',flexDirection:'column',width:matches?'auto':"100%"}}>
<VendorNavigation data={{propertystatus:id,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTYSTATUS"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
<div className={classes.content}>

{showDescription()}

</div>

<PrevNext data={{propertystatus:id,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTYSTATUS"}} nextUrl='/vendoraddress' backUrl='/vendorsubproperties' />

</div>
</div>
)




}

