import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header onMenuClick={handleDrawerToggle} />
            <Sidebar
                open={mobileOpen}
                onClose={handleDrawerToggle}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` }
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;