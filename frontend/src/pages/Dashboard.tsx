import { useState } from "react";
import { useTickets } from "../context/TicketsProvider";
import EmptyDashboard from "../components/EmptyDashboard";
import NewTicketForm from "../components/NewTicketForm";
import { Box, Container, Skeleton } from "@mui/material";
import Navbar from "../components/Navbar";
import TicketList from "../components/TicketList";

const Dashboard = () => {
  const { hasNoTickets, isTicketFetching } = useTickets();

  const [openNewTicketModal, setOpenNewTicketModal] = useState(false);

  const openNewTicketForm = () => setOpenNewTicketModal(true);
  const closeNewTicketForm = () => setOpenNewTicketModal(false);

  const isDashboardEmpty = hasNoTickets && !isTicketFetching;

  if (isTicketFetching) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height="100vh" />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Navbar />
      {openNewTicketModal && (
        <NewTicketForm
          openNewTicketModal={openNewTicketModal}
          closeNewTicketForm={closeNewTicketForm}
        />
      )}

      {isDashboardEmpty ? (
        <EmptyDashboard openNewTicketForm={openNewTicketForm} />
      ) : (
        <TicketList openNewTicketForm={openNewTicketForm} />
      )}
    </Container>
  );
};

export default Dashboard;
