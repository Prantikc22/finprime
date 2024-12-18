import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Check,
  Close,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const [userData, setUserData] = useState({
    name: currentUser?.displayName || 'User',
    email: currentUser?.email || 'user@example.com',
    phone: currentUser?.phoneNumber || 'Not provided',
    location: 'India',
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    setSnackbarOpen(true);
    // Here you would typically update the user data in your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...userData });
  };

  const handleChange = (field) => (event) => {
    setEditData({ ...editData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(22, 23, 28, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '3rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {userData.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
              {userData.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                mb: 2,
                fontWeight: 500,
              }}
            >
              Basic Account
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(22, 23, 28, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Profile Information
              </Typography>
              {!isEditing ? (
                <IconButton onClick={handleEdit} sx={{ color: 'primary.main' }}>
                  <Edit />
                </IconButton>
              ) : (
                <Box>
                  <IconButton onClick={handleSave} sx={{ color: 'success.main', mr: 1 }}>
                    <Check />
                  </IconButton>
                  <IconButton onClick={handleCancel} sx={{ color: 'error.main' }}>
                    <Close />
                  </IconButton>
                </Box>
              )}
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editData.name}
                    onChange={handleChange('name')}
                    label="Name"
                    variant="outlined"
                    sx={{ input: { color: 'white' } }}
                  />
                ) : (
                  <ListItemText
                    primary="Name"
                    secondary={userData.name}
                    primaryTypographyProps={{ color: 'white', fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'text.secondary', fontWeight: 500 }}
                  />
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={userData.email}
                  primaryTypographyProps={{ color: 'white', fontWeight: 500 }}
                  secondaryTypographyProps={{ color: 'text.secondary', fontWeight: 500 }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editData.phone}
                    onChange={handleChange('phone')}
                    label="Phone"
                    variant="outlined"
                    sx={{ input: { color: 'white' } }}
                  />
                ) : (
                  <ListItemText
                    primary="Phone"
                    secondary={userData.phone}
                    primaryTypographyProps={{ color: 'white', fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'text.secondary', fontWeight: 500 }}
                  />
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editData.location}
                    onChange={handleChange('location')}
                    label="Location"
                    variant="outlined"
                    sx={{ input: { color: 'white' } }}
                  />
                ) : (
                  <ListItemText
                    primary="Location"
                    secondary={userData.location}
                    primaryTypographyProps={{ color: 'white', fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'text.secondary', fontWeight: 500 }}
                  />
                )}
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Profile updated successfully"
      />
    </Container>
  );
};

export default UserProfile;
