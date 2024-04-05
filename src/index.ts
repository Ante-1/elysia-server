import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(staticPlugin())
  .get("/", Bun.file("src/index.html"))
  .get("/data", getData)
  .listen(80);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

async function getData(): Promise<Result> {
  const dieselSeries: HighchartsSeries = [];
  const superSeries: HighchartsSeries = [];
  const superPlusSeries: HighchartsSeries = [];
  const e10Series: HighchartsSeries = [];

  const gasPricesFile = Bun.file("/home/ubuntu/gas-prices.json");
  const data: Data[] = await gasPricesFile.json();

  for (const price of data) {
    dieselSeries.push([price.timestamp, price.diesel]);
    superSeries.push([price.timestamp, price.super]);
    superPlusSeries.push([price.timestamp, price.superPlus]);
    e10Series.push([price.timestamp, price.e10]);
  }

  return [
    { name: "Diesel", data: dieselSeries },
    { name: "Super", data: superSeries },
    { name: "Super Plus", data: superPlusSeries },
    { name: "E10", data: e10Series },
  ];
}

type Data = {
  diesel: number;
  super: number;
  superPlus: number;
  e10: number;
  timestamp: number;
};
type HighchartsSeries = [number, number][];
type Result = { name: string; data: HighchartsSeries }[];
