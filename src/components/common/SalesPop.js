import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, Slide } from '@mui/material';

const notifications = [
  {
    name: 'Rahul S.',
    location: 'Mumbai',
    action: 'made ₹15,000 profit from our Nifty options call',
    timeAgo: '2 minutes ago',
    avatar: 'R',
  },
  {
    name: 'Priya M.',
    location: 'Bangalore',
    action: 'earned ₹12,000 from Bank Nifty options trade',
    timeAgo: '5 minutes ago',
    avatar: 'P',
  },
  {
    name: 'Amit K.',
    location: 'Delhi',
    action: 'recovered entire year's subscription cost in one trade',
    timeAgo: '8 minutes ago',
    avatar: 'A',
  },
  {
    name: 'Sneha R.',
    location: 'Pune',
    action: 'made ₹20,000 profit from our options strategy',
    timeAgo: '12 minutes ago',
    avatar: 'S',
  },
];

const SalesPop = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setShow(true);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            p: 2,
            maxWidth: 300,
            background: 'rgba(22, 28, 36, 0.95)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 48,
              height: 48,
            }}
          >
            {notifications[currentNotification].avatar}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
              {notifications[currentNotification].name} from{' '}
              {notifications[currentNotification].location}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'success.main', fontWeight: 500, my: 0.5 }}
            >
              {notifications[currentNotification].action}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              {notifications[currentNotification].timeAgo}
            </Typography>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default SalesPop;
