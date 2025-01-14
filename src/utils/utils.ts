import {Article} from "../services/types";

export const sortArticlesByDate = (articles: Article[]): Article[] =>
    [...articles].sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

export const removeDuplicates = (articles: Article[]): Article[] => {
    const seen = new Set();
    return articles.filter(article => {
        if (article.title === '[Removed]') return false;
        const isDuplicate = seen.has(article.url);
        seen.add(article.url);
        return !isDuplicate;
    });
};

export const filterArticlesByPreferences = (
    articles: Article[],
    preferences: {
        selectedSources: string[];
        selectedCategories: string[];
        selectedAuthors: string[];
    }
): Article[] =>
    articles.filter(article => {
        const matchesSource = preferences.selectedSources.length === 0 ||
            preferences.selectedSources.includes(article.source);
        const matchesCategory = preferences.selectedCategories.length === 0 ||
            (article.category && preferences.selectedCategories.includes(article.category));
        const matchesAuthor = preferences.selectedAuthors.length === 0 ||
            (article.author && preferences.selectedAuthors.includes(article.author));

        return matchesSource && matchesCategory && matchesAuthor;
    });

export const processArticles = (articles: Article[]): Article[] =>
    sortArticlesByDate(removeDuplicates(articles));