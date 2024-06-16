import { useEffect, useState } from "react";
import { apiCallToServer } from "../helpers/helpers";
import { Ticket } from "../context/TicketsProvider";

const useFetchTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isTicketFetching, setIsTicketFetching] = useState(true);

  const fetchTickets = async () => {
    try {
      const result = await apiCallToServer({
        method: "GET",
        path: "tickets",
        callback: (res: any) => res,
      });

      if (result && result.success) {
        setTickets(result.data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsTicketFetching(false);
    }
  };

  useEffect(() => {
    if (isTicketFetching) {
      fetchTickets();
    }
  }, [isTicketFetching]);

  return {
    tickets,
    setTickets,
    isTicketFetching,
  };
};

export default useFetchTickets;
