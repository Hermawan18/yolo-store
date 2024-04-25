import { createUser, getUserByEmail } from '@/db/models/user';
import { FormDataRegister } from '@/types';
import { z } from 'zod';

export async function POST(request: Request) {
  const data: FormDataRegister = await request.json();

  const findUser = await getUserByEmail(data.email);

  if (findUser) {
    if (data.email == findUser.email && data.username == findUser.username) {
      return Response.json(
        {
          statusCode: 401,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          message: 'Email is already in use',
        },
        {
          status: 401,
        }
      );
    }
  } else {
    const parsedData = z
      .object({
        username: z.string(),
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
    const newUser = await createUser(data);

    return Response.json(
      {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        message: 'Register success',
      },
      {
        status: 201,
      }
    );
  }
}
