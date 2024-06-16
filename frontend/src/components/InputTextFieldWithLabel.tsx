import { Grid, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

const InputTextFieldWithLabel = ({
  label,
  name,
  value,
  setValue,
  register,
  type,
  error,
  helperText = "",
  inputType = "value-based",
}: {
  label: string;
  name: string;
  error: boolean;
  type?: string;
  helperText?: string | null;
  value?: any;
  setValue?: any;
  register?: UseFormRegister<any>;
  inputType?: "value-based" | "register-based";
}) => {
  return (
    <Grid container direction="column" rowGap={0.5}>
      <Grid item>
        <Typography
          variant="caption"
          sx={{
            color: error ? "#d32f2f" : "#6a6a6a",
            fontSize: "12px",
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item>
        {inputType === "value-based" ? (
          <input
            type={type || "text"}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              border: error ? "1px solid #d32f2f" : "1px solid #6a6a6a",
              borderRadius: "8px",
              padding: "8px",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "14px",
            }}
          />
        ) : register && inputType === "register-based" ? (
          <input
            type={type || "text"}
            defaultValue={value}
            {...register(name, {
              required: true,
            })}
            style={{
              width: "100%",
              border: error ? "1px solid #d32f2f" : "1px solid #6a6a6a",
              borderRadius: "8px",
              padding: "8px",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "14px",
              wordBreak: "break-word",
            }}
          />
        ) : null}
        {error && (
          <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
            {helperText}
          </p>
        )}
      </Grid>
    </Grid>
  );
};

export default InputTextFieldWithLabel;
