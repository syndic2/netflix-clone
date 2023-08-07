import { NextRequest, NextResponse } from 'next/server';

import serverAuth from '../../lib/server-auth';
import { Response } from '../common/response';

export const GET = async (_: NextRequest): Promise<NextResponse<Response>> => {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json({
      status: true,
      message: null,
      data: currentUser
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

