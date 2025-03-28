import { RECAPTCHA_SECRET_KEY } from '@/config/recaptcha';

export async function POST(request: Request) {
  const { token } = await request.json();

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();

  return Response.json(data);
}