import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

// Form
import { useForm } from "react-hook-form";
import Socials from "../components/Socials";
import Separator from "../components/Separator";
import { useUserAuth } from "context/contextManager";

function SignIn() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "jaki",
      password: "lolito123",
    },
  });

  const { login } = useUserAuth();
  const navigate = useNavigate();

  const onSubmitSignUp = async (data) => {
    const { username, password } = data;
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const solution = await response.json();
      if (solution.error) {
        setError(solution.error);
        return;
      }
      login(solution.user);
      navigate("/perfil");
    } catch (e) {
      console.error({ error: e });
    }
  };

  return (
    <CoverLayout
      title="¡Qué alegría verte de nuevo!"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión en Calcularg."
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmitSignUp)}>
        <Socials color="primary" variant={"gradient"} />
        <Separator />
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          </SoftBox>
          <SoftInput
            {...register("username", { required: "Por favor, completa este campo." })}
            type="text"
            placeholder="Username"
            label="Username"
          />
          <SoftTypography variant="caption" color="text" fontWeight="regular">
            {errors.username?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="regular">
              {errors.email?.message}
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            label="Password"
            {...register("password", {
              required: "Por favor, completa este campo.",
              minLength: { value: 6, message: "¡6 o más letras, por favor!" },
            })}
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Iniciar sesión
          </SoftButton>
        </SoftBox>

        <SoftBox mt={2}>
          <SoftTypography variant="subtitle2" color="text" textAlign="center" fontWeight="regular">
            {error}
          </SoftTypography>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            ¿No tienes una cuenta? &nbsp;
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Registrate.
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
