import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// Form
import { useForm } from "react-hook-form";
import Socials from "../components/Socials";
import { useUserAuth } from "context/contextManager";
import { Avatar } from "@mui/material";

function SignUp() {
  const [error, setError] = useState("");
  const [foto, setFoto] = useState();
  const [miArchivo, setMiArchivo] = useState();
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "jaki",
      email: "jaki@gmail.com",
      password: "lolito123",
    },
  });

  const handleImg = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFoto(URL.createObjectURL(selectedFile));
      setMiArchivo(selectedFile);
    }
  };
  const onSubmitLogin = async (data) => {
    const { username, email, password } = data; // Assuming "avatar" is the avatar input from your form
    console.log({ data, miArchivo });
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (miArchivo) {
        formData.append("avatar", miArchivo);
      } // Append the avatar to the FormData

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/signup`, {
        method: "POST",
        body: formData,
      });

      const solution = await response.json();
      // console.log({ solution });

      if (solution.error) {
        setError(solution.error);
        return;
      }

      login(solution.user);
      navigate("/perfil");
    } catch (e) {
      console.error({ e });
    }
  };

  return (
    <BasicLayout
      title="Desbloquea tu Potencial Financiero"
      description="Únete a Nuestra Comunidad y Aprende a Maximizar tus Recursos."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Registrate con
          </SoftTypography>
        </SoftBox>
        <Socials />
        <Separator />
        <SoftBox pt={2} pb={2} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmitLogin)}>
            <SoftBox mb={2}>
              <SoftInput
                {...register("username", { required: "Por favor, completa este campo." })}
                type="text"
                placeholder="Username"
                label="Nombre de usuario."
              />
              <SoftTypography variant="caption" color="text" fontWeight="regular">
                {errors.username?.message}
              </SoftTypography>
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="email"
                {...register("email", { required: "Por favor, completa este campo." })}
                placeholder="Email"
                label="Correo Electrónico"
              />
              <SoftTypography variant="caption" color="text" fontWeight="regular">
                {errors.email?.message}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                {...register("password", {
                  required: "Por favor, completa este campo.",
                  minLenght: { value: 4, message: "¡Cuatro o más letras, por favor!" },
                })}
                placeholder="Password"
                label="Contraseña"
              />
              <SoftTypography variant="caption" color="text" fontWeight="regular">
                {errors.password?.message}
              </SoftTypography>
            </SoftBox>

            {foto && (
              <Avatar
                alt="foto de perfil"
                src={foto}
                sx={{ width: 90, height: 90, margin: "0 auto" }}
              />
            )}

            <SoftBox mt={foto && 1.4} mb={1.5}>
              <SoftButton variant="outlined" component="label" color="primary" fullWidth>
                {" "}
                Subir foto de perfil
                <input
                  type="file"
                  // {...register("file")}
                  name="file"
                  accept="image/*"
                  hidden
                  style={{ width: "100%" }}
                  onChange={handleImg}
                />
              </SoftButton>
            </SoftBox>

            <SoftBox mt={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Crea tu cuenta
              </SoftButton>
            </SoftBox>
            <SoftBox mt={2}>
              <SoftTypography
                variant="subtitle2"
                color="text"
                textAlign="center"
                fontWeight="regular"
              >
                {error}
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                ¿Ya eres miembro? &nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Inicia sesión.
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
