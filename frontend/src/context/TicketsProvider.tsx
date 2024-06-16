import React, { createContext, useContext, ReactNode } from "react";
import useFetchTickets from "../hooks/useFetchTickets";
import useCrudFunctions from "../hooks/useCrudFunctions";

export type Ticket = {
  id: number;
  name: string;
  email: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  createdAt?: string;
};

type TicketContextType = {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  isTicketFetching: boolean;
  hasNoTickets: boolean;
  createTicket: (newTicket: Ticket) => any;
  onDelete: (ticketId: number) => any;
  statusCounts: { [key: string]: number };
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};

export const TicketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { tickets, setTickets, isTicketFetching } = useFetchTickets();

  const { createTicket, onDelete } = useCrudFunctions({
    setTickets,
  });

  const getStatusCounts = (tickets: Ticket[]) => {
    const statusCounts: { [key: string]: number } = {
      new: 0,
      progress: 0,
      resolved: 0,
    };

    tickets.forEach((ticket) => {
      const { status } = ticket;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status] += 1;
      }
    });

    return statusCounts;
  };

  const statusCounts = getStatusCounts(tickets);

  const hasNoTickets = !tickets.length;

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        statusCounts,
        isTicketFetching,
        hasNoTickets,
        createTicket,
        onDelete,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};