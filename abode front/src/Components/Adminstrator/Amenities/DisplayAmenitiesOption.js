import React,{useState,useEffect} from "react";
import { Button,Grid,TextField } from "@mui/material";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import {useStyles} from "./DisplayAmenitiesOptionCss"
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
import AddAction from "../../MyComponents/AddAction";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import cityimage from '../../assets/images/city.png';
import Avatar from '@mui/material/Avatar';
import { AltRoute } from "@mui/icons-material";
import { endOfDecadeWithOptions } from "date-fns/fp";


const Input = styled('input')({
  display: 'none',
 });

export default function DisplayAllAmenitiesOptions(props){  

    const classes=useStyles()   
  
    const[amenitiesOptions,setAmenitiesOptions]=useState([])
    const[amenitiesId,setAmenitiesId]=useState('')
    const[optionId,setOptionId]=useState('')
    const[optionName,setOptionName]=useState('')
    const[icon,setIcon]=useState({bytes:'',filename:''})
    const[amenities,setAmenities]=useState('')
    const[amenitiesData,setAmenitiesData]=useState([])
    const[open,setOpen]=useState(false)
    const[tempIcon,setTempIcon]=useState({bytes:'',filename:''})

    const[message,setMessage]=useState('')
    const[showBtn,setShowBtn]=useState(false)
  
    const handleChangeIcon=(event)=>{
      setIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
      setShowBtn(true)
      }
    
    const handleClose=()=>{
      setOpen(false)
      
          }
      
     const handleEdit=(rowData)=>{
            setMessage('')
            fetchAllAmenities()
            setAmenitiesId(rowData.amenitiesid)
            setOptionId(rowData.optionsid)
            alert(rowData.optionid)
            setOptionName(rowData.optionname)
            setIcon({bytes:'',filename:`${serverURL}/images/${rowData.icon}`})
            setTempIcon({bytes:'',filename:`${serverURL}/images/${rowData.icon}`})
            setOpen(true)
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
                var body={optionsid:rowData.optionsid}
                var response=await postData('amenities/deleteamenitiesoptions',body)
                if(response.status)
                { Swal.fire('option deleted Successfully', '', 'success')
                fetchAllOptions()
                }
                else{
                  Swal.fire('Server Error', '', 'error')
                }
               
              } else if (result.isDenied) {
                Swal.fire('Your Record is Safe', '', 'info')
              }
            })
          }

          const editOptionIcon=async()=>{
            var formData=new FormData()
      
            formData.append('optionsid',optionId)
            formData.append('icon',icon.bytes)
            formData.append('oldicon',tempIcon.filename.substring(tempIcon.filename.lastIndexOf("/")+1))
            var response=await postData('amenities/updateoptionicon',formData)
            if(response.status)
            {
              setMessage('Icon has been Updated')
              fetchAllOptions()
             
            }
            else{
              setMessage('Fail to Update the Icon')
            }
            setShowBtn(false)
          }

          const cancelOptionIcon=async()=>{
            setIcon({bytes:'',filename:tempIcon.filename})
            setShowBtn(false)
         }

          

    
  function displayTable() {
      return (
        <MaterialTable
        title={<AddAction title="Amenities Options List" tooltip="Add New Amenities Options" url="/dashboard/amenitiesoptions"/>}
          data={amenitiesOptions}
          columns={[
            {
                title: "Amenities Id",
                field: "amenitiesid",
               
              },
              {
                title: "Amenities Name",
                field: "amenities",
               
              },  
            {
                title: "Option Id",
                field: "optionsid",
               
              },
              {
                title: "Option Name",
                field: "optionname",
              },
              {
                title: "Icon",
                field: "icon",
                render: rowData => {
                  return <img src={`${serverURL}/images/${rowData.icon}`} style={{width: 60, borderRadius: 20}}/>
                }
              },
              
             
          ]}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Amenities Option",
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

    const editView=()=>{
      return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>
                     Amenities Option register
                    </div>
                 </Grid>
                 <Grid item xs={12}>
                 <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Amenities</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={amenitiesId}
                    label="Amenities"
                    onChange={(event)=>handleAmenitiesChange(event)}
                    > 
                    {
                    fillAmenities()
                    }
                  </Select>
                  </FormControl>



                 </Grid>
                 <Grid item xs={12}>
                     <TextField onChange={(event)=>setOptionName(event.target.value)} value={optionName} label="Option Name" variant="outlined" fullWidth/>
                 </Grid>
                 
                

                 <Grid item xs={12}>
                     <Button variant="contained" onClick={EditOptions}  fullWidth>Edit Amenities Option</Button>
                 </Grid>

                 <Grid item xs={6} className={classes.centerStyle}>
                 <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeIcon} 
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                 </Grid>
               <div>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <Avatar
                  alt="Remy Sharp"
                src={icon.filename}
                variant="rounded"
                sx={{ width: 56, height: 56 }}
      />
                 </Grid>
                 {showBtn?<><Button onClick={editOptionIcon}>Save</Button><Button onClick={cancelOptionIcon}>Cancel</Button></>:<></>}
                 </div>
              
                 
                 
                 <Grid item xs={12} className={classes.messageStyle}>
                   {message}
                 </Grid>

            </Grid>



        </div>
    </div>
    )
    }

    const EditOptions=async()=>{
      var body={optionname:optionName,amenitiesid:amenitiesId,optionsid:optionId}
      console.log(body)
      var response=await postData('amenities/updateamenitiesoptions',body)
      if(response.status)
      {
        setMessage('Amenities has been Edited ')
        fetchAllAmenities()         
      }
      else{
        setMessage('Fail to Edit the Amenities')
      }
    }


    


      const fetchAllOptions=async()=>{
          const result=await getData('amenities/displayallamenitiesoptions')
          setAmenitiesOptions(result.data)
      }

      const fetchAllAmenities=async()=>{
        const result=await getData('amenities/displayallamenities')
        setAmenitiesData(result.data)
        // alert(JSON.stringify(result.data))
    }
    
    const handleAmenitiesChange=(event)=>{
      setAmenitiesId(event.target.value)
      }

      const fillAmenities=()=>{

        return amenitiesData.map((item)=>{
    return(
    
    <MenuItem value={item.amenitiesid}>{item.amenities}</MenuItem>
    
    )
    })
      }

    
  
  
      useEffect(function(){
         fetchAllOptions()
  
      },[] )

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