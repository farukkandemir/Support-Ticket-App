import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputTextFieldWithLabel from "../components/InputTextFieldWithLabel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const accountCreationSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  // add role field to be either "user" or "admin"
});

type AccountCreationFieldsType = z.infer<typeof accountCreationSchema>;

type AccountCreationField = {
  label: string;
  name: keyof AccountCreationFieldsType;
  type: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCreationFieldsType>({
    resolver: zodResolver(accountCreationSchema),
  });

  const accountCreationField: AccountCreationField[] = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  const onFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "grid",
        placeItems: "center",
        gap: "1rem",
        height: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
          }}
        >
          <Typography variant="h4">Sign Up</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {accountCreationField.map((field) => (
              <InputTextFieldWithLabel
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                inputType="register-based"
                register={register}
                error={!!errors[field.name]}
                helperText={`${field.label} is required`}
              />
            ))}
          </Box>

          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
