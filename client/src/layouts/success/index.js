import { Box, Grid, LinearProgress } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useUserAuth } from "context/contextManager";
import BuildByDevelopers from "examples/Cards/MessageCard";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/users/auth/success/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const user = await response.json();
        // login(user);
        // navigate("/perfil");
      } catch (error) {
        console.error({ error });
      }
    };
    handleAuth();
  }, []);

  return (
    <DashboardLayout>
      <Box
        pt={8}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <SoftTypography variant="h2" align="center" mb={6}>
          🚀 ¡Redirigiendo! Tu perfil está por verse.
        </SoftTypography>
        <LinearProgress />
      </Box>
    </DashboardLayout>
  );
};

export default Success;
