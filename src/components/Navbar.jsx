import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth?.user); // گرفتن یوزر از استور

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>

          {!user && (
            <Button component={Link} to="/login" color="inherit">
              ورود
            </Button>
          )}

          {user && (
            <Button component={Link} to="/products" color="inherit">
              محصولات
            </Button>
          )}
          <>
            {user?.role === "admin" && (
              <>
                <Button component={Link} to="/dashboard" color="inherit">
                  داشبورد
                </Button>
                <Button component={Link} to="/users" color="inherit">
                  کاربران
                </Button>

                <Button component={Link} to="/manage-products" color="inherit">
                  مدیریت محصولات
                </Button>
              </>
            )}
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
