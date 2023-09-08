import { makeStyles } from '@mui/styles';
import { color } from '@mui/system';

 const  useStyles = makeStyles({
    sideDiv:{
        
        background:'#000',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection:'column'
   },

   textHeadStyle:{
    fontSize:43,
    fontWeight:'bold',
    color:'#FFF',
    width:300,
    textAlign:'center',
   },
   textSubStyle:{
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF',
    width:250,
    textAlign:'center',
    marginTop:15,
    marginBottom:15
   },
   dialogTitle:{
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center'
   },
   dialogWelcomeTitle:{
    fontSize:18,
    fontWeight:'bold',
    color:'#000',
   marginBottom:20
   },
   dialogText:{
    fontSize:12,
    fontWeight:'bold',
   },
   otpErrorMessage:{
          fontSize:12,
          fontWeight:'bold',
          letterSpacing:1,
          color:'red'
   },
   vendorText:{
       fontSize:'14px',
       color:'#717171',
       marginTop:'10px'
     },
     vendorTextColor:{
       color:'blue',
       textDecorationLine:'underline'
     }
   
   

  });
  

 export {useStyles}