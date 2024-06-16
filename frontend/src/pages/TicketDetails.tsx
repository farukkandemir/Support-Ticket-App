import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import { useTickets } from "../context/TicketsProvider";
import useFetchTicketById from "../hooks/useFetchTicketById";
import useCrudFunctions from "../hooks/useCrudFunctions";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [status, setStatus] = useState("");

  const { setTickets } = useTickets();
  const { ticket, loading, errorMessage } = useFetchTicketById({
    id: ticketId,
    setStatus,
  });

  const { updateStatus } = useCrudFunctions({ setTickets });

  const fields = [
    { label: "Name", value: ticket?.name },
    { label: "Email", value: ticket?.email },
    {
      label: "Subject",
      value: ticket?.subject,
      fullRow: true,
    },
    {
      label: "Description",
      value: ticket?.description,
      multiline: true,
      fullRow: true,
      minRows: 4,
      maxRows: 8,
    },
    { label: "Priority", value: ticket?.priority },
  ];

  const backToDashboard = () => navigate("/admin-dashboard");

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    return setStatus(event.target.value as string);
  };

  const handleUpdateStatus = async () => {
    if (!ticketId || !status) {
      return toast.error("Ticket ID and status are required!");
    }

    const response = await updateStatus({
      ticketId: Number(ticketId),
      status: status,
    });

    if (!response.success) {
      return toast.error("Failed to update ticket status!");
    }

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === Number(ticketId)) {
          return { ...ticket, status };
        }
        return ticket;
      })
    );

    return navigate("/admin-dashboard");
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" width="100%" height="100vh" />
      </Container>
    );
  }

  if (errorMessage) {
    return <Container maxWidth="lg">{errorMessage}</Container>;
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Ticket Details
        </Typography>
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid key={index} item xs={12} sm={field.fullRow ? 12 : 6}>
              <TextField
                label={field.label}
                value={field.value}
                fullWidth
                disabled
                multiline={field.multiline}
                rows={field.minRows}
                maxRows={field.maxRows}
                sx={{ marginBottom: "1rem" }}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="progress">In Progress</MenuItem>
                <MenuItem value="resolved">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Grid container columnGap={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={backToDashboard}
                >
                  Back to Dashboard
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleUpdateStatus}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TicketDetails;
