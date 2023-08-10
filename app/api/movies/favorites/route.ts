import { NextRequest, NextResponse } from "next/server";

import prismaDb from '../../../lib/prisma-db';
import serverAuth from '../../../lib/server-auth';
import { Response } from '../../common/response';

import { AddFavoriteMovieBody } from './contracts/add-favorite-movie.body';

export const GET = async (request: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const { currentUser } = await serverAuth();
    if (!currentUser.email) return NextResponse.json({
      status: false,
      message: "Current user email not defined",
      data: null
    }, { status: 401 });

    const favoriteMovies = await prismaDb.movie.findMany({
      where: {
        id: {
          in: currentUser.favorite_ids
        }
      }
    })

    return NextResponse.json({
      status: true,
      message: null,
      data: favoriteMovies
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
      data: null
    }, { status: 500 });
  }
}

export const POST = async (request: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const { currentUser } = await serverAuth();
    const body: AddFavoriteMovieBody = await request.json();
    const { movie_id } = body;

    if (!currentUser.email) return NextResponse.json({
      status: false,
      message: "Current user email not defined",
      data: null
    }, { status: 401 });
    if (!movie_id) return NextResponse.json({
      status: false,
      message: "Movie's ID is required",
      data: null
    }, { status: 400 });

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

    const updatedUser = await prismaDb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movie_id
        }
      }
    });

    return NextResponse.json({
      status: true,
      message: `Movie's ${movie_id} has been successfully saved as favorite`,
      data: updatedUser
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

