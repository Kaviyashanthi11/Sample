import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Drawer, CssBaseline, AppBar as MuiAppBar, Toolbar, List,
  Typography, IconButton, ListItem, ListItemText, Avatar,
  Collapse, useMediaQuery, Backdrop
} from '@mui/material';
import { Menu as MenuIcon, ExpandMore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip as BootstrapTooltip, OverlayTrigger } from 'react-bootstrap';
import logo from '../../../../images/favicon.png';
import { useAuth } from '../../../../Top/UserContext';
import { itemsRole1, itemsRole2, itemsRole3, itemsRole4 } from './SidebarRoles';
import { useState,useEffect } from 'react';
import routes from '../../../../routes'

const drawerWidth = 220;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ListContainer = styled('div')(({ theme }) => ({
  height: 'calc(100% - 84px)',
}));

// MenuItem Component
const MenuItem = ({
  item,
  open,
  selected,
  onSelect,
  hoveredMenu,
  onHover,
  onLeave,
  activeSubmenu,
  setActiveSubmenu,
  openSubmenuId,
  setOpenSubmenuId,
  setSelectedMenuPath
}) => {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  const handleItemClick = () => {
    if (item.submenu) {
      // Toggle the submenu display
      if (openSubmenuId === item.text) {
        setOpenSubmenuId(null);
      } else {
        setOpenSubmenuId(item.text);
      }
      setSubmenuOpen(!submenuOpen);
      setActiveSubmenu(item.text);

      // Do NOT set the selectedMenuPath for main menus
    } else {
      // For main menu items without submenus, set the path
      onSelect(item.text, item.link);
      setSelectedMenuPath({ menu: item.text, submenu: null });
    }
  };

  const handleSubmenuClick = (subItem) => {
    // Set selected menu path for submenus only
    onSelect(subItem.text, subItem.link);
    setSelectedMenuPath({ menu: item.text, submenu: subItem.text });
  };

  React.useEffect(() => {
    if (openSubmenuId !== item.text) {
      setSubmenuOpen(false);
    }
  }, [openSubmenuId, item.text]);
  const renderSubmenuTooltip = () => (
    <BootstrapTooltip id="tooltip-custom" style={{ zIndex: 9999 }}>
      <div
        style={{
          fontSize: '0.9rem',
          backgroundColor: 'white',
          color: 'black',
          cursor: 'pointer',
          border: "1px solid lightgrey",
          borderRadius: "4px",
          width:'150px',
          marginLeft:'12px'
        }}
      >
        {item.submenu?.map((sub) => (
          <div
            key={sub.text}
            onClick={(e) => {
              e.stopPropagation();
              handleSubmenuClick(sub);
            }}
          >
            {sub.text}
          </div>
        ))}
      </div>
    </BootstrapTooltip>
  );

  return (
    <>
      <ListItem
  button
  selected={selected === item.text}
  onMouseEnter={() => onHover(item.text)}
  onMouseLeave={onLeave}
  onClick={handleItemClick}
>
  {!open ? (
    <OverlayTrigger
      placement="right"
      show={hoveredMenu === item.text}
      overlay={item.submenu ? renderSubmenuTooltip() : (
        <BootstrapTooltip id="tooltip-custom" style={{ zIndex: 9999 }}>
          <div
            style={{
              fontSize: '0.9rem',
              padding: '2px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: "1px solid lightgrey",
              borderRadius: "4px",
              marginLeft:'12px'
            }}
          >
            {item.text}
          </div>
        </BootstrapTooltip>
      )}
    >
      <Avatar
        variant="square"
        src={item.image}
        sx={{ width: 24, height: 24, marginRight: 1 }}
      />
    </OverlayTrigger>
  ) : (
    <>
      <Avatar
        variant="square"
        src={item.image}
        sx={{ width: 24, height: 24, marginRight: 1 }}
      />
      <ListItemText primary={item.text} sx={{ display: open ? 'block' : 'none' }} />
      {item.submenu && <ExpandMore />}
    </>
  )}
</ListItem>


      {item.submenu && (
        <Collapse in={openSubmenuId === item.text && open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.submenu.map((sub) => (
              <ListItem
                button
                key={sub.text}
                onClick={() => handleSubmenuClick(sub)}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={sub.text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function SidebarNavigation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { userRole ,user} = useAuth();
  const [open, setOpen] = React.useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
  const [hoveredMenu, setHoveredMenu] = React.useState(null);
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);
  const [openSubmenuId, setOpenSubmenuId] = React.useState(null);
  const [bopen, setBopen] = useState(false);
  const [selectedMenuPath, setSelectedMenuPath] = React.useState({ menu: '', submenu: null });
  const activeMenuItem = Array.isArray(routes) 
  ? routes.find((route) => route.path === location.pathname)?.menuName 
  : '';

    useEffect(() => {
      const title = `ecsTest - ${activeMenuItem} - ${user?.userask || "User"} `;
      document.title = title;
      return () => {
        document.title = "ecsTest";
      };
    }, [location.pathname, user?.userask, activeMenuItem]);

  const getMenuItems = React.useMemo(() => {
    switch (userRole) {
      case 1:
        return itemsRole1;
      case 2:
        return itemsRole2;
      case 3:
        return itemsRole3;
      case 4:
        return itemsRole4;
      default:
        return [];
    }
  }, [userRole]);

  const handleNavigation = async (text, path) => {
    setBopen(true);
    setSelectedMenuItem(text);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    navigate(path);
    await new Promise(resolve => setTimeout(resolve, 300));
    setBopen(false);
  };

  React.useEffect(() => {
    setBopen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const currentPath = location.pathname;
    const findSelectedMenuPath = (items) => {
      for (const item of items) {
        if (item.link === currentPath) {
          return { menu: item.text, submenu: null };
        }
        if (item.submenu) {
          const submenuItem = item.submenu.find(sub => sub.link === currentPath);
          if (submenuItem) {
            return { menu: item.text, submenu: submenuItem.text };
          }
        }
      }
      return { menu: '', submenu: null };
    };

      const selectedPath = findSelectedMenuPath(getMenuItems);
      setSelectedMenuPath(selectedPath);
      setSelectedMenuItem(selectedPath.submenu || selectedPath.menu);
    }, [location.pathname, getMenuItems]);
    

  React.useEffect(() => {
    setOpen(isMdUp);
  }, [isMdUp]);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: '#D3D3D3',
          height: '25px',
          marginTop: isMdUp ? '90px' : '81px',
          marginLeft: '100px',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              color: 'black',
              marginBottom: isMdUp ? '40px' : '30px',
              marginLeft: isMdUp ? '31px' : '-10px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              color: 'black',
              marginBottom: isMdUp ? '40px' : '30px',
              fontSize: '0.8rem'
            }}
          >
            {selectedMenuPath.menu}
            {selectedMenuPath.submenu && ` - ${selectedMenuPath.submenu}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: open ? drawerWidth : '64px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : '54px',
            boxSizing: 'border-box',
            marginTop: isMdUp ? '90px' : '80px',
            zIndex: theme.zIndex.drawer + 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            '& ::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
        }}
      >
        <DrawerHeader />
        <ListContainer>
          <List sx={{ '& .MuiListItemText-primary': { fontSize: '0.8rem' }, marginTop: '-62px' }}>
            {getMenuItems.map((item) => (
              <MenuItem
                key={item.text}
                item={item}
                open={open}
                selected={selectedMenuItem}
                onSelect={handleNavigation}
                hoveredMenu={hoveredMenu}
                onHover={setHoveredMenu}
                onLeave={() => setHoveredMenu(null)}
                activeSubmenu={activeSubmenu}
                setActiveSubmenu={setActiveSubmenu}
                openSubmenuId={openSubmenuId}
                setOpenSubmenuId={setOpenSubmenuId}
                setSelectedMenuPath={setSelectedMenuPath}
              />
            ))}
          </List>
        </ListContainer>
      </Drawer>
      <Main open={open}>
        <Backdrop 
          open={bopen} 
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 2 
          }}
        >
          <img src={logo} alt="loading" />
        </Backdrop>
      </Main>
    </>
  );
}