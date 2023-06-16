import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function OutlinedCounterCard({ color, count, title, prefix, suffix, pad, cap }) {
  const { secondary } = colors;
  const { borderWidth } = borders;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust this value to change when the component becomes visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      <SoftBox
        borderRadius="md"
        border={`${borderWidth[1]} dashed ${secondary.main}`}
        textAlign="center"
        py={pad ?? 2}
      >
        <SoftTypography
          variant="h6"
          color={color}
          fontWeight="medium"
          textTransform={cap ? "capitalize" : "none"}
        >
          {title}
        </SoftTypography>
        <SoftTypography variant="h4" fontWeight="bold">
          {prefix && (
            <SoftTypography component="span" variant="h5" fontWeight="bold">
              {prefix}
            </SoftTypography>
          )}
          <SoftBox display="inline-block" mx={0.5}>
            {isVisible && <CountUp end={count} duration={3} separator="," />}
          </SoftBox>
          {suffix && (
            <SoftTypography component="span" variant="h5" fontWeight="bold">
              {suffix}
            </SoftTypography>
          )}
        </SoftTypography>
      </SoftBox>
    </div>
  );
}

OutlinedCounterCard.defaultProps = {
  color: "info",
  prefix: "",
  suffix: "",
};

OutlinedCounterCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  pad: PropTypes.number,
  cap: PropTypes.bool,
};

export default OutlinedCounterCard;
