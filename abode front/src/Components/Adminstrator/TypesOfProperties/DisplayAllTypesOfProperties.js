import React,{useState,useEffect} from "react"
import { getData } from "../../Api/ServerServices"
import MaterialTable from '@material-table/core'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import {useStyles} from "./DisplayAllTypesOfPropertiesCss"
import { Button,Grid,TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2"; 
import { postData,serverURL } from "../../Api/ServerServices";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import AddAction from "../../MyComponents/AddAction";

const Input = styled('input')({
    display: 'none',
  });
  

export default function DisplayAllTypesOfProperties(props){
  const classes=useStyles()
  
 const [property,setProperty]=useState([])
 const[propertyId,setPropertyId]=useState('')   
 const[propertyType,setPropertyType]=useState('')      
 const[propertyIcon,setPropertyIcon]=useState({bytes:'',filename:''})
 const[tempPropertyIcon,setTempPropertyIcon]=useState({bytes:'',filename:''})   
 const[message,setMessage]=useState('')
 const[showBtn,setShowBtn]=useState('')
 const[open,setOpen]=useState(false) 
 
 const handleClose=()=>{
  setOpen(false)
  setMessage('')
 }
 

 const handleEditData=async()=>{
  var body={propertyid:propertyId,propertytype:propertyType}
  var response = await postData('typesofproperties/updateproperty',body)
  
  if(response.status){
      setMessage('Property has been edited')
      fetchAllTypesOfProperties()
  }
  else 
  {
    setMessage('Fail to save the Property name')
  }
}

 const handleEdit=(rowData)=>{
 fetchAllTypesOfProperties()
 setPropertyId(rowData.propertyid)
 setPropertyType(rowData.propertytype)
 setPropertyIcon({bytes:'',filename:`${serverURL}/images/${rowData.propertyicon}`})
 setTempPropertyIcon({bytes:'',filename:`${serverURL}/images/${rowData.propertyicon}`})
 
 setOpen(true)
 }

 const handleDelete=async(rowData)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You Want To Delete This Property",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      var body={propertyid:rowData.propertyid}
      var response = await postData('typesofproperties/deleteproperty',body)
      if(response.status){
      Swal.fire(
        'Deleted!',
        'Your Record has been deleted.',
        'success'
      )
      fetchAllTypesOfProperties()
      }
      else{
        Swal.fire('Server Error','','error')
      }
    }
    else if(result.isDismissed)
    Swal.fire('Your Record is safe','','info')
  })
}

const handleChangeIcon=(event)=>{
  setPropertyIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
  setShowBtn(true)
}

const cancelPropertyIcon=()=>{
  setPropertyIcon({bytess:'',filename:tempPropertyIcon.filename})
  setShowBtn(false)
}

const editPropertyIcon=async()=>{
  var formData= new FormData()
  formData.append('propertyid',propertyId)
  formData.append('propertyicon',propertyIcon.bytes)
  formData.append('oldpropertyicon',tempPropertyIcon.filename.substring(tempPropertyIcon.filename.lastIndexOf("/")+1))
  var response = await postData('typesofProperties/updatepropertyicon',formData,true)
  
  if(response.status){
      setMessage('Icon has been updated')
      fetchAllTypesOfProperties()
  }
  else 
  {
    setMessage('Fail to save edit icon')
  }
  setShowBtn(false)
}

 const fetchAllTypesOfProperties=async()=>{
    const result=await getData('typesofproperties/displayallproperties')
    setProperty(result.data)
  }

  useEffect(function(){
    fetchAllTypesOfProperties()
},[])


const editView=()=>{
    return(<div className={classes.editRoot}>
        <div className={classes.editSubdiv}>
             <Grid container spacing={2}>
                 <Grid item xs={12}>
                      <div className={classes.heading}>
                          Property Register
                      </div>
                 </Grid>

                 <Grid item xs={12}>
                     <TextField value={propertyType} onChange={(event)=>setPropertyType(event.target.value)} label="Property Name" variant="outlined" fullWidth />
                 </Grid>
 
                 <Grid item xs={3} className={classes.centerStyle}>
                    <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeIcon} 
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
                            </Grid>
                    <Grid item xs={3} className={classes.centerStyle}>
                    <Avatar
                            alt="Remy Sharp"
                            src={propertyIcon.filename}
                            variant="rounded"
                            />
                            </Grid>
                            <Grid item xs={6} className={classes.buttonStyles}>
                    {showBtn?<><Button onClick={editPropertyIcon} variant="outlined">Save</Button> <Button onClick={cancelPropertyIcon} variant="outlined">Cancel</Button></>:<></>}
                    </Grid>
                    
                 <Grid item xs={12}>
                    <Button  variant="contained" fullWidth onClick={handleEditData}>Edit New Property</Button>
                 </Grid>
               
                            <Grid item xs={12} className={classes.messageStyles}>
                            {message}
                            </Grid>
                          </Grid>
                            </div>
                </div>)
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
            
            <Button onClick={handleClose} autoFocus>
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
        title={<AddAction title="Property List" tooltip="Add New Properties" url="/dashboard/typesofproperties"/>} 
        data={property}
        columns={[
            {
              title: "Property Id",
              field: "propertyid",
            },
            {
                title: "Property Type",
                field: "propertytype",
              },

              {
                title: "Icon",
                field: "propertyicon",
                render: rowData => {
                    return <img src={`${serverURL}/images/${rowData.propertyicon}`} style={{width: 60, borderRadius: 20}}/>
                  }
              }
          ]}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Property",
              onClick: (event, rowData) => {
              handleEdit(rowData)               
              },
            },

            {
              icon: () => <DeleteIcon />,
              tooltip: "Delete Property",
              onClick: (event, rowData) => {
              handleDelete(rowData)
              },
            },
          ]}        
      />
    );
  }


  
 return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
    {displayTable()}
    </div>
    {openDialog()}
    </div>
 )
}