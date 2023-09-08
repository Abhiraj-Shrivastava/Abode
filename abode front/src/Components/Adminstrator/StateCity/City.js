import React,{useState,useEffect} from "react";
import{TextField,Grid,Button} from "@mui/material";
import {useStyles} from "./CityCss"
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
import { DropzoneArea,DropzoneAreaBase } from "material-ui-dropzone"

const Input = styled('input')({
    display: 'none',
  });


export default function City(props){
    const classes=useStyles()
    const[stateId,setStateId]=useState('')
    const[cityName,setCityName]=useState('')
    const[cityPicture,setCityPicture]=useState({bytes:'',filename:cityimage})
    const[states , setStates]=useState([])
    const[getFiles,setFiles]=useState([])
const handleClick=async()=>{
   var formData=new FormData()

  formData.append('stateid',stateId)
  formData.append('cityname',cityName)
  getFiles.map((item,index)=>{
    formData.append('picture'+index,item)
})

  

    var response=await postData('states/addnewcity',formData,true)
    if(response.status)
    { Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'City has been saved',
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




const  handleFiles=(files)=>{
        setFiles(files)
     } 
     

useEffect(function(){
   fetchAllStates()

},[])

return(
    <div className={classes.root}>
        <div className={classes.subdiv}>
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
                     <TextField onChange={(event)=>setCityName(event.target.value)} label="City Name" variant="outlined" fullWidth/>
                 </Grid>
                 <Grid item xs={12} className={classes.centerStyle}>
                 <label htmlFor="icon-button-file">
                 <DropzoneArea
                    
                    className={classes.dropZone}
                    onChange={handleFiles}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={false}
                    maxFileSize={5000000}
                    filesLimit={5}
                    showFileNames={true}
                                      
                />

      </label>
                 </Grid>

                 <Grid item xs={12}>
                     <Button variant="contained" onClick={()=>handleClick()}  fullWidth>Add New City</Button>

                 </Grid>
                 

            </Grid>



        </div>
    </div>
)
}