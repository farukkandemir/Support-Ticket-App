import { useEffect, useState } from "react";
import { Ticket } from "../context/TicketsProvider";
import { apiCallToServer } from "../helpers/helpers";

const useFetchTicketById = ({
  id,
  setStatus,
}: {
  id: string | undefined;
  setStatus?: (status: string) => void;
}) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await apiCallToServer({
          method: "GET",
          path: `tickets/get-ticket/${id}`,
          callback: (res: any) => res,
        });

        if (!response.success) {
          setErrorMessage(response.message);
          return setLoading(false);
        }

        setTicket(response.data);

        if (setStatus) {
          setStatus(response.data.status);
        }

        return setLoading(false);
      } catch (error) {
        setErrorMessage(
          "An error occurred while fetching the ticket. Please try again later."
        );
        setLoading(false);
      }
    };

    if (loading && !errorMessage && id) {
      fetchTicket();
    }
  }, [id, loading, errorMessage]);

  return { ticket, loading, errorMessage };
};

export default useFetchTicketById;
