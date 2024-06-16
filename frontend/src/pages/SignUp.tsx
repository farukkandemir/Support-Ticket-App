import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import InputTextFieldWithLabel from "../components/InputTextFieldWithLabel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiCallToServer, capitalizeFirstLetter } from "../helpers/helpers";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const accountCreationSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z
    .string()
    .nullable()
    .refine(
      (role) => {
        if (role === null) {
          return false;
        }
        return true;
      },
      { message: "Role is required" }
    ),
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

  const { login } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);

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

  const onFormSubmit: SubmitHandler<AccountCreationFieldsType> = async (
    data
  ) => {
    setIsRegistering(true);

    const response = await apiCallToServer({
      method: "POST",
      path: "register",
      data,
      callback: (data: any) => data,
    });

    if (!response.success) {
      setIsRegistering(false);
      return toast.error(response.message);
    }

    login(response.token, response.user);

    toast.success("Account created successfully!");
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
                helperText={errors[field.name]?.message}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {["user", "admin"].map((role) => (
              <Box
                key={role}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="radio"
                  id={role}
                  {...register("role")}
                  value={role}
                />
                <label htmlFor={role}>{capitalizeFirstLetter(role)}</label>
              </Box>
            ))}
            {errors.role?.message && (
              <Typography color="error" variant="caption">
                {errors.role.message}
              </Typography>
            )}
          </Box>

          <Button type="submit" variant="contained">
            {isRegistering ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
