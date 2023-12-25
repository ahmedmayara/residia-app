import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/prisma";
import { SignUpSchema } from "@/schemas";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = SignUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      result.error.issues.map((i) => {
        return {
          message: i.message,
        };
      }),
      { status: 400 },
    );
  }

  const { name, email, password } = result.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "This email is already in use. Please try another." },
      { status: 400 },
    );
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
