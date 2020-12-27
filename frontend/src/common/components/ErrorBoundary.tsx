import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Paper } from '@material-ui/core';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.error !== null) {
      return (
        <Box m={2}>
          <Paper elevation={2}>
            <Box component="pre" p={2}>{this.state.errorInfo}</Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
