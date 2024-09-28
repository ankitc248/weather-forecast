import { useUnit } from "../UnitProvider";
import CountUp from "react-countup";

// Conversion helpers
const milesToKilometers = (miles) => (miles * 1.60934).toFixed(1);
const mphToKph = (mph) => (mph * 1.60934).toFixed(1);
const fahrenheitToCelsius = (fahrenheit) =>
  (((fahrenheit - 32) * 5) / 9).toFixed(1);
const inHgToMb = (inHg) => (inHg * 33.8639).toFixed(1);
const inchesToMm = (inches) => (inches * 25.4).toFixed(1);

export default function UnitBlock({
  className = "",
  type,
  value,
  defaultUnit = "imperial",
  unitClassName = "",
}) {
  const { unit } = useUnit();

  // Determine the unit symbol based on type and unit
  let unitSymbol = "";
  if (unit === "imperial") {
    if (type === "temperature") unitSymbol = "°F";
    else if (type === "speed") unitSymbol = "mi/h";
    else if (type === "distance") unitSymbol = "mi";
    else if (type === "pressure") unitSymbol = "inHg";
    else if (type === "precipitation") unitSymbol = "in";
  } else {
    if (type === "temperature") unitSymbol = "°C";
    else if (type === "speed") unitSymbol = "km/h";
    else if (type === "distance") unitSymbol = "km";
    else if (type === "pressure") unitSymbol = "mb";
    else if (type === "precipitation") unitSymbol = "mm";
  }

  // Perform conversions if the current unit doesn't match the default unit
  if (unit !== defaultUnit) {
    if (type === "temperature") {
      value = fahrenheitToCelsius(value);
    } else if (type === "speed") {
      value = mphToKph(value);
    } else if (type === "distance") {
      value = milesToKilometers(value);
    } else if (type === "pressure") {
      value = inHgToMb(value);
    } else if (type === "precipitation") {
      value = inchesToMm(value);
    }
  }
  return (
    <span className={className}>
      <CountUp start={0} end={value} duration={1} decimals={1} />{" "}
      <span className={unitClassName}>{unitSymbol}</span>
    </span>
  );
}
