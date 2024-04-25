import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function Sign(payload: jose.JWTPayload) {
  const alg = 'HS256';

  const jwt = await new jose.SignJWT(payload).setProtectedHeader({ alg }).sign(secret);

  console.log(jwt, '<<< ini jwt');
  return jwt;
}

export async function Verify<T>(token: string) {
  const { payload } = await jose.jwtVerify<T>(token, secret);

  console.log(payload, '<<< ini payload');
  return payload;
}
