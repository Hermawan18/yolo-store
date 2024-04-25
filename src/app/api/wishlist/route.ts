import { addWhistlist, deleteWhislist, getWhislists } from '@/db/models/whistlist';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');

  if (userId != null) {
    const data = await getWhislists(userId);

    return Response.json(
      {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        message: 'Success get whislist',
        data,
      },
      {
        status: 200,
      }
    );
  }
}

export async function POST(request: Request) {
  const reqData = await request.json();
  const userId = request.headers.get('x-user-id');
  const productId = reqData.productId;

  if (userId != null) {
    const data = await addWhistlist(userId, productId);
    return Response.json({
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      message: 'Success add whislist',
      data: data,
    });
  }
}

interface PROPS {
  params: {
    _id: string;
  };
}

export async function DELETE(request: Request) {
  const reqData = await request.json();
  const userId = request.headers.get('x-user-id');
  const wishlistId = reqData.wishlistId;

  const data = await deleteWhislist(wishlistId);
  return Response.json({
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    message: 'Success delete whislist',
    data: data,
  });
}
