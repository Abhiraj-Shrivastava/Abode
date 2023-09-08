import { Divider } from "@mui/material";
import React from "react";
import { useStyles } from "./FooterCss"
import  LanguageOutlinedIcon  from "@mui/icons-material/LanguageOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from "@mui/material/IconButton";


export default function Footer(props){
  const theme=useTheme()
  var matches=useMediaQuery(theme.breakpoints.down('md'))
const classes=useStyles()

    return(
      <div className={matches?classes.box1:classes.box}>
        <div >
        <div className={matches?classes.container1:classes.container}>
            <div className={classes.column}>
                <p className={classes.heading}>Support</p>
                   <a href="#" className={classes.link}> Help Centre</a>
                   <a href="#" className={classes.link}>AirCover</a>
                   <a href="#" className={classes.link}>Safety information</a>
                   <a href="#" className={classes.link}>Supporting people with disabilities</a>
                   <a href="#" className={classes.link}>Cancellation options</a>
                   <a href="#" className={classes.link}>Our COVID-19 Response</a>
                   <a href="#" className={classes.link}>Report a neighbourhood concern</a>

            </div>
            <div className={classes.column}>
                <p className={classes.heading}>Community</p>
                   <a href="#" className={classes.link}> Airbnb.org: disaster relief housing</a>
                   <a href="#" className={classes.link}>Support Afghan refugees</a>
                   <a href="#" className={classes.link}>Combating discrimination</a>
            </div>
            <div className={classes.column}>
                <p className={classes.heading}>Hosting</p>
                   <a href="#" className={classes.link}>Try hosting</a>
                   <a href="#" className={classes.link}>AirCover for Hosts</a>
                   <a href="#" className={classes.link}>Explore hosting resources</a>
                   <a href="#" className={classes.link}>Visit our community forum</a>
                   <a href="#" className={classes.link}>How to host responsibly</a>
            </div>
            <div className={classes.column}>
                <p className={classes.heading}>Abode</p>
                   <a href="#" className={classes.link}>Newsroom</a>
                   <a href="#" className={classes.link}>Learn about new features</a>
                   <a href="#" className={classes.link}>Letter from our founders</a>
                   <a href="#" className={classes.link}>Careers</a>
                   <a href="#" className={classes.link}>Investors</a>
            </div>
            
         
        </div>
        <Divider variant='inset'/>
        <p style={{margin:'10px 0px 40px 75px'}}>© 2023 Abode, Inc. <span style={{marginLeft:10}}> <a href="#" className={classes.link}>Privacy</a></span><span style={{marginLeft:10}}> <a href="#" className={classes.link}>Term</a></span><span style={{marginLeft:10}}> <a href="#" className={classes.link}>Sitemap</a></span><span style={{marginLeft:10}}> <a href="#" className={classes.link}>Company Details</a></span><span style={{marginLeft:500}} ><IconButton><LanguageOutlinedIcon/></IconButton> <a href="#" className={classes.link}>English(IN)</a></span> <span style={{marginLeft:10}}><IconButton>
              <FacebookIcon /></IconButton></span><span style={{marginLeft:10}}><IconButton>
              <TwitterIcon /></IconButton></span><span style={{marginLeft:10}}><IconButton>
              <InstagramIcon /></IconButton></span></p>
      </div>


      </div>

    )
}