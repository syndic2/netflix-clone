import { NextRequest, NextResponse } from 'next/server';

import prismaDb from '@/app/lib/prisma-db';
import { Response } from '../common/response';

export const GET = async (_: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const movies = await prismaDb.movie.findMany();
    return NextResponse.json({
      status: true,
      message: null,
      data: movies
    }, { status: 200 });
  } catch (error: any) {
    console.error('error', error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
      data: null
    }, { status: 500 });
  }
};
