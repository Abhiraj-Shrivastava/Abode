import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export const useStyles = makeStyles({
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

    padding: '100px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    overflowY:'auto',
    height:'60%',
    
    
    
    
    
    },
  
  box: {
    width: 350,
    height: 95,
    marginTop: "10px",
    display: "flex",
    justifyContent:"space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize:20,
    color: "#2C3333",
    cursor: "pointer",
    
  },



});
