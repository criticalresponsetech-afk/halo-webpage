import * as functions from "firebase-functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contact = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send();
    return;
  }

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `Contact Form - ${name}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).send({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "failed" });
  }
});
