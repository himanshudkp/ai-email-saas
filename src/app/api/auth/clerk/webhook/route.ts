export async function POST(request: Request) {
  const data = await request.json();
  console.log({ data });
  return new Response("Webhook Called", { status: 200 });
}
