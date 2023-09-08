import React,{useState} from "react";
import{TextField,Grid,Button} from "@mui/material";
import {useStyles} from "./AmenitiesCss"
import { postData } from "../../Api/ServerServices";
import Swal from "sweetalert2";

export default function Amenities(props){
    const classes=useStyles()
    const[amenities,setAmenities]=useState('')
    
const handleClick=async()=>{
    var body={amenities:amenities}
    var response=await postData('amenities/addnewamenities',body)
    if(response.status)
    { Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Amenities has been saved',
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
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.heading}>
                     Amenities register
                    </div>
                 </Grid>
                 <Grid item xs={12}>
                     <TextField onChange={(event)=>setAmenities(event.target.value)} label="Amenities Question" variant="outlined" fullWidth/>
                 </Grid>
                 <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleClick()}  fullWidth>Add New Amenities</Button>

                 </Grid>
            </Grid>


        </div>
    </div>
)
}