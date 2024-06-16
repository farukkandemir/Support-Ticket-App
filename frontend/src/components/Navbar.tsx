import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { userData, logout } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box>
        <Typography variant="h5" color={"primary"}>
          Ticket Master
        </Typography>
      </Box>
      <Box>navlinks</Box>
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={logout}
      >
        <Typography variant="body1" color="secondary">
          {userData?.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
