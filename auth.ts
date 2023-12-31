import { db } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.password as string,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
