import {makeStyles} from "@mui/styles"

 const useStyles=makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    subdiv:{
        padding:5,
        marginTop:20,
        background:'#dfe6e9',
        borderRadius:10,
        margin:20,
        width:700
    },
    heading:{
        padding:10,
        fontSize:24,
        fontWeight:'bold',
        letterSpacing:2
    },
    editRoot:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    editSubdiv:{
        padding:5,
        marginTop:20,
        borderRadius:10,
        margin:10,
        width:500
    },
    messageStyles:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:24,
        fontWeight:'bold',
        color:'#3ae374'
    },
    buttonStyles:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
    }
})
export {useStyles}