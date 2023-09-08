import { makeStyles } from '@mui/styles';

 const useStyles=makeStyles({
   container: {
      display: "flex",
      height: "100vh",
    },
  
   gradient: {
      width: "50vw",
      height: "100%",
      background: "rgb(238,79,122)",
      background:
        "linear-gradient(180deg, rgba(238,79,122,1) 0%, rgba(67,24,200,1) 100%, rgba(20,14,5,1) 100%)",
      display: "flex",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "600",
      alignItems: "center",
      color: "whitesmoke",
    },
    content:{
      width:'100%',
      display:'flex',
     
      flexDirection:'column',
      overflowY:'auto',
      height:'110%',
      
      
      
      
      
      },
    
 
  

     displayContent:{
      width:150,
      height:130,
      borderRadius:15,
      marginRight:15,
      marginBottom:10,
      boxShadow:'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer',
     
      
     },

     displaySelectedContent:{
      width:150,
      height:130,
      borderRadius:15,
      marginRight:15,
      marginBottom:10,
      boxShadow:'rgba(6, 24, 44, 0.4) 0px 0px 0px 4px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer',
     
      
     },
  
     display:{
      padding: '33px',
      display:'grid',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      overflowY: 'auto',
     height:'82vh',
     grid:' 150px / auto auto auto',
    padding:30,
    
    gridGap: '15px'
      
     },
     spanStyle:{
    
        margin:5
     },
     spanOne:{
   
      fontWeight:400,
      fontSize:14,
      display:'flex',
      textAlign:'center'
      
   },
   
  button:{
     display:'flex',
   marginTop:70,
   
  },


  


})
export {useStyles}