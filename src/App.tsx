import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyFeedPage from './pages/MyFeedPage';
import PreferencesPage from './pages/PreferencesPage';
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
    return (
        <ErrorBoundary>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/my-feed" element={<MyFeedPage />} />
                    <Route path="/preferences" element={<PreferencesPage />} />
                </Routes>
            </Layout>
        </Router>
        </ErrorBoundary>
    );
}

export default App;