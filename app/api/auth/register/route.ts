import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import prismaDb from '../../../lib/prisma-db';
import { Response } from '../../common/response';
import { RegisterBody } from './contracts/register.body';

const validate = (data: RegisterBody): Response => {
  const { name, email, password } = data;

  if (!name) return {
    status: false,
    message: "Username is required",
    data: null,
    errors: {
      name: "Username is required"
    }
  };
  else if (!email) return {
    status: false,
    message: "Email is required",
    data: null,
    errors: {
      email: "Email is required"
    }
  };
  else if (!password) return {
    status: false,
    message: "Password is required",
    data: null,
    errors: {
      password: "Password is required"
    }
  };

  return {
    status: true,
    message: null,
    data: null
  };
};

export const POST = async (request: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const body: RegisterBody = await request.json();
    const { name, email, password } = body;

    const validateResult = validate(body);
    if (!validateResult.status) return NextResponse.json(validateResult, { status: 400 });

    const existingUser = await prismaDb.user.findUnique({
      where: { email }
    });
    if (existingUser) return NextResponse.json({
      status: false,
      data: null,
      message: "Email taken",
      errors: {
        email: "Email taken"
      }
    }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password!, 12);
    const insertedUser = await prismaDb.user.create({
      data: {
        name: name!,
        email,
        hashedPassword,
        emailVerifiedAt: new Date()
      }
    });

    return NextResponse.json({
      status: true,
      data: insertedUser,
      message: "Account has been created successfully!"
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      data: null,
      message: "Internal Server Error"
    }, { status: 500 });
  }
};
