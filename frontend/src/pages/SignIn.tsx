import { Box, Button, Container, Typography } from "@mui/material";
import InputTextFieldWithLabel from "../components/InputTextFieldWithLabel";
import { useForm } from "react-hook-form";
import { apiCallToServer } from "../helpers/helpers";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onFormSubmit = async (data: any) => {
    const response = await apiCallToServer({
      method: "POST",
      path: "login",
      data,
      callback: (data: any) => data,
    });

    if (!response.success) {
      return toast.error(response.message);
    }

    login(response.token, response.user);

    return toast.success("Logged in successfully!");
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
          <Typography variant="h4">Sign In</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <InputTextFieldWithLabel
              label="Email"
              name="email"
              inputType="register-based"
              register={register}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <InputTextFieldWithLabel
              type="password"
              label="Password"
              name="password"
              inputType="register-based"
              register={register}
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
            <Button variant="contained" type="submit">
              Sign In
            </Button>

            <Button
              variant="text"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
