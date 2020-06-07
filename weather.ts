import {
  endOfTomorrow,
  isBefore,
  parse,
} from "https://deno.land/x/date_fns/index.js";

export const getWeather = async () => {
  const table = <RawEntry[]> (await (await fetch(
    "https://www.ilmatieteenlaitos.fi/api/weather/forecasts?place=Laaksolahti&area=Espoo",
  )).json()).table;
  const endDt = endOfTomorrow();
  return table.map((entry) => ({
    precipitation: entry.Precipitation1h,
    probability: entry.PoP,
    temperature: entry.Temperature,
    time: parse(entry.localtime, "yyyyMMdd'T'HHmmss", new Date(), {}),
  })).filter(({ time }) => (
    isBefore(time, endDt)
  ));
};

export type RawEntry = {
  localtime: string;
  Precipitation1h: number;
  PoP: number;
  Temperature: number;
};

export type MappedEntry = {
  time: Date;
  temperature: number;
  precipitation: number;
  probability: number;
};
