// This route is no longer needed since we've removed authentication
export async function GET() {
  return new Response('Authentication is disabled', { status: 404 });
}

export async function POST() {
  return new Response('Authentication is disabled', { status: 404 });
}