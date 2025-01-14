import { render } from '@testing-library/react';
import ArticleCard from "../../components/features/news-feed/ArticleCard";

describe('ArticleCard', () => {
    const mockArticle = {
        id: '1',
        title: 'Test Article',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        publishedAt: '2024-01-14T12:00:00Z',
        url: 'https://test.com',
        imageUrl: 'https://test.com/image.jpg',
        source: 'Test Source',
        category: 'Test Category'
    };

    it('renders article title correctly', () => {
        const { getByText } = render(<ArticleCard article={mockArticle} />);
        expect(getByText('Test Article')).toBeInTheDocument();
    });

    it('renders article description when provided', () => {
        const { getByText } = render(<ArticleCard article={mockArticle} />);
        expect(getByText('Test Description')).toBeInTheDocument();
    });

    it('displays the read more button with correct link', () => {
        const { getByRole } = render(<ArticleCard article={mockArticle} />);
        const linkElement = getByRole('link', { name: /read more/i });
        expect(linkElement).toHaveAttribute('href', mockArticle.url);
    });
});