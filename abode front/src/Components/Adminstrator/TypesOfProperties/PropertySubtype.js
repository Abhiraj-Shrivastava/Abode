import React, { useState,useEffect } from "react"
import {Button,Grid,TextField} from '@mui/material'
import { postData } from '../../Api/ServerServices'
import { useStyles } from './PropertySubtypeCss'
import Swal from "sweetalert2"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData } from "../../Api/ServerServices"

export default function PropertySubtype(props){
    const classes=useStyles()

    const [propertyId,setPropertyId] = useState('')
    const [subpropertyName,setSubpropertyName]=useState('')
    const [properties,setProperties]=useState([])
    const [description,setDescription]=useState('')

    const handleClick=async()=>{
        var body={propertyid:propertyId,subpropertyname:subpropertyName,description:description}
        var response = await postData('propertysubtype/addnewsubproperty',body)
        if(response.status){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Subproperty has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Your record not saved',
                showConfirmButton: false,
                timer: 1500
              })
        } 
    }

    const fetchAllTypesOfProperties=async()=>{
        const result=await getData('typesofproperties/displayallproperties')
        setProperties(result.data)
    }

    useEffect(function(){
        fetchAllTypesOfProperties()
    },[])

    const fillProperties=()=>{
        return properties.map((item)=>{
            return (<MenuItem value={item.propertyid}>{item.propertytype}</MenuItem>)              
        })
    }

    const handlePropertiesChange=(event)=>{
        setPropertyId(event.target.value)
    }

    return(<div className={classes.root}>
        <div className={classes.subdiv}>
        <Grid container spacing={3}>
            
            <Grid item xs={12}>
                <div className={classes.heading}>Subtype Property Registration</div>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Property</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={propertyId}
          label="Property Id"
          onChange={(event)=>handlePropertiesChange(event)}
        >
          {fillProperties()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField onChange={(event)=>setSubpropertyName(event.target.value)} label="Subproperty Name" fullWidth />
            </Grid>

            <Grid item xs={12}>
                <TextField onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth />
            </Grid>

            <Grid item xs={12}>
                <Button onClick={()=>handleClick()} variant="contained" fullWidth>Add New Subproperty</Button>
            </Grid>
        </Grid>
        </div>
    </div>)
}
