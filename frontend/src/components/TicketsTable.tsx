import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { Ticket, useTickets } from "../context/TicketsProvider";
import {
  capitalizeFirstLetter,
  getRelativeTime,
  sortTicketsByDate,
} from "../helpers/helpers";

const TicketHeaders = ({ admin }: { admin?: boolean }) => {
  const baseHeaders = [
    "ID",
    "Name",
    "Email",
    "Description",
    "Subject",
    "Priority",
    "Status",
    "Date Created",
  ];

  const updatedHeaders = admin ? baseHeaders : [...baseHeaders, "Actions"];

  return (
    <TableHead>
      <TableRow>
        {updatedHeaders.map((header) => (
          <TableCell key={header}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TicketRow = ({
  admin,
  ticket,
  openTicketDetails,
}: {
  admin?: boolean;
  ticket: Ticket;
  openTicketDetails?: (ticketId: number) => void;
}) => {
  const { createdAt } = ticket;

  const { onDelete } = useTickets();

  const relativeTime = getRelativeTime(createdAt || new Date());

  const getStatusChipColor = (status: string) => {
    const statusColorMap = {
      new: "primary",
      resolved: "success",
      progress: "warning",
    };

    const color = statusColorMap[status as keyof typeof statusColorMap];

    return color || "default";
  };

  return (
    <TableRow
      key={ticket.id}
      hover={!!openTicketDetails}
      onClick={() => openTicketDetails && openTicketDetails(ticket.id)}
      sx={{
        cursor: openTicketDetails ? "pointer" : "default",
      }}
    >
      <TableCell>{ticket.id}</TableCell>
      <TableCell>{ticket.name}</TableCell>
      <TableCell>{ticket.email}</TableCell>
      <TableCell>{ticket.description}</TableCell>
      <TableCell>{ticket.subject}</TableCell>
      <TableCell>{ticket.priority}</TableCell>
      <TableCell>
        <Chip
          size="small"
          variant="filled"
          label={capitalizeFirstLetter(ticket.status)}
          color={
            getStatusChipColor(ticket.status) as
              | "primary"
              | "success"
              | "warning"
          }
        />
      </TableCell>
      <TableCell>{relativeTime}</TableCell>
      {!admin && (
        <TableCell>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => onDelete(ticket.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

const TicketsTable = ({
  admin,
  tickets,
  openTicketDetails,
}: {
  admin?: boolean;
  tickets: Ticket[];
  openTicketDetails?: (ticketId: number) => void;
}) => {
  const sortedTickets = sortTicketsByDate(tickets);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TicketHeaders admin={admin} />
        <TableBody>
          {sortedTickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              admin={admin}
              ticket={ticket}
              openTicketDetails={openTicketDetails}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketsTable;
