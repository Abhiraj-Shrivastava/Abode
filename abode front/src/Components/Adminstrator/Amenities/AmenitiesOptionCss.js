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
    },
    avatarStyle:{
      width:60,
      height:60
    },
    centerStyle:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
      
    },   
    editRoot:{ 
      display:"flex",
      justifyContent:'center',
      alignItems:'center'
    },
    editSubdiv:{
    padding:5,
    marginTop:30,
    borderRadius:10,
    margin:20
    },
         

  });
  

 export {useStyles}