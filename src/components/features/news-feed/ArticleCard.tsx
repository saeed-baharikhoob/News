import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Box,
    Chip,
} from '@mui/material';
import { Article } from '../../../services/types';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {article.imageUrl && (
                <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    alt={article.title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                    {article.title}
                </Typography>
                {article.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {article.description}
                    </Typography>
                )}
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {article.category && (
                        <Chip
                            label={article.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    <Chip
                        label={article.source}
                        size="small"
                        color="secondary"
                        variant="outlined"
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read More
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                    {new Date(article.publishedAt).toISOString()}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default ArticleCard;