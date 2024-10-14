import { PrismaClient } from "@prisma/client";

//export const db = createPrismaClient();
/* 
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({});
  }
  return globalThis.prismaClient;
} */

export const db = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prisma = db;

//import { PrismaClient } from "@prisma/client";
//export const db = new PrismaClient();
