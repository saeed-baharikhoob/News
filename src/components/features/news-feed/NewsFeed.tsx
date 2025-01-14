import React, { useEffect, useMemo } from 'react';
import { Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import ArticleCard from './ArticleCard';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ComponentType } from "react";
import { FixedSizeList as _FixedSizeList, FixedSizeListProps, ListChildComponentProps } from "react-window";
import { useNews } from "../../../hooks/news";


const NewsFeed = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const FixedSizeList = _FixedSizeList as unknown as ComponentType<FixedSizeListProps>;
    const {
        articles,
        loading,
        error,
    } = useNews();



    const { ITEMS_PER_ROW, ITEM_HEIGHT } = useMemo(() => ({
        ITEMS_PER_ROW: isMobile ? 1 : isTablet ? 2 : 3,
        ITEM_HEIGHT: isMobile ? 450 : 600,
    }), [isMobile, isTablet]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="error" align="center">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!articles || articles.length === 0) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography align="center">
                    No articles found. Try adjusting your search or filters.
                </Typography>
            </Box>
        );
    }

    const Row = ({ index, style }: ListChildComponentProps) => {
        const fromIndex = index * ITEMS_PER_ROW;
        const toIndex = Math.min(fromIndex + ITEMS_PER_ROW, articles.length);

        return (
            <Box
                style={{
                    ...style,
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                }}
                display="flex"
                gap={2}
            >
                {Array.from({ length: ITEMS_PER_ROW }).map((_, colIndex) => {
                    const articleIndex = fromIndex + colIndex;
                    if (articleIndex >= articles.length) return null;

                    return (
                        <Box
                            key={colIndex}
                            width={`${100 / ITEMS_PER_ROW}%`}
                            sx={{
                                mb: 2,
                            }}
                        >
                            <ArticleCard article={articles[articleIndex]} />
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const rowCount = Math.ceil(articles.length / ITEMS_PER_ROW);

    return (
        <Box
            height="calc(100vh - 200px)"
            width="100%"
            sx={{
                overflow: 'hidden'
            }}
        >
            <AutoSizer>
                {({ height, width }: { height: number, width: number }) => (
                    <FixedSizeList
                        height={height}
                        itemCount={rowCount}
                        itemSize={ITEM_HEIGHT}
                        width={width}
                        overscanCount={5}
                    >
                        {Row}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </Box>
    );
};

export default NewsFeed;