import { makeStyles } from "@mui/styles";
import { grid } from "@mui/system";


export const useStyles = makeStyles({
    box: {
      background:'#DDDDDD',
        height:'50%',
      marginBottom:-38,
        width:'100vw',
       
            
      },
      box1: {
        background:'#DDDDDD',
        height:'100%',
        width:'100vw',
        display:'flex',
       
      },


    container:{
        display: 'flex',
    flexDirection: 'row',
    justifyContent: '',
    width:'100vw',

    },
    
    container1:{
    
      display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width:'100vw',

  },  
    column:{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        marginLeft: '110px'
    },

    heading:{
        fontSize: '20px',
  color: '#000',
  marginBottom: '20px',
  fontWeight: 'bold'
    },
    link:{
        color: '#000',
  marginBottom: '10px',
  fontSize: '15px',
  textDecoration: 'none',

  "&:hover": {
   
    color: "#fff",
  },
    },
  
   






})