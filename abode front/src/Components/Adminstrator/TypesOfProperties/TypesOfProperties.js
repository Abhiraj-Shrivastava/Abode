import React from "react"
import { TextField,Grid,Button} from "@mui/material"
import { useStyles } from "./TypesOfPropertiesCss"
import { useState } from "react"
import { postData } from "../../Api/ServerServices"
import Swal from "sweetalert2"
import propertyimage from '../../assets/images/city.png'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';


const Input = styled('input')({
    display: 'none',
  })


export default function TypesOfProperties(props){
    const classes=useStyles()

    const[propertyType,setPropertyType]=useState('')
    const [propertyIcon,setPropertyIcon]=useState({bytes:'',filename:propertyimage})
    
    
    const handleChangeIcon=(event)=>{
        setPropertyIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }


    const handleClick=async()=>{
        var formData= new FormData() 
        
        formData.append('propertytype',propertyType)
        formData.append('propertyicon',propertyIcon.bytes)

        var response= await postData('typesofproperties/addnewproperty',formData,true)
        if(response.status){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Property has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            }
        else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Your record not saved',
                showConfirmButton: false,
                timer: 1500
              })

        }
    }

    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={3}>
        <Grid item xs={12}>
            <div className={classes.heading}>Add Properties</div>
        </Grid>
        <Grid item xs={12}>
            <TextField onChange={(event)=>setPropertyType(event.target.value)} label="Property Type" fullWidth/>
        </Grid>
        <Grid item xs={6} className={classes.centerStyle} >
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeIcon} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            </Grid>
            <Grid item xs={6} className={classes.centerStyle}>
            <Avatar
                alt="Property Icon"
                src={propertyIcon.filename}
                variant="rounded"
                sx={{ width: 56, height: 56 }} />
            </Grid>

        <Grid item xs={12}>
            <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add New Property</Button>
            </Grid>
            </Grid>
        </div>
    </div>)
}

