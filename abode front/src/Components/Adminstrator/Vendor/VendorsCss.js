
import { makeStyles } from '@mui/styles';
import { letterSpacing } from "@mui/system";

 const useStyles=makeStyles({

   root:{ 
       display:"flex",
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
    width:'450',
    padding:5,
    fontSize:26,
    fontWeight:'bold',
    letterSpacing:1
}
  });
  export {useStyles}