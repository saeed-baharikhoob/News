import React, {  useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Button,
    SelectChangeEvent,
} from '@mui/material';

import {CATEGORIES} from "../../../utils/data";
import {useNews} from "../../../hooks/news";


const AVAILABLE_SOURCES = [
    'NewsAPI',
    'The Guardian',
    'The New York Times'
];

const PreferencesPanel = () => {
    const { preferences, updatePreferences, getPersonalizedFeed } = useNews();
    const [selectedSources, setSelectedSources] = useState<string[]>(preferences.selectedSources);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(preferences.selectedCategories);


    const allCategories = Array.from(CATEGORIES);


    const handleSourceChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedSources(value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedCategories(value);
    };

    const handleSavePreferences = () => {
        updatePreferences.updateSourcePreferences(selectedSources);
        updatePreferences.updateCategoryPreferences(selectedCategories);
        getPersonalizedFeed();
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                News Preferences
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>

                <FormControl>
                    <InputLabel id="sources-label">Preferred Sources</InputLabel>
                    <Select
                        labelId="sources-label"
                        multiple
                        value={selectedSources}
                        onChange={handleSourceChange}
                        input={<OutlinedInput label="Preferred Sources" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {AVAILABLE_SOURCES.map((source) => (
                            <MenuItem key={source} value={source}>
                                <Checkbox checked={selectedSources.indexOf(source) > -1} />
                                <ListItemText primary={source} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl>
                    <InputLabel id="categories-label">Preferred Categories</InputLabel>
                    <Select
                        labelId="categories-label"
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        input={<OutlinedInput label="Preferred Categories" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {allCategories.map((category) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                                <ListItemText primary={category.charAt(0).toUpperCase() + category.slice(1)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSavePreferences}
                    sx={{ mt: 2 }}
                >
                    Save Preferences & Update Feed
                </Button>
            </Box>
        </Paper>
    );
};

export default PreferencesPanel;