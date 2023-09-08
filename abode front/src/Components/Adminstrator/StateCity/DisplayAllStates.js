import React,{useState,useEffect} from "react";
import { Button,Grid,TextField } from "@mui/material";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import {useStyles} from "./DisplayAllStatesCss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { postData } from "../../Api/ServerServices";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { serverURL } from "../../Api/ServerServices";
import AddAction from "../../MyComponents/AddAction";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const Input = styled('input')({
  display: 'none',
});


export default function DisplayAllStates(props){  

  const classes=useStyles()   

const[states,setStates]=useState([])
const[stateName,setStateName]=useState('')
const[stateId,setStateId]=useState('')
const[statePicture,setStatePicture]=useState({bytes:'',filename:''})
const[message,setMessage]=useState('')
    const[showBtn,setShowBtn]=useState(false)
    const[tempPicture,setTempPicture]=useState({bytes:'',filename:''})
const[open,setOpen]=useState(false)

const handleEdit=async(rowData)=>{
  var body={statename:stateName,stateid:stateId}
  console.log(body)
  var response=await postData('states/updatestate',body)
  if(response.status)
  {
    setMessage('State has been Edited ')
    fetchAllStates()
  }
  else{
    setMessage('Fail to Edit the State')
  }
  
}
const cancelStatePicture=async()=>{
  setStatePicture({bytes:'',filename:tempPicture.filename})
  setShowBtn(false)
}


const editStatePicture=async()=>{
 var formData=new FormData()

 formData.append('stateid',stateId)
 formData.append('picture',statePicture.bytes)
 formData.append('oldpicture',tempPicture.filename.substring(tempPicture.filename.lastIndexOf("/")+1))
 var response=await postData('states/updatestatepicture',formData)
 if(response.status)
 {
   setMessage('Picture has been Updated')
   fetchAllStates()
  
 }
 else{
   setMessage('Fail to Update the Picture')
 }
 setShowBtn(false)
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
      var body={stateid:rowData.stateid}
      var response=await postData('states/deletestate',body)
      if(response.status)
      { Swal.fire('State deleted Successfully', '', 'success')
      fetchAllStates()
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
const handleChangeImage=(event)=>{
  setStatePicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
  setShowBtn(true)
  }
const handleOpenDialog=(rowData)=>{
  setMessage('')
  setStateId(rowData.stateid)
  setStateName(rowData.statename)
  setStatePicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
  setTempPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
  setOpen(true)
}

const editView=()=>{
  return(
    <div className={classes.editRoot}>
        <div className={classes.editSubdiv}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>
                     States register
                    </div>
                 </Grid>
                 <Grid item xs={12}>
                     <TextField value={stateName} onChange={(event)=>setStateName(event.target.value)} label="State Name" variant="outlined" fullWidth/>
                 </Grid>
                 <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleEdit()}   fullWidth>Edit State</Button>
                 </Grid>

                 <Grid item xs={12} className={classes.messageStyle}>
                   {message}
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeImage} 
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <div className={classes.buttonStyle}>
                 <Avatar
                
        alt="Remy Sharp"
        src={statePicture.filename}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />

      {showBtn?<><Button onClick={editStatePicture}>Save</Button><Button onClick={cancelStatePicture}>Cancel</Button></>:<></>}
      </div>
                 </Grid>
                 <Grid item xs={12} className={classes.messageStyle}>
                   {message}
                 </Grid>
            </Grid>


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
      title={<AddAction title="State List" tooltip="Add New States" url="/dashboard/states"/>}
        data={states}
        columns={[
            {
              title: "Stateid",
              field: "stateid",
             
            },
            {
              title: "Statename",
              field: "statename",
            },
            {
              title: "Picture",
              field: "picture",
              render: rowData => {
                return <img src={`${serverURL}/images/${rowData.picture}`} style={{width: 60, borderRadius: 20}}/>
              }
            }
           
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit State",
            onClick: (event, rowData) => {
              handleOpenDialog(rowData)
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete State",
            onClick: (event, rowData) => {
              const rowJson = JSON.stringify(rowData, null, 2);
              handleDelete(rowData)
              
            },
          },
        ]}
       
      />
    );
  }



    const fetchAllStates=async()=>{
        const result=await getData('states/displayallstates')
        setStates(result.data)
    }


    useEffect(function(){
       fetchAllStates()

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