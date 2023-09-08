//? REACT
import React from "react";
import { useNavigate } from "react-router-dom";

//? MATERIAL UI
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

//? SASS
import "./HamburgerMenu.scss";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleClick = (colorScheme) => {
    const event = new CustomEvent("resetBG", { detail: colorScheme });
    window.dispatchEvent(event);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <>
      <Box className="mobileMenu" sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ color: "#ffffff" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List
              sx={{
                width: "165px",
                height: "100%",
                background:
                  "linear-gradient(to bottom, #001220 60%, #ed6a29 100%)",
              }}
            >
              <ListItem
                onClick={() => {
                  navigate("/");
                  toggleDrawer(false);
                  handleClick("default");
                }}
              >
                <ListItemText
                  primary="Home"
                  sx={{
                    color: "#ffffff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  navigate("/decision");
                  toggleDrawer(false);
                  handleClick("default");
                }}
              >
                <ListItemText
                  primary="Get Started"
                  sx={{
                    color: "#ffffff",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  navigate("/how-it-works");
                  toggleDrawer(false);
                  handleClick("default");
                }}
              >
                <ListItemText
                  primary="How It Works"
                  sx={{
                    color: "#ffffff",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </Box>
    </>
  );
}
