import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        gap: 2,
                        textAlign: 'center',
                        p: 3
                    }}
                >
                    <ErrorIcon color="error" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" color="error">
                        Something went wrong
                    </Typography>
                    <Typography color="text.secondary">
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleReset}
                        sx={{ mt: 2 }}
                    >
                        Reload Page
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;