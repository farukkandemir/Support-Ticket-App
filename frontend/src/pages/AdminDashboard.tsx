import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useTickets } from "../context/TicketsProvider";
import TicketsTable from "../components/TicketsTable";
import { useNavigate } from "react-router-dom";

const TableSkeleton = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={48} />
    </Box>
  );
};

const AdminDashboard = () => {
  const { tickets, hasNoTickets, isTicketFetching } = useTickets();

  const navigate = useNavigate();

  const openTicketDetails = (ticketId: number) =>
    navigate(`/ticket/${ticketId}`);

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          height: "100%",
        }}
      >
        <Typography variant="h5">Admin Dashboard</Typography>

        {isTicketFetching ? (
          <TableSkeleton />
        ) : hasNoTickets ? (
          <Typography variant="body1">No tickets found!</Typography>
        ) : (
          <TicketsTable
            admin
            tickets={tickets}
            openTicketDetails={openTicketDetails}
          />
        )}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
