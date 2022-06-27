import React  from 'react';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";


const Navbar = () => {
    return (
    <AppBar position="static">
            <Toolbar className='navBar'>
                <Typography variant="h6" sx={{display:{sm:"block"}}}>
                    WebScraper
                </Typography>
            </Toolbar>
    </AppBar>
    )
};

export default Navbar;