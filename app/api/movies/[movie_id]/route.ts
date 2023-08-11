import { NextRequest, NextResponse } from 'next/server';

import prismaDb from '../../../lib/prisma-db';
import { Response } from '../../common/response';
import { GetMovieParam } from '../contracts/get-movie.param';

export const GET = async (_: NextRequest, context: { params: GetMovieParam }): Promise<NextResponse<Response>> => {
  try {
    const { movie_id } = context.params;

    const movie = await prismaDb.movie.findUnique({
      where: {
        id: movie_id
      }
    });
    if (!movie) return NextResponse.json({
      status: false,
      message: "Movie not found",
      data: null
    }, { status: 404 });

    return NextResponse.json({
      status: true,
      message: null,
      data: movie
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
      data: null
    }, { status: 500 });
  }
};
