import React,{ useState,useEffect } from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllPropertySubtypeCss";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import {Button,TextField,Grid} from "@mui/material"
import Swal from "sweetalert2"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../../Api/ServerServices";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddAction from "../../MyComponents/AddAction";

export default function DisplayallPropertySubtype(props){
    const classes=useStyles()

    const [subpropertyId,setSubpropertyId]=useState('')
    const [subproperty,setSubproperty]=useState([])
    const [propertyId,setPropertyId]=useState('')
    const [properties,setProperties]=useState([])
    const [subpropertyName,setSubpropertyName]=useState('')
    const [description,setDescription]=useState('')
    const [message,setMessage]=useState('')
    const [open,setOpen]=useState(false)

    const handleEdit=async()=>{
      var body={subpropertyname:subpropertyName,description:description,propertyid:propertyId,subpropertyid:subpropertyId}
      var response = await postData('propertysubtype/updatesubproperty',body)
      
      if(response.status){
          setMessage('Subproperty has been edited')
          fetchAllSubproperty()
      }
      else
      {
        console.log(response)
        setMessage('Fail to save the subproperty name')
      }
  }

  const handleDelete=async(rowData)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want To Delete This Subproperty",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={subpropertyid:rowData.subpropertyid}
        var response = await postData('propertysubtype/deletesubproperty',body)
        if(response.status){
        Swal.fire(
          'Deleted!',
          'Your Record has been deleted.',
          'success'
        )
        fetchAllSubproperty()
        }
        else{
          Swal.fire('Server Error','','error')
        }
      }
      else if(result.isDismissed)
      Swal.fire('Your Record is safe','','info')
    })
}


    const handleClose=()=>{
      setOpen(false)
    }
    const handleOpenDialog=(rowData)=>{
      setMessage('')
      fetchAllTypesOfProperties()
      setSubpropertyId(rowData.subpropertyid)
      setSubpropertyName(rowData.subpropertyname)
      setPropertyId(rowData.propertyid)
      setDescription(rowData.description)
      setOpen(true)
    }
    
    const fetchAllTypesOfProperties=async()=>{
        const result=await getData('typesofproperties/displayallproperties')
        setProperties(result.data)
    }
    
    const fetchAllSubproperty=async()=>{
        const result=await getData('propertysubtype/displayallsubproperty')
        setSubproperty(result.data)
    }
    useEffect(function(){
        fetchAllSubproperty()
    },[])

      const fillPropertyType=()=>{
          return properties.map((item)=>{
          return(
            <MenuItem value={item.propertyid}>{item.propertytype}</MenuItem>
          )
          })
      }

      const handlePropertiesChange=(event)=>{
          setPropertyId(event.target.value)
      }

    const editView=()=>{
      return(<div className={classes.editRoot}>
        <div className={classes.editSubdiv}>
        <Grid container spacing={2}>
            <Grid className={classes.heading}>
              Subproperty Register
            </Grid>

            <Grid item xs={12}>
                        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={propertyId}
                label="Property Type"
                onChange={(event)=>handlePropertiesChange(event)}
                >
                    {fillPropertyType()}
                </Select>
                </FormControl>
        
            </Grid>

            <Grid item xs={12}>
                <TextField value={subpropertyName} onChange={(event)=>setSubpropertyName(event.target.value)} label="Subproperty Name" type="statename" fullWidth />
            </Grid>

            <Grid item xs={12}>
                <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" type="statename" fullWidth />
            </Grid>

            <Grid item xs={12}>
                <Button onClick={()=>handleEdit()} variant="contained" fullWidth>Set New Subproperty</Button>
            </Grid>
            <Grid item xs={12} className={classes.messageStyles}>
              {message}
            </Grid>
           </Grid>
        </div>
    </div>)
}

  const openDialog=()=>{
   return(<div>
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

    function DisplayTable() {
        return (
          <MaterialTable
          title={<AddAction title="SubProperties List" tooltip="Add New SubProperties" url="/dashboard/propertysubtype"/>}
            data={subproperty}
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
                  title: "Subproperty Id",
                  field: "subpropertyid",
                
                },
                {
                  title: "Subproperty Name",
                  field: "subpropertyname",
                },
                {
                    title: "Description",
                    field: "description",
                }
              ]}

              actions={[
                {
                  icon: () => <EditIcon />,
                  tooltip: "Edit Details",
                  onClick: (event, rowData) => {
                  handleOpenDialog(rowData)  
                  },
                },

                {
                  icon: () => <DeleteIcon />,
                  tooltip: "Delete Details",
                  onClick: (event, rowData) => {
                    handleDelete(rowData)
                  },
                },
              ]}

          />
        )
      }


    return (
        <div className={classes.root}>
          <div className={classes.subdiv}>
            <DisplayTable/>
        </div>
        {openDialog()}
        </div>
    )
}
