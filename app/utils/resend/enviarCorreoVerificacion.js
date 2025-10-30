import { resend } from './resend.js';

export const enviarCorreoVerificacion = async (email, url) => {
  await resend.emails.send({
    from: 'Proyecta VERIFICACIÓN DE USUARIO <onboarding@resend.dev>',
    to: email,
    subject: 'Verifica tu correo para acceder a Proyecta',
    html: `<p>Gracias por registrarte en Proyecta. <a href="${url}">Click aquí para verificar tu correo</a></p>`,
  });
};
