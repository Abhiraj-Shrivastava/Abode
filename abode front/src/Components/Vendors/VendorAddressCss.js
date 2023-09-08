import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";
export const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    width:"100vw"
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
    padding: '20px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    overflowY:'auto',
    height:'83%',
 
    
    
    
    
    
    
    },
  box: {
    width: 460,
    height: 50,
    borderRadius: "10px",
    borderColor: "#DFDFDE",
    borderWidth: "1px",
    marginTop: "10px",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "50px",
    fontWeight: "500",
    color: "#2C3333",
    cursor: "pointer",
    
  },
  boxShade: {
    width: 460,
    height: 95,
    borderRadius: "10px",
    borderColor: "#000",
    borderWidth: "1px",
    marginTop: "10px",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "50px",
    fontWeight: "500",
    color: "#2C3333",
    cursor: "pointer",
   
  },

});
