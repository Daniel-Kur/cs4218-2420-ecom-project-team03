import fs from "fs";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Books", slug: "books" },
  { name: "Clothing", slug: "clothing" },
  { name: "Home Appliances", slug: "home-appliances" },
  { name: "Toys", slug: "toys" },
  { name: "Furniture", slug: "furniture" },
  { name: "Sports", slug: "sports" },
  { name: "Beauty", slug: "beauty" },
  { name: "Automotive", slug: "automotive" },
  { name: "Groceries", slug: "groceries" },
];

fs.writeFileSync("categories.json", JSON.stringify(categories, null, 2), "utf8");
console.log("✅ categories.json generated");
