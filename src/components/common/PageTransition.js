import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';

const PageTransition = ({ loading, children }) => {
  return (
    <Fade in={!loading} timeout={500}>
      <Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Fade>
  );
};

export default PageTransition;
