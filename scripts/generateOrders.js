import fs from "fs";

// Load user and product IDs from files
const rawUsers = JSON.parse(fs.readFileSync("cs4218_db.users.id.json", "utf8"));
const rawProducts = JSON.parse(fs.readFileSync("cs4218_db.products.id.json", "utf8"));

const userIds = rawUsers.map(u => u._id.$oid);
const productIds = rawProducts.map(p => p._id.$oid);

const heavyUser = userIds[0];
const mediumUser = userIds[5000];
const lightUser = userIds[9999];

const statuses = ["Not Process", "Processing", "Shipped", "deliverd", "cancel"];
const orders = [];

for (let i = 0; i < 100000; i++) {
  let buyer;
  if (i < 10000) {
    buyer = { "$oid": heavyUser }; // ObjectId format
  } else if (i < 11000) {
    buyer = { "$oid": mediumUser };
  } else if (i < 11100) {
    buyer = { "$oid": lightUser };
  } else {
    const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
    buyer = { "$oid": randomUser };
  }

  const product = { "$oid": productIds[i % productIds.length] };
  const status = statuses[i % statuses.length];

  orders.push({
    buyer,
    products: [product],
    payment: {},
    status,
  });
}

fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2), "utf8");
console.log("✅ orders.json generated with ObjectId buyer and product references");
console.log("medium :", mediumUser)
console.log("light ", lightUser)
