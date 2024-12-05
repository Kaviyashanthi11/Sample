// import React from "react";
// import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
// import LogoImage from "../../../ecs/images/logo.webp";

// const SessionCheck = () => {
//   return (
//     <div>
//       {/* Top AppBar */}
//       <AppBar
//         position="fixed"
//         elevation={2}
//         sx={{
//           height: "28px",
//           background: "black",
//           color: "white",
//           zIndex: theme => theme.zIndex.drawer + 1
//         }}
//       >
//         <Toolbar
//           sx={{
//             height: "100%",
//             display: "flex",
//             marginTop: "-18px",
//             justifyContent: "space-between"
//           }}
//         >
//           <div style={{ flexGrow: 2 }} />
//         </Toolbar>
//       </AppBar>

//       {/* Second AppBar with Logo */}
//       <AppBar
//         position="static"
//         elevation={2}
//         sx={{ marginTop: "28px", backgroundColor: "white", height: "50px" }}
//       >
//         <Toolbar>
//           <img src={LogoImage} alt="logo" style={{ marginTop: "-11px" }} />
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Box
//         sx={{
//           marginTop: "90px",
//           padding: "20px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           border: "1px solid #ddd"
//         }}
//       >
//         <Typography sx={{ marginLeft: "20px", color: "#0078D7" }}>
//           Login
//         </Typography>
//         <Typography sx={{ marginBottom: "20px" }}>
//           You have already logged in on another computer/browser. Do you want to
//           continue?
//         </Typography>
//         <Box sx={{ display: "flex", gap: "10px" }}>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: "#4CAF50", color: "white" }}
//           >
//             Yes
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: "#424242", color: "white" }}
//           >
//             No
//           </Button>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default SessionCheck;
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import LogoImage from "../../../ecs/images/logo.webp";

const SessionCheck = () => {
  return (
    <div>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          height: "28px",
          background: "black",
          color: "white",
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            marginTop: "-18px",
            justifyContent: "space-between"
          }}
        >
          <div style={{ flexGrow: 2 }} />
        </Toolbar>
      </AppBar>

      {/* Second AppBar with Logo */}
      <AppBar
        position="static"
        elevation={2}
        sx={{ marginTop: "28px", backgroundColor: "white", height: "50px" }}
      >
        <Toolbar>
          <img src={LogoImage} alt="logo" style={{ marginTop: "-11px" }} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          marginTop: "50px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f8f8", 
          border: "1px solid #e0e0e0" 
        }}
      >
        <Typography variant="body1" gutterBottom>
          You have already logged in on another computer/browser. Do you want to
          continue?
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#8bc34a", color: "white" }}
            size="small"
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#333", color: "white" }}
            size="small"
          >
            No
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SessionCheck;
