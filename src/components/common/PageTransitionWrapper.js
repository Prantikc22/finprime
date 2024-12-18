import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';

const PageTransitionWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={!loading} timeout={800}>
      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Fade>
  );
};

export default PageTransitionWrapper;
