import { getProducts, getSearchProduct } from '@/db/models/product';

export async function GET() {
  const products = await getProducts();

  return Response.json(
    {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      message: 'Get all products',
      data: products,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const response = await request.json();
  console.log(response, '<<<< dari search product');
  const resultSearch = await getSearchProduct(response.search);
  console.log(resultSearch, '<<<< hasil dari search');
  return Response.json(
    {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      message: 'Success search product',
      data: resultSearch,
    },
    {
      status: 200,
    }
  );
}
