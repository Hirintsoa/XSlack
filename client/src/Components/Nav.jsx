import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
// Material Icons
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Nav = ({ container }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <>
          <Toolbar />
          <Divider />
          <List>
            <ListItem button key={'Rechercher'}>
                <ListItemIcon sx={{ color: 'primary.dark' }}>
                  <ManageSearchIcon />
                </ListItemIcon>
                <ListItemText primary={'Rechercher'} />
            </ListItem>

            <ListItem button key={'Profil'}>
                <ListItemIcon sx={{ color: 'primary.dark' }}>
                  <AssignmentIndOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Profil'} />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button key={'Tout'}>
              <ListItemIcon sx={{ color: 'secondary.dark' }}>
                <AllInclusiveIcon />
              </ListItemIcon>
              <ListItemText primary={'Tout'} />
            </ListItem>
    
            <ListItem button key={'Channels'}>
              <ListItemIcon sx={{ color: 'secondary.dark' }}>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText primary={'Channels'} />
            </ListItem>
    
            <ListItem button key={'Messages directs'}>
              <ListItemIcon sx={{ color: 'secondary.dark' }}>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={'Messages directs'} />
            </ListItem>
          </List>
        </>
    );
      
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: 'primary.dark' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        XSlack
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

export default Nav;
