import { Box, Button, Container, Typography } from "@mui/material";
import InputTextFieldWithLabel from "../components/InputTextFieldWithLabel";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              // helperText={errors.email?.message}
              helperText={"Email is required"}
            />
            <InputTextFieldWithLabel
              type="password"
              label="Password"
              name="password"
              inputType="register-based"
              register={register}
              error={!!errors.password}
              // helperText={errors.password?.message}
              helperText={"Password is required"}
            />
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
