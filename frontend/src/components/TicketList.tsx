import { Box, Button, Typography } from "@mui/material";
import TicketsTable from "./TicketsTable";
import { useTickets } from "../context/TicketsProvider";
import { capitalizeFirstLetter } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";

const TicketList = ({
  openNewTicketForm,
}: {
  openNewTicketForm: () => void;
}) => {
  const { tickets, statusCounts } = useTickets();

  const navigate = useNavigate();

  const openTicketDetails = (ticketId: number) =>
    navigate(`/ticket/${ticketId}`);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Tickets List</Typography>
        <Typography variant="body2">
          You can view all the tickets here
        </Typography>
      </Box>

      <Button variant="contained" onClick={openNewTicketForm}>
        Create New Ticket
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {Object.entries(statusCounts).map(([status, count]) => (
          <Box
            key={status}
            sx={{
              padding: "1rem",
              boxShadow: "0 0 5px 0 rgba(0,0,0,0.1)",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <Typography variant="h6">
              {capitalizeFirstLetter(status)} Tickets
            </Typography>
            <Typography variant="h5">{count}</Typography>
          </Box>
        ))}
      </Box>

      <TicketsTable tickets={tickets} openTicketDetails={openTicketDetails} />
    </Box>
  );
};

export default TicketList;
