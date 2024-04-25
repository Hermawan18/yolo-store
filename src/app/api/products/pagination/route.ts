import { getProductsPagination } from '@/db/models/product';

export async function POST(request: Request) {
  const response = await request.json();
  const pagination = await getProductsPagination(response.page);

  return Response.json({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    message: 'Pagination success',
    data: pagination,
  });
}
