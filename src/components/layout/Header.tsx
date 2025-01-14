import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" noWrap component="div">
                    News
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;