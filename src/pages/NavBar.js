import React, { useEffect } from "react";
import { Link as NavLink, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cookies from "js-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryIcon from "@mui/icons-material/History";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const pages = ["Home", "Client", "Appointment", "History", "Services"];
const pagesLink = ["/Home", "/Client", "/Appointment", "/History", "/Services"];
const settings = ["Logout"];

function NavBar() {
  const navigate = useNavigate();
  const token = Cookies.get("token"); //user token
  const [anchorSettings, setAnchorSettings] = React.useState(null);

  //Settings
  const handleOpenUserMenu = (event) => {
    setAnchorSettings(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorSettings(null);
  };

  const handleLogout = () => {
    Cookies.set("token", "", { expires: new Date(0) });
    navigate("/");
    toast.success("Successfully logged out.");
    window.location.reload();
  };
  //   E7238B

  return (
    <div className="h-screen flex flex-col">
      <div className="navbar-container bg-[#182c34] py-2 flex justify-center items-center">
        <div className="w-[95%] font-['Poppins'] text-white ">
          <Toolbar disableGutters className="flex justify-center items-center">
            <Box className=" w-[80%] flex justify-between">
              <div className=" flex gap-10 justify-center items-center">
                {pages.map((page, index) => (
                  <div key={index} className="text-xl flex">
                    <Box
                      sx={{
                        flexGrow: 0,
                        cursor: "pointer",
                        borderRadius: "5px",
                        backgroundColor:
                          window.location.pathname.substring(1) === page
                            ? "#06b6d4" //#06b6d4
                            : "",
                      }}
                    >
                      <NavLink to={pagesLink[index]}>
                        <div className="flex justify-center items-center gap-1 px-2 py-1 text-xl rounded-lg transition ease-in-out">
                          <p
                            className={`${
                              window.location.pathname.substring(1) === page
                                ? "white font-bold"
                                : "text-gray-500"
                            }`}
                          >
                            {page}
                          </p>
                        </div>
                      </NavLink>
                    </Box>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <div className="flex gap-5">
                  <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircleIcon
                        style={{ fontSize: "2rem", color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorSettings}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorSettings)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem onClick={handleCloseUserMenu} key={index}>
                        {setting === "Profile" ? (
                          <div
                            className="flex gap-2"
                            onClick={() => navigate("/Profile")}
                          >
                            <AccountCircleIcon />
                            {setting}
                          </div>
                        ) : (
                          <div
                            className="flex gap-2"
                            onClick={() => handleLogout()}
                          >
                            <LogoutIcon />
                            {setting}
                          </div>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <p>Admin</p>
              </div>
            </Box>
          </Toolbar>
        </div>
      </div>
      <div className="outlet-container flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;
