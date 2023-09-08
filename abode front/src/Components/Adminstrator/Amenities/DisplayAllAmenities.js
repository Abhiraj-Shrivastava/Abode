import React,{useState,useEffect} from "react";
import { Button,Grid,TextField} from "@mui/material";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllAmenitiesCss";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { postData } from "../../Api/ServerServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import AddAction from "../../MyComponents/AddAction";







export default function DisplayAllAmenities(props){
    
    const classes=useStyles()

    const[amenitiesData,setAmenitiesData]=useState([])
    const[amenities,setAmenities]=useState('')
    const[message,setMessage]=useState('')
    const[open,setOpen]=useState('')
    const[amenitiesId,setAmenitiesId]=useState('')


    const handleClose=()=>{
        setOpen(false)
      }
      
      const handleOpenDialog=(rowData)=>{
        console.log(rowData)
        
        setAmenitiesId(rowData.amenitiesid)
        setAmenities(rowData.amenities)

        
        setOpen(true)
      }
      const handleEditData=async(rowData)=>{
        var body={amenities:amenities,amenitiesid:amenitiesId}
        console.log(body)
        var response=await postData('amenities/updateamenities',body)
        if(response.status)
        {
          setMessage('Amenities has been Edited ')
          fetchAllAmenities()         
        }
        else{
          setMessage('Fail to Edit the Amenities')
        }
        
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
            var body={amenitiesid:rowData.amenitiesid}
            var response=await postData('amenities/deleteamenities',body)
            if(response.status)
            { Swal.fire('City deleted Successfully', '', 'success')
            fetchAllAmenities() 
            }
            else{
              Swal.fire('Server Error', '', 'error')
            }
           
          } else if (result.isDenied) {
            Swal.fire('Your Record is Safe', '', 'info')
          }
        })
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

      const editView=()=>{
        return(
            <div className={classes.editRoot}>
            <div className={classes.editSubdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.heading}>
                         Amenities register
                        </div>
                     </Grid>
                     <Grid item xs={12}>
                         <TextField value={amenities} onChange={(event)=>setAmenities(event.target.value)} label="Amenities Question" variant="outlined" fullWidth/>
                     </Grid>
                     <Grid item xs={12}>
                         <Button  variant="contained" onClick={handleEditData}   fullWidth>Edit Amenities</Button>
    
                     </Grid>

                     <Grid item xs={12} className={classes.messageStyle}>
                   {message}
                          </Grid>
                </Grid>
    
    
            </div>
        </div>
      )
      }

     
function displayTable() {
    return (
      <MaterialTable
      title={<AddAction title="Amenities List" tooltip="Add New Amenities" url="/dashboard/amenities"/>}
        data={amenitiesData}
        columns={[
            
            {
                title: "Amenities Id",
                field: "amenitiesid",
              },
             
              {
                title: "Amenities",
                field: "amenities",
              }
           
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Vendor",
            onClick: (event, rowData) => {
                handleOpenDialog(rowData)
           
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete Vendor",
            onClick: (event, rowData) => {
              handleDelete(rowData)
           
              
            },
          },
        ]}
       
      />
    );
  }



    const fetchAllAmenities=async()=>{
        const result=await getData('amenities/displayallamenities')
        setAmenitiesData(result.data)
    }


    useEffect(function(){
       fetchAllAmenities()

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