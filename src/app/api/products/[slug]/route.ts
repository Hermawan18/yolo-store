import { getProductById, getProductsPagination } from '@/db/models/product';

export async function GET(request: Request, { params: { slug } }: { params: { slug: string } }) {
  const data = await getProductById(slug);
  return Response.json(
    {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      message: 'message from GET /api/products/' + slug,
      data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const page = await request.json();

  const products = await getProductsPagination(page);

  return Response.json(
    {
      statusCode: 200,
      message: 'Get all products pagination',
      data: products,
    },
    {
      status: 200,
    }
  );
}
