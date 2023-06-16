// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Infleta from "./components/infleta/Infleta";
import useInflacion from "hooks/useInflacion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { convertDate } from "../../utils/convertDate";
import Results from "../comparador/components/Results";

//Utils

function Dashboard() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;

  const { inflacionMensual, inflacionAnual } = useInflacion();

  // // console.log({ hoy: inflacionAnual.valor });
  // useEffect(() => {
  //   // const getData = async () => {
  //   //   const res = await fetch("http://localhost:5000/api/inflacion/anual");
  //   //   const res2 =
  //   // };
  //   inflacionMensual.fecha &&
  //     console.log({ inflacionMensual: convertDate(inflacionMensual.fecha) });
  // }, [inflacionMensual, inflacionAnual]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* <SoftBox mb={3}> */}
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={7}>
              <Infleta />
            </Grid>
            <Grid item xs={12} xl={5}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                gap={1.5}
              >
                <MiniStatisticsCard
                  title={{ text: "Inflación mensual oficial" }}
                  count={`${inflacionMensual.valor}%`}
                  bgColor="dark"
                  percentage={{
                    color: "success",
                    text: inflacionMensual.fecha && `${convertDate(inflacionMensual.fecha)}`,
                  }}
                  icon={{ color: "info", component: "data_thresholding" }}
                />
                <MiniStatisticsCard
                  title={{ text: "Inflación esperada oficial" }}
                  count={`${inflacionAnual.valor}%`}
                  bgColor="dark"
                  percentage={{
                    color: "success",
                    text: inflacionAnual.fecha && `${convertDate(inflacionAnual.fecha)}`,
                  }}
                  icon={{ color: "info", component: "query_stats" }}
                />
                <WorkWithTheRockets
                  titulo="Actualidad Financiera"
                  altura="60%"
                  desc="Mejoramos tu experiencia financiera con datos actualizados del Banco Central de la República Argentina para un servicio moderno y sencillo."
                />
              </Box>
            </Grid>
          </Grid>
        {/* </SoftBox> */}
      </SoftBox>

      <Results />
      {/* </SoftBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

{
  /* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox> */
}
{
  /* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */
}
{
  /* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox> */
}
{
  /* <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid> */
}
