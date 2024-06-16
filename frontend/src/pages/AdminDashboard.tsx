import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useTickets } from "../context/TicketsProvider";
import TicketsTable from "../components/TicketsTable";
import { useNavigate } from "react-router-dom";

const TableSkeleton = () => {
  return (
    <Box>
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Skeleton variant="rounded" height="2vh" />
        </Box>
      ))}
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
