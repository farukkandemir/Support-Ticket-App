import { Box, Button, Typography } from "@mui/material";

const EmptyDashboard = ({
  openNewTicketForm,
}: {
  openNewTicketForm: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: "1 1 50%",
            maxWidth: "50%",
          }}
        >
          <img
            src="/images/empty-dashboard.jpg"
            alt="empty-dashboard"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Ticket Master
          </Typography>
          <Typography variant="body1" paragraph>
            You have no tickets yet. Click the button below to create a new
            ticket to get started
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={openNewTicketForm}
          >
            New Ticket
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyDashboard;
