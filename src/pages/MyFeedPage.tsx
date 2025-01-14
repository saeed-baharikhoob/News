import React, { useEffect } from 'react';
import { Container, Typography, Box, Alert, Chip, CircularProgress, Button } from '@mui/material';
import NewsFeed from '../components/features/news-feed/NewsFeed';
import { useNavigate } from 'react-router-dom';
import {useNews} from "../hooks/news";

const MyFeedPage = () => {
    const {
        preferences,
        getPersonalizedFeed,
        loading,
        error,
        articles
    } = useNews();
    const navigate = useNavigate();

    const hasPreferences = preferences.selectedSources.length > 0 || preferences.selectedCategories.length > 0;

    useEffect(() => {
        const fetchData = async () => {
            await getPersonalizedFeed();
        };

        if(hasPreferences && !loading)
             fetchData();

    }, []);

    if (!hasPreferences) {
        return (
            <Container maxWidth="lg">
                <Box sx={{
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        You haven't set any preferences yet. Please visit the Preferences page to customize your news feed.
                    </Alert>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/preferences')}
                    >
                        Go to Preferences
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 3 }}>
                <Typography variant="h4" gutterBottom>
                     Personalized Feed
                </Typography>


                <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Selected Sources
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {preferences.selectedSources.map((source) => (
                                <Chip
                                    key={source}
                                    label={source}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Box>

                    {preferences.selectedCategories.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Selected Categories
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {preferences.selectedCategories.map((category) => (
                                    <Chip
                                        key={category}
                                        label={category}
                                        color="secondary"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>




                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                )}


                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}


                {!loading && !error && articles.length === 0 && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        No articles found matching your preferences. Try adjusting your filters or preferences.
                    </Alert>
                )}


                {!loading && !error && articles.length > 0 && <NewsFeed  />}
            </Box>
        </Container>
    );
};

export default MyFeedPage;