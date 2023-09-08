import {makeStyles} from "@mui/styles"

export const useStyles=makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    subdiv:{
        padding:20,
        marginTop:40,
        background:'#dfe6e9',
        borderRadius:10,
        margin:10,
        width:400
    },
    heading:{
        padding:10,
        fontSize:30,
        fontWeight:'bold',
        letterSpacing:2,
    },
    avatarStyle:{
        width:60,
        height:60
    },
    centerStyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})
