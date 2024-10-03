import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(email);

  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  else if (!email.includes("@"))
    return NextResponse.json(
      {
        message: "invalid email",
      },
      {
        status: 400,
      }
    );

  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "user already exists",
        },
        {
          status: 400,
        }
      );

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullname,
      email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json({
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
  }
}
