import React,{useState,useEffect} from "react";
import{TextField,Grid,Button} from "@mui/material";
import {useStyles} from "./AmenitiesOptionCss"
import { postData } from "../../Api/ServerServices";
import { getData } from "../../Api/ServerServices";
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import cityimage from '../../assets/images/city.png';

const Input = styled('input')({
    display: 'none',
  });


export default function AmenitiesOption(props){
    const classes=useStyles()


    const[amenitiesData,setAmenitiesData]=useState([])
    const[amenitiesId,setAmenitiesId]=useState('')
    
    const[optionName,setOptionName]=useState('')
    const[icon,setIcon]=useState({bytes:'',filename:cityimage})
   




const handleClick=async()=>{
   var formData=new FormData()

  formData.append('amenitiesid',amenitiesId)
  formData.append('optionname',optionName)
  formData.append('icon',icon.bytes)

  

    var response=await postData('amenities/addnewamenitiesoption',formData,true)
    if(response.status)
    { Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Options has been saved',
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


const fetchAllAmenities=async()=>{
    const result=await getData('amenities/displayallamenities')
    setAmenitiesData(result.data)
}

const fillAmenities=()=>{

    return amenitiesData.map((item)=>{
return(

<MenuItem value={item.amenitiesid}>{item.amenities}</MenuItem>

)

    })
}

const handleAmenitiesChange=(event)=>{
setAmenitiesId(event.target.value)
}

const handleChangeIcon=(event)=>{
    setIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }
    


useEffect(function(){
   fetchAllAmenities()

},[])

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
                    {fillAmenities()}
                  </Select>
                  </FormControl>



                 </Grid>
                 <Grid item xs={12}>
                     <TextField onChange={(event)=>setOptionName(event.target.value)} label="Option Name" variant="outlined" fullWidth/>
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeIcon} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                 </Grid>
                 <Grid item xs={6} className={classes.centerStyle}>
                 <Avatar
                
        alt="Remy Sharp"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />
                 </Grid>

                 <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleClick()}  fullWidth>Add New Amenities Option</Button>

                 </Grid>
                 

            </Grid>



        </div>
    </div>
)
}