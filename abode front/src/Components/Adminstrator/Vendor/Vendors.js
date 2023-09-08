import React,{useState} from "react";
import{TextField,Grid,Button,InputAdornment,InputLabel,Input,FormControl,Box} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {useStyles} from "./VendorsCss"
import { postData } from "../../Api/ServerServices";
import { ClassNames } from "@emotion/react";
import Swal from "sweetalert2";




export default function Vendors(props){
    const classes=useStyles()
    const [date,setDate]=useState()
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')  
    const [emaiId,setEmailId]=useState('')  
    const [mobileNumber,setMobileNumber]=useState('') 
    
    const handleClick=async()=>{
      var body={firstname:firstName,lastname:lastName,emailid:emaiId,mobilenumber:parseInt(mobileNumber),dob:date}
      var response=await postData('vendors/addnewvendors',body)
      if(response.status)
      { Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Vendor has been saved',
          showConfirmButton: false,
          timer: 1500
        })}
      else
      {
          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Fail to Save the Record',
              showConfirmButton: false,
              timer: 1500
            })
  
      }
  
  
      
  }

    return(
        <div className={classes.root} >
            <div className={classes.subdiv}>
            <div className={classes.heading}>
                    Vendor register
                    </div>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField
        onChange={(event)=>setFirstName(event.target.value)}
        label="First Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        onChange={(event)=>setLastName(event.target.value)}
        label="Last Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
       onChange={(event)=>setEmailId(event.target.value)}
        label="Email Id"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
        onChange={(event)=>setMobileNumber(event.target.value)}
        label="Mobile Number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

      </Box>
      <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleClick()}   fullWidth>Add New Vendor</Button>

                 </Grid>
    </Box>
   
    </div>
    </div>


    )
}