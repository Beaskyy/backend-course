import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({
      status: "success",
      data: {
        id: user.id,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      error: "Registration failed",
      details: {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        meta: error?.meta,
      },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  return res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      email,
    },
  });
}

export { register, login };
