import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    console.log("REQUEST BODY:", req.body);

    const { name, email, message } = req.body || {};

    // Validation
    if (!name || !email || !message) {
      console.error("MISSING FIELDS:", { name, email, message });
      return res.status(400).json({
        error: "Missing required fields",
        received: { name, email, message },
      });
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yourpersonalemail@gmail.com", // TEMP: use your email for testing
      subject: `Contact - ${name}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <pre>${message}</pre>
      `,
    });

    console.log("RESEND RESULT:", result);

    if ((result as any)?.error) {
      console.error("RESEND ERROR:", (result as any).error);
      return res.status(500).json({ error: (result as any).error });
    }

    return res.status(200).json({ ok: true });

  } catch (e) {
    console.error("SERVER ERROR:", e);
    return res.status(500).json({ error: "server failure" });
  }
}