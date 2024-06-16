import { useEffect, useState } from "react";
import { apiCallToServer } from "../helpers/helpers";
import { Ticket } from "../context/TicketsProvider";
import { useAuth } from "../context/AuthProvider";

const useFetchTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isTicketFetching, setIsTicketFetching] = useState(true);

  const auth = useAuth();

  const { userData, loading } = auth || {};
  const { _id: userId } = userData || {};

  const fetchTickets = async () => {
    try {
      const result = await apiCallToServer({
        method: "POST",
        path: "tickets/get-tickets",
        data: { userId },
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
    if (isTicketFetching && !loading && userId) {
      fetchTickets();
    }
  }, [isTicketFetching, loading, userId]);

  return {
    tickets,
    setTickets,
    isTicketFetching,
  };
};

export default useFetchTickets;
