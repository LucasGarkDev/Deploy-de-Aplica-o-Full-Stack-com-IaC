import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error", "warn"], // útil em dev
});

export default prisma;
