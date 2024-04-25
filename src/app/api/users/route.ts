import { getUsers } from '@/db/models/user';

export async function GET() {
  const users = await getUsers();

  return Response.json({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    message: 'Success get products',
    data: users,
  });
}
