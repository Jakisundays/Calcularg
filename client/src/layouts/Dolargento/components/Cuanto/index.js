import { Badge, Box, Divider, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import CountUp from "react-countup";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DolaresModal from "../DolaresModal";

const Cuanto = ({
  title,
  fecha,
  buy,
  sell,
  variation,
  info,
  spread,
  euro = false,
  real = false,
}) => {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const variationTwoDecimals = typeof variation === "number" ? variation.toFixed(2) : "N/A";

  return (
    <SoftBox
      color="white"
      bgColor={"dark"}
      variant="gradient"
      borderRadius="lg"
      shadow="lg"
      opacity={1}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "1.3rem",
      }}
    >
      <SoftBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton aria-label="exchange" onClick={() => setOpen(true)}>
          <CurrencyExchangeSharpIcon fontSize="medium" color="white" />
        </IconButton>
        <DolaresModal
          open={open}
          setOpen={setOpen}
          title={title}
          buy={buy}
          sell={sell}
          fecha={fecha}
          spread={spread}
          euro={euro}
          real={real}
        />

        <SoftBadge
          badgeContent={
            variationTwoDecimals > 0
              ? `⬆️  ${variationTwoDecimals}%`
              : variationTwoDecimals < 0
              ? `⬇️  ${variationTwoDecimals}%`
              : `↔️  ${variationTwoDecimals}`
          }
          size="md"
          variant="contained"
          color="light"
          container
        />

        <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
          <div>
            <Tooltip
              title={info ?? "Delete"}
              PopperProps={{
                disablePortal: true,
              }}
              placement="right-end"
              open={tooltipOpen}
              onClose={() => setTooltipOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <IconButton onClick={() => setTooltipOpen(true)}>
                <InfoIcon fontSize="medium" color="white" />
              </IconButton>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </SoftBox>
      <SoftBox
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-evely", width: "100%" }}
      >
        {buy && (
          <SoftBox
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <SoftTypography variant="h6" color="white">
              Compra
            </SoftTypography>
            <SoftTypography variant="body2" color="white">
              ${" "}
              <CountUp
                end={buy}
                decimals={2}
                duration={1.7}
                separator=","
                style={{ color: "white" }}
              />
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <SoftTypography variant={buy ? "h6" : "h5"} color="white">
            Venta
          </SoftTypography>
          <SoftTypography variant={buy ? "body2" : "body1"} color="white">
            ${" "}
            <CountUp
              end={sell}
              decimals={2}
              duration={1.7}
              separator=","
              style={{ color: "white" }}
            />
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftTypography
        variant="h4"
        color="white"
        fontWeight="bold"
        textTransform={"capitalize"}
        textAlign="center"
      >
        {title}
      </SoftTypography>
    </SoftBox>
  );
};

Cuanto.propTypes = {
  title: PropTypes.string,
  fecha: PropTypes.string,
  buy: PropTypes.number,
  sell: PropTypes.number,
  variation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.string,
  spread: PropTypes.string,
  euro: PropTypes.bool,
  real: PropTypes.bool,
};

export default Cuanto;
