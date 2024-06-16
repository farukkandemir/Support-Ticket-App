import { formatDistanceToNow } from "date-fns";
import { Ticket } from "../context/TicketsProvider";

export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sortTicketsByDate = (tickets: Ticket[]) => {
  return tickets.sort((a, b) => {
    return (
      new Date(b.createdAt || new Date()).getTime() -
      new Date(a.createdAt || new Date()).getTime()
    );
  });
};

export const getRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const apiCallToServer = async ({
  path,
  method,
  data,
  setError,
  callback,
}: {
  path: string;
  method: string;
  data?: object;
  setError?: Function;
  callback?: Function;
}) => {
  const jsonStringifyBody =
    method === "POST" || method === "PUT" ? { body: JSON.stringify(data) } : {};

  return await fetch(`http://localhost:5000/api/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...jsonStringifyBody,
  })
    .then(async (response) => {
      if (!callback) {
        return null;
      }

      if (!response.ok && setError) {
        const errorMessage = await response.text();
        return setError(errorMessage);
      }

      const responseJson = await response.json();
      const { error } = responseJson || {};

      if (error && setError) {
        return setError(error);
      }

      if (callback) {
        return callback(responseJson);
      }

      return null;
    })
    .catch((e) => {
      console.log("api error: ", e);

      return { error: true };
    });
};
