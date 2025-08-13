import { db } from "@/server/db";

const generateRandomEmail = (user_id: string): string => {
  return `${user_id}@example.com`;
};

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const {
      id,
      email_addresses,
      first_name: firstName,
      last_name: lastName,
      image_url: imageUrl,
    } = data;

    const emailAddress =
      email_addresses[0]?.email_address || generateRandomEmail(id);

    console.log({
      data: { id, emailAddress, firstName, lastName, imageUrl },
    });

    await db.user.create({
      data: {
        emailAddress,
        firstName,
        lastName,
        id,
        imageUrl,
      },
    });

    return new Response("Webhook received and processed", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Error processing webhook", { status: 400 });
  }
}
