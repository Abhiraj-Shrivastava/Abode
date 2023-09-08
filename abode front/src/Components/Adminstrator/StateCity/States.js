import React,{useState} from "react";
import{TextField,Grid,Button} from "@mui/material";
import {useStyles} from "./StateCss"
import { postData } from "../../Api/ServerServices";
import InputLabel from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import cityimage from '../../assets/images/city.png';
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2";
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
  });


export default function States(props){
    const classes=useStyles()
    const[stateName,setStateName]=useState('')
    const[statePicture,setStatePicture]=useState({bytes:'',filename:cityimage})
const handleClick=async()=>{
    var formData=new FormData()

  formData.append('statename',stateName)
  formData.append('picture',statePicture.bytes)

  
    var response=await postData('states/addnewstates',formData,true)
    if(response.status)
    { Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'State has been saved',
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
const handleChangeImage=(event)=>{
    setStatePicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }
return(
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>
                     States register
                    </div>
                 </Grid>
                 <Grid item xs={12}>
                     <TextField onChange={(event)=>setStateName(event.target.value)} label="State Name" variant="outlined" fullWidth/>
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeImage} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <Avatar
                
        alt="Remy Sharp"
        src={statePicture.filename}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />
                 </Grid>
                 <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleClick()}  fullWidth>Add New State</Button>

                 </Grid>
            </Grid>


        </div>
    </div>
)
}