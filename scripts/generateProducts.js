import fs from "fs";
import { faker } from "@faker-js/faker";

// Load category IDs from the exported JSON file
const rawCategoryData = JSON.parse(fs.readFileSync("cs4218_db.categories.id.json", "utf8"));

// Extract ObjectId strings
const categoryIds = rawCategoryData.map(cat => cat._id.$oid);

const products = [];

for (let i = 0; i < 10000; i++) {
    const categoryId = categoryIds[i % categoryIds.length];
    products.push({
      name: `Product ${i}`,
      slug: `product-${i}`,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price(10, 1000)),
      quantity: Math.floor(Math.random() * 100),
      shipping: Math.random() > 0.5,
      category: { "$oid": categoryId }, // ✅ wrap in $oid
    });
  }
  

fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf8");
console.log("✅ products.json generated with real category IDs");
