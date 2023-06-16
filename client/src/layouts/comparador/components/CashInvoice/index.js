import React from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const CashInvoice = ({ date, price, noGutter }) => {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 0.4}
    >
      <SoftBox lineHeight={1}>
        <SoftTypography display="block" variant="button" fontWeight="medium">
          {date}
        </SoftTypography>
      </SoftBox>
      <SoftBox display="flex" alignItems="center">
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {price}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
};

CashInvoice.defaultProps = {
  noGutter: false,
};

CashInvoice.propTypes = {
  date: PropTypes.string,
  price: PropTypes.string,
  noGutter: PropTypes.bool,
};

export default CashInvoice;
