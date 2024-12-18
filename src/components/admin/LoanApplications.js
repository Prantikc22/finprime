import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoanStatus, BusinessLoanTypes, RequiredDocuments } from '../../models/LoanApplication';
import { useAuth } from '../../contexts/AuthContext';

const statusColors = {
  [LoanStatus.DRAFT]: 'default',
  [LoanStatus.SUBMITTED]: 'primary',
  [LoanStatus.UNDER_REVIEW]: 'warning',
  [LoanStatus.DOCUMENTS_PENDING]: 'warning',
  [LoanStatus.PROCESSING]: 'info',
  [LoanStatus.APPROVED]: 'success',
  [LoanStatus.REJECTED]: 'error'
};

const AdminLoanApplications = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Load applications from localStorage
  useEffect(() => {
    const allApplications = [];
    // Get all user's applications
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('loan_applications_')) {
        const userApps = JSON.parse(localStorage.getItem(key));
        allApplications.push(...userApps);
      }
    });
    setApplications(allApplications);
  }, []);

  const handleViewApplication = (application) => {
    setSelectedApp(application);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApp(null);
  };

  const handleDownloadDocuments = (application) => {
    // In a real implementation, this would download a zip of all documents
    console.log('Downloading documents for application:', application.id);
  };

  const handleDownloadCSV = () => {
    const headers = [
      'Application ID',
      'Business Name',
      'Loan Type',
      'Amount',
      'Status',
      'Applied Date',
      'Business Type',
      'Contact Name',
      'Contact Email',
      'Contact Phone'
    ];

    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        app.id,
        app.businessName || 'N/A',
        BusinessLoanTypes[app.loanType]?.name || 'Unknown',
        app.loanAmount || 'N/A',
        app.status,
        new Date(app.createdAt).toLocaleDateString(),
        app.businessType,
        app.contactName,
        app.contactEmail,
        app.contactPhone
      ].join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan_applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Loan Applications
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadCSV}
            >
              Export to CSV
            </Button>
          </Box>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Applications</Typography>
              <Typography variant="h4">{applications.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Review</Typography>
              <Typography variant="h4">
                {applications.filter(app => app.status === LoanStatus.SUBMITTED).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Processing</Typography>
              <Typography variant="h4">
                {applications.filter(app => 
                  [LoanStatus.UNDER_REVIEW, LoanStatus.DOCUMENTS_PENDING, LoanStatus.PROCESSING].includes(app.status)
                ).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approved</Typography>
              <Typography variant="h4">
                {applications.filter(app => app.status === LoanStatus.APPROVED).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>Loan Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.id}</TableCell>
                    <TableCell>{application.businessName || 'N/A'}</TableCell>
                    <TableCell>{BusinessLoanTypes[application.loanType]?.name || 'Unknown'}</TableCell>
                    <TableCell>₹{application.loanAmount?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={statusColors[application.status] || 'default'}
                      />
                    </TableCell>
                    <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton onClick={() => handleViewApplication(application)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download Documents">
                        <IconButton onClick={() => handleDownloadDocuments(application)}>
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Application Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApp && (
          <>
            <DialogTitle>
              Application Details - {selectedApp.businessName}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Business Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Business Type"
                        secondary={selectedApp.businessType}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="GST Number"
                        secondary={selectedApp.gstNumber}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Annual Turnover"
                        secondary={`₹${selectedApp.annualTurnover.toLocaleString()}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Business Vintage"
                        secondary={`${selectedApp.businessVintage} years`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Loan Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Loan Type"
                        secondary={BusinessLoanTypes[selectedApp.loanType]?.name || 'Unknown'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Amount Requested"
                        secondary={`₹${selectedApp.loanAmount?.toLocaleString() || 'N/A'}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Purpose"
                        secondary={selectedApp.loanPurpose}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Contact Person"
                        secondary={selectedApp.contactName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={selectedApp.contactEmail}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary={selectedApp.contactPhone}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Documents</Typography>
                  <List>
                    {Object.entries(RequiredDocuments).map(([key, doc]) => (
                      <ListItem key={key}>
                        <ListItemIcon>
                          <IconButton
                            size="small"
                            onClick={() => console.log(`Download ${doc.name}`)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          primary={doc.name}
                          secondary={doc.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownloadDocuments(selectedApp)}
              >
                Download All Documents
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AdminLoanApplications;
