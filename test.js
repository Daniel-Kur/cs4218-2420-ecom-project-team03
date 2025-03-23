import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log("Hash Error:", error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password Match:", isMatch);
    return isMatch;
  } catch (error) {
    console.log("Compare Error:", error);
  }
};

// Main function to run both
const run = async () => {
  const plainPassword = "password123";
  const hashed = await hashPassword(plainPassword);

  // Replace with actual hashed value to test
  await comparePassword(plainPassword, hashed);

  // OR: compare against a fixed hash
  await comparePassword(plainPassword, "$2b$10$tdgRbFM50uuEEIw8rHChgeUOfyHUQjthtQRO0FBoeXS0JjpFjcgE.");
};

run();
