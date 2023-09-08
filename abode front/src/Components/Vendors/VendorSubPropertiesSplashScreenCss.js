import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },

  gradient: {
    width: "50vw",
    height: "100vh",
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
    width: 380,
    borderRadius: "10px",
    borderColor: "#DFDFDE",
    borderWidth: "1px",
    borderStyle: "solid",
    display: "flex",
    padding:10,
     
    flexDirection: "column",
    
    fontWeight: "500",
    color: "#222222",
    cursor: "pointer",
    lineHeight: 2,
    margin:10
     
  },

  boxShade: {
    width: 380,
    borderRadius: "10px",
    borderColor: "#000",
    borderWidth: "1px",
    borderStyle: "solid",
    display: "flex",
    padding:10,
     
    flexDirection: "column",
    
    fontWeight: "500",
    color: "#222222",
    cursor: "pointer",
    lineHeight: 2,
    margin:10
     
  },


  divbtn: {
    width: 120,
    height: 32,
    borderRadius: "20px",
    // borderWidth:'1px',
    // borderColor:'#bdc3c7',
    borderStyle: "none",
    color: "#2C3333",
    padding: 3,
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 11,
    position: "relative",
    left: 410,
    bottom: 60,
    backgroundColor: "#F7F6F2",
    cursor: "pointer",
 
  },
  divbtn2: {
    width: 60,
    height: 32,
    borderRadius: "20px",
    // borderWidth:'1px',
    // borderColor:'#bdc3c7',
    borderStyle: "none",
    color: "#2C3333",
    padding: 3,
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10,
    position: "relative",
    left: 330,
    bottom: 92,
    backgroundColor: "#F7F6F2",
    cursor: "pointer",
    
  },
});
