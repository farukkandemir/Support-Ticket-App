import React, { useState } from "react";
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

type Field = {
  label: string;
  value: string | undefined;
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
};

type AdminCommentSectionProps = {
  adminComment: string;
  setAdminComment: React.Dispatch<React.SetStateAction<string>>;
};

type AdminRepliesSectionProps = {
  replies: string[];
};

const TicketField: React.FC<Field> = ({
  label,
  value,
  fullWidth = false,
  multiline = false,
  minRows,
  maxRows,
}) => (
  <Grid item xs={12} sm={fullWidth ? 12 : 6}>
    <TextField
      label={label}
      value={value}
      fullWidth
      disabled
      multiline={multiline}
      rows={minRows}
      maxRows={maxRows}
      sx={{ marginBottom: "1rem" }}
    />
  </Grid>
);

const AdminCommentSection: React.FC<AdminCommentSectionProps> = ({
  adminComment,
  setAdminComment,
}) => (
  <Grid item xs={12}>
    <TextField
      label="Admin Comment"
      value={adminComment}
      onChange={(e) => setAdminComment(e.target.value)}
      fullWidth
      multiline
      rows={4}
      maxRows={8}
      sx={{ marginBottom: "1rem" }}
    />
  </Grid>
);

const AdminRepliesSection: React.FC<AdminRepliesSectionProps> = ({
  replies,
}) => (
  <Grid item xs={12}>
    <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
      Admin Replies
    </Typography>
    {replies.map((reply, index) => (
      <Box key={index} sx={{ marginBottom: "1rem" }}>
        <Typography variant="body1">{reply}</Typography>
      </Box>
    ))}
  </Grid>
);

const TicketDetails: React.FC = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [status, setStatus] = useState<string>("");
  const [adminComment, setAdminComment] = useState<string>("");

  const { setTickets, isAdmin } = useTickets();
  const { ticket, loading, errorMessage } = useFetchTicketById({
    id: ticketId,
    setStatus,
  });

  const hasReplies = !!ticket?.replies?.length;

  const { updateStatus, addAdminReply, onDelete } = useCrudFunctions({
    setTickets,
  });

  const fields: Field[] = [
    { label: "Name", value: ticket?.name },
    { label: "Email", value: ticket?.email },
    {
      label: "Subject",
      value: ticket?.subject,
      fullWidth: true,
    },
    {
      label: "Description",
      value: ticket?.description,
      multiline: true,
      fullWidth: true,
      minRows: 4,
      maxRows: 8,
    },
    { label: "Priority", value: ticket?.priority },
  ];

  const backToDashboard = () => navigate("/admin-dashboard");

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handleUpdateTicket = async () => {
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

    if (isAdmin && adminComment) {
      await addAdminReply({
        ticketId: Number(ticketId),
        reply: adminComment,
      });
    }

    navigate("/admin-dashboard");
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
            <TicketField
              key={index}
              label={field.label}
              value={field.value}
              fullWidth={field.fullWidth}
              multiline={field.multiline}
              minRows={field.minRows}
              maxRows={field.maxRows}
            />
          ))}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                disabled={!isAdmin}
                onChange={handleStatusChange}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="progress">In Progress</MenuItem>
                <MenuItem value="resolved">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {isAdmin && (
            <AdminCommentSection
              adminComment={adminComment}
              setAdminComment={setAdminComment}
            />
          )}

          {hasReplies && <AdminRepliesSection replies={ticket.replies} />}

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
                <Button variant="contained" onClick={handleUpdateTicket}>
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    onDelete(Number(ticketId));

                    if (isAdmin) {
                      return navigate("/admin-dashboard");
                    }

                    return navigate("/dashboard");
                  }}
                >
                  Delete
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
