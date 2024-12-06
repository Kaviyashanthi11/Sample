import React from 'react'
import TopBar from '../component/layout/Navbar/TopbarNavigation/TopBar';
import Side from '../component/layout/Navbar/SidebarNavigation/Sidebar';
import Footer from '../Footer';
import { Box } from '@mui/material';

function Layout({children}) {
    return (
        <>
          <Box sx={{ display: "flex" }}>
            <TopBar
            />
            <Side
         
            />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              maxWidth: "95%",
              marginRight: '20px',
              marginTop: "130px",
              paddingBottom: "30px",
              marginLeft: "5px",
              fontSize:'small',
              fontWeight:'bold',
             overflowY:'hidden',

              
            }}
          >
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          </Box>
           
            <Footer />
          </Box>
        </>
      );
    };
    
    export default Layout;