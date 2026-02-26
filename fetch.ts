import { writeFileSync } from "node:fs";
import process from "node:process";
import { styleText } from "node:util";
import { Data } from "./types";

const ENDPOINT = "https://coinkeeper.me/api/transaction/get";

function exitWithError(error: unknown): never {
  if (error instanceof Error) {
    console.error(styleText("red", error.message));
  } else {
    const string = typeof error === "string" ? error : JSON.stringify(error);
    console.error(styleText("red", string));
  }
  process.exit(1);
}

async function fetchTransactions(cookie: string): Promise<Data> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: `__AUTH_cookie=${cookie}` },
    body: JSON.stringify({ take: 10_000 })
  });
  if (!response.ok) exitWithError(response.statusText);
  return response.json() as Promise<Data>;
}

async function writeTransactionsToFile(data: unknown): Promise<void> {
  try {
    writeFileSync("./dump.json", JSON.stringify(data, null, 2), "utf-8");
    console.info(styleText("green", "Written to dump.json"));
  } catch (error) {
    exitWithError(error);
  }
}

async function main(): Promise<void> {
  const { COOKIE } = process.env;
  if (!COOKIE) exitWithError("Cookie not set");

  const data = await fetchTransactions(COOKIE);
  if (!data) exitWithError("No data received");
  console.info(styleText("green", "Fetched transactions successfully"));
  console.info({
    transactions: data.transactions.length,
    importedTransactions: data.importedTransactions.length,
    hasMoreData: data.hasMoreData
  });
  await writeTransactionsToFile(data);
}

main();
