import { env } from "~/lib/env";

export async function addUserToGristWaitlist(user: {
  name: string;
  email: string;
}) {
  try {
    const res = await fetch(
      `https://docs.getgrist.com/api/docs/${env.GRIST_DOC_ID}/tables/${env.GRIST_TABLE_ID}/records/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GRIST_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                name: user.name,
                email: user.email,
                approve: false,
              },
            },
          ],
        }),
      },
    );
    console.log("Grist response:", await res.json());
  } catch (error) {
    console.error("Failed to add user to Grist:", error);
  }
}
