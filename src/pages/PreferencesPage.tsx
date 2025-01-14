import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PreferencesPanel from '../components/features/preferences/PreferencesPanel';

const PreferencesPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Customize News Feed
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Select your preferred news sources and categories to personalize your news feed.
                </Typography>
                <PreferencesPanel />
            </Box>
        </Container>
    );
};

export default PreferencesPage;