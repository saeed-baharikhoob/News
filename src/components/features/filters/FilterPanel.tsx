import React from 'react';
import {
    Paper,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    SelectChangeEvent,
} from '@mui/material';

import { CATEGORIES } from '../../../services/api/config';
import {useNews} from "../../../hooks/news";

const FilterPanel = () => {
    const {
        filters,
        handleDateFilter,
        getNewsByCategory
    } = useNews();

    const handleCategoryChange = (event: SelectChangeEvent) => {
        getNewsByCategory(event.target.value);
    };

    const handleDateChange = (type: 'from' | 'to') => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newFromDate = type === 'from'
            ? (event.target.value || null)
            : (filters.fromDate ?? null);

        const newToDate = type === 'to'
            ? (event.target.value || null)
            : (filters.toDate ?? null);

        handleDateFilter(newFromDate, newToDate);
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={filters.category ?? ''}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {CATEGORIES.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="From Date"
                    type="date"
                    value={filters.fromDate || ''}
                    onChange={handleDateChange('from')}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField
                    label="To Date"
                    type="date"
                    value={filters.toDate || ''}
                    onChange={handleDateChange('to')}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>
        </Paper>
    );
};

export default FilterPanel;