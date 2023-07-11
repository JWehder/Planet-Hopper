import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useSelector } from "react-redux";
import { ReactComponent as WebsiteIcon } from '../../images/house_logo.svg'
import { Link } from "react-router-dom"
import styled from "styled-components";

function NavBar() {

    const host = useSelector((state) => state.auth.user && state.auth.user.host);

    const settings = host
      ? ['profile', 'account', 'bookings', 'listings']
      : ['profile', 'account', 'bookings'];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

return (
    <AppBar style={{backgroundColor: "#E5E4E4"}} position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* <RocketLaunchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <WebsiteIcon 
            style={{width: "48px", height:"48px", paddingRight:"10px"}} 
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}} 
            />
            <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            <StyledLink to="/" style={{color: "white"}}>PlanetHopper</StyledLink>
            </Typography>

            <MenuContainer>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <StyledLink to={`/${setting}`}>
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                </StyledLink>
                ))}
            </Menu>
            </Box>
            </MenuContainer>
        </Toolbar>
        </Container>
    </AppBar>
    );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: fixed;
    right: 0;
    width: 100%;
    padding: 10px;
    z-index: 1;
`

export default NavBar;