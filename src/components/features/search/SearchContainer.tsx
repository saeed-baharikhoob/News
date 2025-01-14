import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import FilterPanel from '../filters/FilterPanel';

const SearchContainer= () => {
    return (
        <Box sx={{ mb: 4 }}>
            <SearchBar />
            <FilterPanel />
        </Box>
    );
};

export default SearchContainer;