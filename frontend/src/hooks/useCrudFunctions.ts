import toast from "react-hot-toast";
import { Ticket } from "../context/TicketsProvider";
import { apiCallToServer } from "../helpers/helpers";

const useCrudFunctions = ({
  setTickets,
}: {
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}) => {
  const createTicket = async (newTicket: Ticket) => {
    const response = await apiCallToServer({
      method: "POST",
      path: "tickets/create-ticket",
      data: newTicket,
      callback: (res: any) => res,
    });

    if (!response.success) {
      return toast.error(response.message || "Failed to create ticket!");
    }

    setTickets((prevTickets) => [newTicket, ...prevTickets]);
    return toast.success(response.message || "Ticket created successfully!");
  };

  const onDelete = async (ticketId: number) => {
    const response = await apiCallToServer({
      method: "DELETE",
      path: `tickets/delete-ticket/${ticketId}`,
      callback: (res: any) => res,
    });
    if (!response.success) {
      return toast.error(response.message || "Failed to delete ticket!");
    }

    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== ticketId)
    );

    return toast.success(response.message || "Ticket deleted successfully!");
  };

  const updateStatus = async ({
    ticketId,
    status,
  }: {
    ticketId: number;
    status: string;
  }) => {
    const response = await apiCallToServer({
      method: "PUT",
      path: `tickets/update-ticket-status/${ticketId}`,
      data: { status },
      callback: (res: any) => res,
    });

    if (!response.success) {
      toast.error(response.message || "Failed to update ticket status!");
      return {
        success: false,
      };
    }

    toast.success(response.message || "Ticket status updated successfully!");

    return {
      success: true,
      data: response.data,
    };
  };

  return {
    createTicket,
    onDelete,
    updateStatus,
  };
};

export default useCrudFunctions;
