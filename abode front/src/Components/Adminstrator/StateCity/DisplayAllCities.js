import React,{useState,useEffect} from "react";
import { Button,Grid,TextField } from "@mui/material";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import {useStyles} from "./DisplayAllCitiesCss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { postData,serverURL } from "../../Api/ServerServices";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import cityimage from '../../assets/images/city.png';
import Avatar from '@mui/material/Avatar';
import AddAction from "../../MyComponents/AddAction";
const Input = styled('input')({
  display: 'none',
 });

export default function DisplayAllCities(props){  

    const classes=useStyles()   
  
    const[city,setCity]=useState([])
    const[stateId,setStateId]=useState('')
    const[cityId,setCityId]=useState('')
    const[cityName,setCityName]=useState('')
    const[cityPicture,setCityPicture]=useState({bytes:'',filename:''})
    const[states , setStates]=useState([])
    const[open,setOpen]=useState(false)
    const[tempPicture,setTempPicture]=useState({bytes:'',filename:''})
    const[message,setMessage]=useState('')
    const[showBtn,setShowBtn]=useState(false)
  

    const handleClose=()=>{
setOpen(false)

    }

    const handleEdit=(rowData)=>{
      fetchAllStates()
      setMessage('')
      setStateId(rowData.stateid)
      setCityId(rowData.cityid)
      setCityName(rowData.cityname)
      setCityPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
      setTempPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
      setOpen(true)
    }

    const handleShowImages=(rowData)=>{
      fetchAllStates()
      alert(rowData.picture)
    }
    const handleEditData=async(rowData)=>{
      var body={stateid:stateId,cityid:cityId,cityname:cityName}
      console.log(body)
      var response=await postData('states/updatecity',body)
      if(response.status)
      {
        setMessage('City has been Edited ')
        fetchAllCities()
       
      }
      else{
        setMessage('Fail to Edit the City')
      }
      
    }

    const cancelCityPicture=async()=>{
       setCityPicture({bytes:'',filename:tempPicture.filename})
       setShowBtn(false)
    }
    

    const editCityPicture=async()=>{
      var formData=new FormData()

      formData.append('cityid',cityId)
      formData.append('picture',cityPicture.bytes)
      formData.append('oldpicture',tempPicture.filename.substring(tempPicture.filename.lastIndexOf("/")+1))
      var response=await postData('states/updatecitypicture',formData)
      if(response.status)
      {
        setMessage('Picture has been Updated')
        fetchAllCities()
       
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
          var body={cityid:rowData.cityid}
          var response=await postData('states/deletecity',body)
          if(response.status)
          { Swal.fire('City deleted Successfully', '', 'success')
          fetchAllCities()
          }
          else{
            Swal.fire('Server Error', '', 'error')
          }
         
        } else if (result.isDenied) {
          Swal.fire('Your Record is Safe', '', 'info')
        }
      })
    }  
    
    const handleChangeImage=(event)=>{
    setCityPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    setShowBtn(true)
    }

  
  function displayTable() {
      return (
        <MaterialTable
        title={<AddAction title="City List" tooltip="Add New City" url="/dashboard/city"/>}
          data={city}
          columns={[
            {
                title: "State Id",
                field: "stateid",
               
              },
              {
                title: "State Name",
                field: "statename",
               
              },  
            {
                title: "City Id",
                field: "cityid",
               
              },
              {
                title: "City Name",
                field: "cityname",
              },
              {
                title: "Picture",
                field: "picture",
                render: rowData => {
                  return (<Button onClick={()=>handleShowImages(rowData)}>Show Images</Button>)
                }
              },
              
             
          ]}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: "Edit State",
              onClick: (event, rowData) => {
              handleEdit(rowData)
              },
            },
            {
              icon: () => <DeleteIcon />,
              tooltip: "Delete State",
              onClick: (event, rowData) => {
                handleDelete(rowData)
               
                
              },
            },
          ]}
         
        />
      );
    }

      const fetchAllCities=async()=>{
          const result=await getData('states/displayallcities')
          setCity(result.data)
      }

      const fetchAllStates=async()=>{
        const result=await getData('states/displayallstates')
        setStates(result.data)
    }
    
    const fillStates=()=>{
    
        return states.map((item)=>{
    return(
    
    <MenuItem value={item.stateid}>{item.statename}</MenuItem>
    
    )
    
        })
    }

    const handleStatesChange=(event)=>{
      setStateId(event.target.value)
      }
  
  
      useEffect(function(){
         fetchAllCities()
  
      },[])

      const editView=()=>{
        return(
          <div className={classes.editRoot}>
              <div className={classes.editSubdiv}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <div className={classes.heading}>
                           City register
                          </div>
                       </Grid>
                       <Grid item xs={12}>
                       <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                       <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={stateId}
                          label="State"
                          onChange={(event)=>handleStatesChange(event)}
                          > 
                          {fillStates()}
                        </Select>
                        </FormControl>
      
      
      
                       </Grid>
                       <Grid item xs={12}>
                           <TextField value={cityName} onChange={(event)=>setCityName(event.target.value)} label="City Name" variant="outlined" fullWidth/>
                       </Grid>

                       <Grid item xs={12}>
                           <Button variant="contained" onClick={handleEditData}  fullWidth>Edit New City</Button>
      
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
        src={cityPicture.filename}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />

      {showBtn?<><Button onClick={editCityPicture}>Save</Button><Button onClick={cancelCityPicture}>Cancel</Button></>:<></>}
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

  
      return(
          <div className={classes.root}>
            <div className={classes.subdiv}> 
              {displayTable()}
              </div>
            {openDialog()}
          </div>
  
      )
      
  }