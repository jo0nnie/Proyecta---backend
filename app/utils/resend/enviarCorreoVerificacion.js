import { resend } from "./resend.js";

export const enviarCorreoVerificacion = async (email, url) => {
  await resend.emails.send({
    from: "Proyecta VERIFICACIÓN DE USUARIO <onboarding@resend.dev>",
    to: email,
    subject: "Verifica tu correo para acceder a Proyecta",
    html: `
      <p>Hola, gracias por registrarte en <strong>Proyecta</strong>.</p>
      <p>Hacé clic en el siguiente enlace para verificar tu cuenta:</p>
      <p><a href="${url}" style="color:#2C4692;font-weight:bold;">Verificar mi correo</a></p>
    `,
  });
};