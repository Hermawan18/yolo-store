import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Verify } from './db/helpers/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.url.includes('/api/products')) {
    const token = cookies().get('token');
    if (!token) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }
    const tokenPayload = await Verify<{ _id: string; email: string }>(token.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', tokenPayload._id);
    requestHeaders.set('x-user-email', tokenPayload.email);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  if (request.url.includes('/api/wishlist')) {
    const token = cookies().get('token');
    if (!token) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }
    const tokenPayload = await Verify<{ _id: string; email: string }>(token.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', tokenPayload._id);
    requestHeaders.set('x-user-email', tokenPayload.email);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }
}
