import React,{useState,useEffect} from "react";
import { Button,Grid,InputAdornment,TextField,Box} from "@mui/material";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import {useStyles} from "./DisplayAllVendorsCss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { postData } from "../../Api/ServerServices";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function DisplayAllVendors(props){  

  const classes=useStyles()   

const[vendors,setVendors]=useState([])
const [date,setDate]=useState('')
const [firstName,setFirstName]=useState('')
const [lastName,setLastName]=useState('')  
const [emailId,setEmailId]=useState('')  
const [mobileNumber,setMobileNumber]=useState('') 
const[message,setMessage]=useState('')
const[open,setOpen]=useState(false)

const handleEdit=async(rowData)=>{
  var body={firstname:firstName,lastname:lastName,dob:date,mobilenumber:mobileNumber,emailid:emailId}
  console.log(body)
  var response=await postData('vendors/updatevendor',body)
  if(response.status)
  {
    setMessage('Vendor has been Edited ')
    fetchAllVendors()
  }
  else{
    setMessage('Fail to Edit the Vendor')
  }
  
}

const handleDelete=async(rowData)=>{
  
  Swal.fire({
    title: 'Do you want to delete the selected record?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    
    if (result.isConfirmed) {
      var body={emailid:rowData.emailid,mobilenumber:rowData.mobileno}
      var response=await postData('vendors/deletevendor',body)
      if(response.status)
      { Swal.fire('Vendor deleted Successfully', '', 'success')
      fetchAllVendors()
      }
      else{
        Swal.fire('Server Error', '', 'error')
      }
     
    } else if (result.isDenied) {
      Swal.fire('Your Record is Safe', '', 'info')
    }
  })

  


}  


const handleClose=()=>{
  setOpen(false)
}

const handleOpenDialog=(rowData)=>{
  console.log(rowData)
  setMessage('')
  setMobileNumber(rowData.mobileno)
  setFirstName(rowData.firstname) 
  setLastName(rowData.lastname) 
  setEmailId(rowData.emailid)
  setDate(rowData.dob)
  setOpen(true)
}

const editView=()=>{
  return(
    <div className={classes.editRoot}>
        <div className={classes.editSubdiv}>
        <div className={classes.heading}>
                    Vendor register
                    </div>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField
            value={firstName}
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
      value={lastName}
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
      disabled
      value={emailId}
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
      disabled
      value={mobileNumber}
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
                     <Button variant="contained" onClick={()=>handleEdit()}   fullWidth>Edit Vendor</Button>

                 </Grid>
                 
                 <Grid item xs={12} className={classes.messageStyle}>
                   {message}
                 </Grid>
    </Box>


        </div>
    </div>
)
}


const openDialog=()=>{
  return(
    <div>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    
    <DialogContent>
      {editView()}
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>handleClose()} autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
</div>

  )
}

function displayTable() {
    return (
      <MaterialTable
      title={'Vendor List'}
        data={vendors}
        columns={[
            {
              title: "Vendor First Name",
              field: "firstname",
             
            },
            {
              title: "Vendor Last Name",
              field: "lastname",
            },
            {
                title: "Email Id",
                field: "emailid",
              },
              {
                title: "Mobile Number",
                field: "mobileno",
              },
              {
                title: "Date Of Birth",
                field: "dob",
              },
           
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Vendor",
            onClick: (event, rowData) => {
              handleOpenDialog(rowData)
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete Vendor",
            onClick: (event, rowData) => {
              handleDelete(rowData)
              
            },
          },
        ]}
       
      />
    );
  }



    const fetchAllVendors=async()=>{
        const result=await getData('vendors/displayallvendors')
        setVendors(result.data)
    }


    useEffect(function(){
       fetchAllVendors()

    },[])

    return(
        <div className={classes.root}>
          <div className={classes.subdiv}> 
            {displayTable()}
            </div>
           {openDialog()}
        </div>

    )
    
}