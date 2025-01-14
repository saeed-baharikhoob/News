import React, {useState, useCallback, useEffect} from 'react';
import {
    Paper,
    InputBase,
    IconButton,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {useNews} from "../../../hooks/news";
import {useAppSelector} from "../../../store/hooks";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchNews } = useNews();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const filters = useAppSelector((state) => state.filters);
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        searchNews(searchTerm);
    }, [searchTerm, searchNews]);
    useEffect(()=>{

        setSearchTerm(filters.searchTerm)
    },[]);

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Paper
                component="form"
                onSubmit={handleSearch}
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: isMobile ? '100%' : '600px',
                    mx: 'auto',
                    boxShadow: 2
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    inputProps={{ 'aria-label': 'search news articles' }}
                />
                <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default SearchBar;