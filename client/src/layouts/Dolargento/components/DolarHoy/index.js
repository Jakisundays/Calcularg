import React from "react";
import { ReactComponent as Finance } from "../../../../assets/images/finance_isometric2.svg";
import { Grid, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
const DolarHoy = () => {
  return (
    <SoftBox p={1} sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <SoftBox
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
              width: "100%",
            }}
          >
            <SoftTypography variant="h2" color="light" align="center" fontWeight="bold">
              Dólar en movimiento
            </SoftTypography>
            <SoftBox p={2}>
              <SoftTypography variant="body2" color="white" align="center">
                El dólar nunca descansa, y nosotros tampoco. Con Dólar en Movimiento, mantente al
                tanto de cada fluctuación y toma decisiones financieras informadas.
              </SoftTypography>
            </SoftBox>
            <SoftTypography
              component="a"
              href="https://www.bna.com.ar/Personas"
              target="_blank"
              variant="button"
              color="light"
              fontWeight="medium"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translate(2px, -0.5px)`,
                  transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                },

                "&:hover .material-icons-round, &:focus  .material-icons-round": {
                  transform: `translate(6px, -0.5px)`,
                },
              }}
            >
              Mas detalles
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            objectFit: "contain",
            width: "100%",
          }}
        >
          <SoftBox p={1}>
            <Finance width={"100%"} />
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
};

export default DolarHoy;
