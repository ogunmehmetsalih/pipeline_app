const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({ url: "redis://redis:6379" });

client.connect().catch(console.error);

app.get("/", async (req, res) => {
  let visits = await client.get("visits");
  visits = visits ? parseInt(visits) + 1 : 1;
  await client.set("visits", visits);
  res.send(`Ziyaret sayısı: ${visits} — bu güncelleme CI/CD ile geldi!`);
});

app.listen(3000, () => {
  console.log("Web app çalışıyor: http://localhost:3000");
});

