import{Grid,Tooltip} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { propsToClassKey } from '@mui/styles';


function AddAction(props) {
    return (
    <Grid container spacing={2} style={{width:300}}>
         <Grid item xs={6}>
   
   <Link to={props.url}>
    <Tooltip title={props.tooltip}>
     <AddCircleIcon />
     </Tooltip>
         </Link>
    </Grid>
                <Grid item xs={6}>
                    <div style={{fontSize:16,fontWeight:'bold' }}>
                     {props.title}
                    </div>
                 </Grid>
                 
               
    </Grid>
  )

    
  }


  export default AddAction;