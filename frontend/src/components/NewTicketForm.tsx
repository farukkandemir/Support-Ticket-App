import { Backdrop, Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import InputTextFieldWithLabel from "./InputTextFieldWithLabel";
import { useTickets } from "../context/TicketsProvider";
import { generateSixDigitCode } from "../helpers/helpers";

const newTicketSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
});

type NewTicketFieldsType = z.infer<typeof newTicketSchema>;

type FieldName = keyof NewTicketFieldsType;

type NewTicketArrayFields = {
  label: string;
  name: FieldName;
};

const NewTicketForm = ({
  openNewTicketModal,
  closeNewTicketForm,
}: {
  openNewTicketModal: boolean;
  closeNewTicketForm: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTicketFieldsType>({
    resolver: zodResolver(newTicketSchema),
  });

  const { createTicket } = useTickets();

  const newTicketFields: NewTicketArrayFields[] = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Subject",
      name: "subject",
    },
    {
      label: "Description",
      name: "description",
    },
    {
      label: "Priority",
      name: "priority",
    },
  ];

  const onFormSubmit: SubmitHandler<NewTicketFieldsType> = async (ticket) => {
    const newTicket = {
      ...ticket,
      id: generateSixDigitCode(),
      status: "new",
    };

    await createTicket(newTicket);
    return closeNewTicketForm();
  };

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openNewTicketModal}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 400,
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          New Ticket Form
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {newTicketFields.map((field) => (
              <Box key={field.name}>
                <InputTextFieldWithLabel
                  inputType="register-based"
                  label={field.label}
                  type="text"
                  name={field.name}
                  register={register}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              </Box>
            ))}

            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Backdrop>
  );
};

export default NewTicketForm;
