import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body;

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yourpersonalemail@gmail.com", // TEMP: change this to your email
      subject: `Contact - ${name}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    console.log("RESEND RESULT:", result);

    if (result.error) {
      console.error("RESEND ERROR:", result.error);
      return res.status(500).json({ error: result.error });
    }

    return res.status(200).json({ ok: true, result });

  } catch (e) {
    console.error("SERVER ERROR:", e);
    return res.status(500).json({ error: "failed" });
  }
}
