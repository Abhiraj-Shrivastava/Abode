import { makeStyles } from '@mui/styles';
import { borderRadius } from '@mui/system';

 const  useStyles = makeStyles({
       
    logoStyle:{
        fontSize:20,
        letterSpacing:2,
        fontWeight:'bold',
        color:'#000',
        flexGrow:1,
        
    },
   

    avatarStyle:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'

    },

    userNameStyle:{
        fontSize:10,
        letterSpacing:2,
        fontWeight:'bold',
        color:'#000',
        padding:2
    }



  });
  

 export {useStyles}