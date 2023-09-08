import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { color } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";


export const useStyles=makeStyles({

container:{
display:'flex',
height:'100vh'



},


gradient:{
width:'50vw',
height:'100%',
background:" rgb(63,94,251)",
background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
display:'flex',
justifyContent:'center',
fontSize:'48px',
fontWeight:'600',
alignItems:'center',
color:"whitesmoke",




},
content:{

padding: '100px',
display:'flex',
justifyContent:'center',
alignItems:'center',
flexDirection:'column',
overflowY:'auto',
height:'auto'

},
box:{

    width: 380,
    borderRadius: "10px",
    borderColor: "#DFDFDE",
    borderWidth: "1px",
    borderStyle: "solid",
    display: "flex",
    justifyContent:'flex-start',
    padding:10,
    marginTop:'10px',
    paddingLeft:'50px',
    fontWeight:'500',
    color:'#2C333',
    cursor:'pointer'

   
    

},
 boxShade:{

        width: 380,
        borderRadius: "10px",
        borderColor: "#000",
        borderWidth: "1px",
        borderStyle: "solid",
        display: "flex",
        justifyContent:'flex-start',
        padding:10,
        marginTop:'10px',
        paddingLeft:'50px',
        fontWeight:'500',
        color:'#2C333',
        cursor:'pointer'
    
       
        
    
    
    
 },

divbtn:{
width:120,
height:32,
borderRadius:'20px',

borderStyle:'none',
color:'#2C3333',
padding:3,
fontSize:12,
fontWeight:'bold',
paddingLeft:11,
position:'relative',
left:410,
bottom:60,
backgroundColor:'#F7F6F2',
cursor:'pointer',





},
divbtn2:{
    width:60,
    height:32,
    borderRadius:'20px',
    borderStyle:'none',
    color:'#2C3333',
    padding:3,
    fontSize:12,
    fontWeight:'bold',
    paddingLeft:10,
    position:'relative',
    left:330,
    bottom:92,
    backgroundColor:'#F7F6F2',
    cursor:'pointer',
    
    
    
    
    
    },
    






});