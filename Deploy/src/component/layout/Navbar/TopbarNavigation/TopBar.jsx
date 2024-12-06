import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import logo from '../../../../images/logo.webp';
import { useAuth } from '../../../../Top/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePractice } from '../../../../PracticeContext'; // Import the custom hook


const Title = styled(Typography)({
  flexGrow: 1,
});

const usernameStyle = {
  textTransform: 'uppercase',
};

const Logo = styled('img')({
  height: '40px',
  marginRight: '10px',
});

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { practiceInfo = { name: '', code: '', label: '', practiceCode: '' }, updatePractice } = usePractice();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
    } else if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const storedPractice = sessionStorage.getItem('selectedPractice');
    if (storedPractice && !practiceInfo?.name && !practiceInfo?.code) {
      try {
        const parsedPractice = JSON.parse(storedPractice);
        updatePractice(parsedPractice);
      } catch (error) {
        console.error('Error parsing stored practice:', error);
        sessionStorage.removeItem('selectedPractice');
      }
    }
  }, [practiceInfo?.name, practiceInfo?.code, updatePractice]);

  const userRole = userData?.role;
  const displayUsername = (userRole === 4 || userRole === 2)  && userData?.userask ? userData.userask : userData?.name || "";

  const handleSwitchover = () => {
    navigate('/practicebilling');
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleReset = () => {
    sessionStorage.removeItem('selectedPractice');
    updatePractice({ name: '', code: '', label: '', practiceCode: '' });
    navigate('/practicebilling');
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem('selectedPractice');
    updatePractice({ name: '', code: '', label: '', practiceCode: '' });
    logout();
    navigate('/');
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#333', color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Title variant="h6"></Title>

          {(userRole === 4 || userRole === 2)  && practiceInfo?.label && practiceInfo?.practiceCode  && (
            <Typography
              color="inherit"
              sx={{
                marginBottom: '46px',
                marginRight: '4px',
                fontSize: 'small',
                whiteSpace: 'nowrap', // Prevent text wrapping
              }}
            >
              {practiceInfo.label} ({practiceInfo.practiceCode })
            </Typography>
          )}

          <Typography variant="body2" style={{ margin: "0 5px", marginBottom: '48px' }}>|</Typography>

          <Typography color="inherit" style={{ marginBottom: '46px', marginRight: '4px', fontSize: 'small' }}>
            <div style={usernameStyle}>{displayUsername}</div>
          </Typography>

          <Typography variant="body2" style={{ margin: "0 5px", marginBottom: '48px' }}>|</Typography>

          {(userRole === 4 || userRole === 2)  && (
            <>
              <Typography
                color="inherit"
                style={{ marginBottom: '46px', marginRight: '4px', fontSize: 'small', cursor: 'pointer' }}
                onClick={handleSwitchover}
              >
                Switchover
              </Typography>
              <Typography variant="body2" style={{ margin: "0 5px", marginBottom: '48px' }}>|</Typography>
            </>
          )}

          <Typography
            color="inherit"
            style={{ marginBottom: '46px', marginRight: '5px', fontSize: 'small', cursor: 'pointer' }}
            onClick={handleReset}
          >
            Reset
          </Typography>
          <Typography variant="body2" style={{ margin: "0 5px", marginBottom: '48px' }}>|</Typography>

          <IconButton color="inherit" onClick={handleLogoutClick} style={{ marginTop: '-40px' }}>
            <LogoutIcon />
            <Typography variant="body2" style={{ marginTop: '2px', marginRight: '5px', fontSize: 'small' }}>
              Logout
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" sx={{ backgroundColor: '#fff', marginTop: '25px', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Logo src={logo} />
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Do you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TopBar;
