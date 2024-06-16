import { Box, Typography } from "@mui/material";

const Navbar = () => {
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
          AidAtlas
        </Typography>
      </Box>
      <Box>navlinks</Box>
      <Box
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography variant="body1" color="secondary">
          faruk@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
