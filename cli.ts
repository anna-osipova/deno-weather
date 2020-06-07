import {
  getHours,
  format,
} from "https://deno.land/x/date_fns/index.js";
import iro, {
  bgBlue,
  bgCyan,
  white,
  grey,
  yellow,
  red,
} from "https://deno.land/x/iro/src/iro.ts";
import { getWeather, MappedEntry } from "./weather.ts";

const formatTemperature = (temperature: number): string => {
  const temperatureStr = `${temperature} C`;
  if (temperature >= 22) return iro(temperatureStr, red);
  if (temperature >= 18) return iro(temperatureStr, yellow);
  return iro(temperatureStr, white);
};

const formatLine = (entry: MappedEntry) => {
  const formattedTime = iro(
    format(entry.time, "E HH a", null),
    getHours(entry.time) < 7 ? grey : white,
  );
  const formattedTemp = formatTemperature(entry.temperature);
  if (entry.precipitation > 0.1) {
    return `${formattedTime} ${
      iro(`${entry.probability}% ${entry.precipitation}mm`, bgBlue)
    } ${formattedTemp}`;
  }
  if (entry.precipitation > 0) {
    return `${formattedTime} ${
      iro(`${entry.probability}% ${entry.precipitation}mm`, bgCyan, grey)
    } ${formattedTemp}`;
  }
  return `${formattedTime}           ${formattedTemp}`;
};

(async () => {
  const beforeEndDt: MappedEntry[] = await getWeather();
  beforeEndDt.map((entry) => {
    console.log(formatLine(entry));
  });
  console.log("");
})();
