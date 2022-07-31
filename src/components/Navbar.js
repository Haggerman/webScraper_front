import React  from 'react';
import { AppBar,Toolbar, Typography } from "@mui/material";
import HelperModal from './HelperModal';


const Navbar = () => {
    return (
    <AppBar position="static">
            <Toolbar className='navBar' sx={{justifyContent: "space-between"}}>
                <Typography variant="h6">
                    WebScraper
                </Typography>
                <HelperModal />
            </Toolbar>
    </AppBar>
    )
};

export default Navbar;