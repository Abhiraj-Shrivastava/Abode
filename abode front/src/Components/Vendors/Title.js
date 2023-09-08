import React, { useEffect, useState } from "react"
import { Grid } from "@mui/material"
import VendorNavigation from "../MyComponents/VendorNavigation"
import Finish from "../MyComponents/Finish"
import { useStyles } from "./TitleCss"
import { useSelector,useDispatch } from "react-redux"
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from "@mui/material";
import { postData } from "../Api/ServerServices"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function Title(){
  var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  

    const classes=useStyles()
    const dispatch=useDispatch()

    

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [status,setStatus]=useState('')

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]

    var titleData=useSelector(state=>state.title)
    var titleD=Object.values(titleData)[0]
const handleSet=()=>{
    if(titleD!=null)
    {
      setTitle(titleD.title)
      setDescription(titleD.description)
      setPrice(titleD.price)
      setOfferPrice(titleD.offerprice)
     
    }
    else if(vendorDB.title!=null && vendorDB.placedescription!=null && vendorDB.price!=null && vendorDB.offerprice!=null  )
    {
      setTitle(vendorDB.title)
      setDescription(vendorDB.placedescription)
      setPrice(vendorDB.price)
      setOfferPrice(vendorDB.offerprice)

    }
  }

    const handleSave=async()=>{
      var body1={title:title,description:description,price:price,offerprice:offerPrice}
      dispatch({type:'ADD_TITLE_DATA',payload:[vendor.mobileno,body1]})

      var body={title:title,description:description,price:price,offerprice:offerPrice,status:"completed",mobileno:vendor.mobileno,opr:"ADD_TITLE_DATA"}
      var result=await postData('vendors/update_vendor_properties',body)
      if(result.status)
  {
      
  alert("success")
  }
  else
  {
    alert('fail')
  }

    }

useEffect(function(){
  handleSet()
},[])




    return(
        <div className={classes.container} >

        {matches?<div className={classes.gradient} >
        
        <p style={{marginLeft:20}}>
        Next,Give <br/> Title <br/> Description<br/>Price for your place
        </p>
        
        </div>:<></>}
        <div style={{display:'flex',flexDirection:'column',width:matches?"50%":"100%"}}>
        <VendorNavigation vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
        <div className={classes.content}>
        <div className={classes.box}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
          <OutlinedInput
          value={title}
                    onChange={(event)=>setTitle(event.target.value)}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Title"
          />
        </FormControl>
        </div>
        <div style={{width: 560,height: 95,display: "flex",justifyContent: "flex-start",alignItems: "center",marginBottom:30}}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
          <OutlinedInput
          value={description}
          onChange={(event)=>setDescription(event.target.value)}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Description"
          />
        </FormControl>
        </div>
        <div className={classes.box}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
          value={price}
                    onChange={(event)=>setPrice(event.target.value)}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Price"
          />
        </FormControl>
        </div>
        <div className={classes.box}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Offer Price</InputLabel>
          <OutlinedInput
          value={offerPrice}
                    onChange={(event)=>setOfferPrice(event.target.value)}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Offer Price"
          />
        </FormControl>
        
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <Button onClick={()=>handleSave()} style={{textTransform:'capitalize',background:'#E31C5F',color:'#FFF'}} variant='contained'>Submit</Button>
        </div>
       
        
        </div>
        
        <Finish nextUrl='/vendorsplashscreen' backUrl='/uploadvendorpicture' />
        
        </div>
        </div>
        )
        
        
        
        
}