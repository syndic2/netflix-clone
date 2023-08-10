import { NextRequest, NextResponse } from 'next/server';

import prismaDb from '../../../lib/prisma-db';
import { Response } from '../../common/response';

export const GET = async (_: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const movieCount = await prismaDb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismaDb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    return NextResponse.json({
      status: true,
      message: null,
      data: randomMovies[0]
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
