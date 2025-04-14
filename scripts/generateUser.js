import fs from "fs";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const plainPassword = "password123";
const hashedAnswer = await bcrypt.hash(plainPassword, 10)

const count = 100000;
const header = "name,email,password,phone,address,answer,role";
const rows = [header];

for (let i = 0; i < count; i++) {
  const role = Math.random() < 0.9 ? 0 : 1; // 10% admins, 90% users
  rows.push(
    `"${faker.person.fullName()}","user${i}@example.com","${hashedAnswer}","08${Math.floor(1000000000 + Math.random() * 900000000)}","${faker.location.city()}","${plainPassword}",${role}`
  );
}

fs.writeFileSync("users.csv", rows.join("\n"), "utf8");
console.log("✅ CSV file created: users.csv");
