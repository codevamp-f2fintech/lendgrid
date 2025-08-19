"use server"

export async function submitContact(formData: FormData) {
  // Simulate processing time
  await new Promise((r) => setTimeout(r, 900))

  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const message = String(formData.get("message") ?? "")
  const company = String(formData.get("company") ?? "")
  const subject = String(formData.get("subject") ?? "")

  // In real app, send email, enqueue job, or store in DB here.
  const ok = !!name && !!email && !!message

  return {
    ok,
    message: ok
      ? `Thanks ${name}, your message was received. We'll reply to ${email}.`
      : "Please complete the required fields.",
    echo: { name, email, message, company, subject },
  }
}
