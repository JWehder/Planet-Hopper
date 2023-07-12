import React, { useState } from "react";
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
import SearchBarButtonGroup from "../listing/components/SearchBarButtonGroup";
import { CenterDiv } from "../../styles/Styles";

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
    <AppBar>
        <Section style={{justifyContent: 'flext-start'}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <StyledLink to="/">PlanetHopper</StyledLink>
          </Typography>
        </Section>
        <Section>
            <SearchBarButtonGroup />
        </Section>
        <Section style={{justifyContent: 'flex-end'}}>
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
        </Section>
    </AppBar>
    );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`

const Section = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AppBar = styled.div`
    color: #d500f9;
    background-color: #F8F5FF;
    border-bottom: 1px solid #E5E4E4;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export default NavBar;