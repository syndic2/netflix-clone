import { NextRequest, NextResponse } from "next/server";
import { without } from 'lodash';

import prismaDb from '../../../../lib/prisma-db';
import serverAuth from '../../../../lib/server-auth';
import { Response } from '../../../common/response';

import { DeleteFavoriteMovieParam } from '../contracts/delete-favorite-movie.param';

export const DELETE = async (_: NextRequest, context: { params: DeleteFavoriteMovieParam }): Promise<NextResponse<Response>> => {
  try {
    const { currentUser } = await serverAuth();
    const { movie_id } = context.params;

    if (!currentUser.email) return NextResponse.json({
      status: false,
      message: "Current user email not defined",
      data: null
    }, { status: 401 });

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

    const updatedFavoriteIds = without(currentUser.favorite_ids, movie_id!);
    const updatedUser = await prismaDb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds
      }
    });

    return NextResponse.json({
      status: true,
      message: `Movie's ${movie_id} has been successfully remove from favorite`,
      data: updatedUser
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
