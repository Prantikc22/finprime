import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={() => navigate(-1)}
      variant="text"
      sx={{
        mb: 3,
        color: 'primary.main',
        '&:hover': {
          backgroundColor: 'rgba(144, 202, 249, 0.08)',
        },
      }}
    >
      Back to Dashboard
    </Button>
  );
};

export default BackButton;
