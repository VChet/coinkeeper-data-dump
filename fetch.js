const { writeFileSync } = require("fs");

async function fetchTransactions () {
  try {
    const response = await fetch("https://coinkeeper.me/api/transaction/get", {
      method: "POST",
      headers: {
        cookie: JSON.stringify(process.env.COOKIE),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ take: 10_000 }),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    process.exit(1);
  }
}

async function writeTransactionsToFile (data) {
  try {
    writeFileSync("./dump.json", JSON.stringify(data, null, 2), "utf-8");
    console.info("Written to dump.json");
  } catch (error) {
    console.error("Error writing to file:", error);
    process.exit(1);
  }
}

const main = async () => {
  if (!process.env.COOKIE) {
    console.error("Cookie not set");
    process.exit(1);
  }

  const data = await fetchTransactions();
  if (!data) {
    console.error("Error fetching transactions");
    process.exit(1);
  }

  console.info("Result:", {
    transactions: data.transactions.length,
    importedTransactions: data.importedTransactions.length,
    hasMoreData: data.hasMoreData,
  });
  await writeTransactionsToFile(data);
};

main();
