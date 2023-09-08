import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useStyles } from "./HeaderCss";
import { TextField } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router";
import { InputAdornment } from "@mui/material";

export default function Header(props) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    props.searchfn(text);
  };
  return (
    <div>
      <AppBar style={{ width: "100vw" }} position="static" color="inherit">
        <Toolbar>
          <div className={classes.logoStyle}>Abode</div>
          <div
            style={{ display: "flex", flexDirection: "row", marginRight: 400 }}
          >
            <div style={{ width: 400, margin: 10 }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                onChange={(e) => setText(e.target.value)}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(2) },
                  "& input": { paddingLeft: (theme) => theme.spacing(3.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(2.5),
                    borderRadius: "30px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        variant="contained"
                        onClick={handleSearch}
                        style={{
                          border: 0,
                          borderRadius: 20,
                          backgroundColor: "#E31C5F",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <SearchRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{ marginTop: 20 }}></div>
          </div>
          <div>
            <Button
              onClick={() => navigate("/vendorsplashscreen")}
              style={{
                textTransform: "capitalize",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: "bold",
                marginRight: 35,
                color: "black",
              }}
            >
              Switch To Hosting
            </Button>
          </div>

          <div className={classes.avatarStyle}>
            <button style={{ border: 0, cursor: "pointer" }}>
              <MenuIcon />
              <AccountCircleTwoToneIcon />
            </button>
            <div className={classes.userNameStyle}>ABHIRAJ</div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
