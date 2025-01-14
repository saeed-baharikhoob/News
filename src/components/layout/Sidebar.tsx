import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    useTheme,
    useMediaQuery,
    Divider,
    Toolbar,
} from '@mui/material';
import {
    Newspaper as NewspaperIcon,
    Settings as SettingsIcon,
    Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';


interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const DRAWER_WIDTH = 240;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const menuItems = [
        {
            text: 'Top Stories',
            icon: <NewspaperIcon />,
            path: '/',
            onClick: () => {
                navigate('/');
            }
        },
        {
            text: 'My Feed',
            icon: <BookmarkIcon />,
            path: '/my-feed',
            onClick: () => navigate('/my-feed')
        },
        {
            text: 'Preferences',
            icon: <SettingsIcon />,
            path: '/preferences',
            onClick: () => navigate('/preferences')
        },
    ];

    const drawerContent = (
        <>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => {
                                    item.onClick();
                                    if (isMobile) onClose();
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </>
    );

    return (
        <Box component="nav">
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={onClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                        },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;