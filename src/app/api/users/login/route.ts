import { getUserByEmail } from '@/db/models/user';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { Sign } from '@/db/helpers/jwt';
import { FormDataLogin } from '@/types';

export async function POST(request: Request) {
  const data: FormDataLogin = await request.json();

  const parsedData = z
    .object({
      email: z.string().email({ message: 'Format email is wrong' }),
      password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
    })
    .safeParse(data);

  if (!parsedData.success) {
    return Response.json(
      {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        code: parsedData.error.issues[0].code,
        message: parsedData.error.issues[0].message,
      },
      {
        status: 401,
      }
    );
  }

  const user = await getUserByEmail(data.email);

  if (!user || !bcrypt.compareSync(data.password, user.password)) {
    return Response.json(
      {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        message: 'Invalid payload',
        error: 'Invalid email/password',
      },
      {
        status: 401,
      }
    );
  }

  const checkPassword = bcrypt.compareSync(data.password, user.password);
  console.log(checkPassword, '<<<< check password');

  const token = await Sign({ _id: user._id, email: user.email });

  cookies().set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
  });

  return Response.json(
    {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      message: 'Login success',
      data: {
        token,
      },
    },
    {
      status: 200,
    }
  );
}
