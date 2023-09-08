import { makeStyles } from '@mui/styles';

 const  useStyles = makeStyles({
    root:{display:'flex',
          justifyContent:'center',
          alignItems:'center'
          
            },
    subdiv:{
         padding:20,
         marginTop:30,
         background:'#dfe6e9',
         borderRadius:10,
         margin:20
    },
    heading:{
        
        padding:5,
        fontSize:26,
        fontWeight:'bold',
        letterSpacing:2
    }        

  });
  

 export {useStyles}