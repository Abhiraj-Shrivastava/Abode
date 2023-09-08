import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles } from "./GuestCss"
import { Button } from "@mui/material"
import PrevNext from "../MyComponents/PrevNext"
import { useSelector,useDispatch } from "react-redux"
import VendorNavigation from "../MyComponents/VendorNavigation"
import PlusMinus from "../MyComponents/PlusMinus"
import { HandymanOutlined } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function Guest()
{
 const guestJson=[{id:1,option:'Guests',value:1},{id:2,option:'Beds',value:1},{id:3,option:'Bedrooms',value:1},{id:4,option:'Bathrooms',value:1}]
 var theme=useTheme()
 const matches=useMediaQuery(theme.breakpoints.up('md'))  
    const classes=useStyles()
    const [refresh, setRefresh] = useState(false);

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]
    console.log(vendorDB)
    var guest=[]
if(vendorDB.placeoffer!=null)
{
guest=JSON.parse(vendorDB.placeoffer)
console.log("guest:",guest)
}  

    var guestData=useSelector(state=>state.guest)
    var guestDatas=Object.values(guestData)[0]
if(JSON.stringify(guestData) != "{}")
{
guest=guestDatas
console.log("cccxx:",guest)
}
useEffect(() => {
 
  if (guest.length == 0) {
    dispatch({ type: "ADD_GUEST", payload: [vendor.mobileno, guestJson] });
  } else {
    dispatch({ type: "ADD_GUEST", payload: [vendor.mobileno, guest] });
  }
  setRefresh(!refresh);
}, []);
 

    var dispatch=useDispatch()
   const handleGuest=(index,value)=>{
    
   guest[index].value=value
  
   dispatch({type:'ADD_GUEST',payload:[vendor.mobileno,guest]})
   setRefresh(!refresh);
   }

   



        const showOptions=()=>{
        return guestJson.map((item,index)=>{
        
        return(
        
        <div variant="secondary" className={classes.box}   >
        
        <div >
        {item.option}
        
        </div>
        <div>
            
         <PlusMinus value={guest[index]?.value}  onChange={(value)=>handleGuest(index,value)} />
        </div>
        
        </div>
        )
          
        })
    }
   
return(
<div className={classes.container} >

{matches?<div className={classes.gradient} >

<p style={{margin:20}}>
How many guests would<br/> 
you like to welcome?
</p>

</div>:<></>}
<div style={{display:'flex',flexDirection:'column',width:matches?"50%":"100%"}}>
<VendorNavigation data={{placeoffer:JSON.stringify(guest),mobileno:vendor.mobileno,opr:"ADD_VENDOR_PLACEOFFER"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
<div className={classes.content}>

{showOptions()}

</div>

<PrevNext data={{placeoffer:JSON.stringify(guest),mobileno:vendor.mobileno,opr:"ADD_VENDOR_PLACEOFFER"}} nextUrl='/vendoramenities' backUrl='/vendoraddress' />

</div>

</div>

)

}

