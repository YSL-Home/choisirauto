/**
 * Cloudflare Pages Function — réception des leads (formulaires du site)
 * POST /api/lead
 *
 * Env attendues (Cloudflare Pages > Settings > Environment variables) :
 *  - RESEND_API_KEY   : clé API Resend pour l'envoi d'email (https://resend.com)
 *  - LEAD_NOTIFY_EMAIL: adresse qui reçoit la notification de chaque lead
 *  - LEAD_FROM_EMAIL  : adresse expéditeur vérifiée sur Resend (ex. leads@votredomaine.ma)
 *
 * Sans ces variables, la fonction accepte toujours le lead (renvoie 200) mais
 * n'envoie pas d'email — les leads restent alors visibles uniquement via les
 * logs Cloudflare tant que le stockage/back-office n'est pas branché.
 */

const REQUIRED_FIELDS = ["nom", "telephone", "type"];

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot anti-spam (champ "website" doit rester vide)
  if (data.website) {
    return json({ ok: true });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === "") {
      return json({ error: `missing_field:${field}` }, 400);
    }
  }

  const lead = {
    type: String(data.type).slice(0, 60),
    nom: String(data.nom).slice(0, 120),
    telephone: String(data.telephone).slice(0, 40),
    email: data.email ? String(data.email).slice(0, 160) : "",
    message: data.message ? String(data.message).slice(0, 2000) : "",
    entreprise: data.entreprise ? String(data.entreprise).slice(0, 160) : "",
    secteur: data.secteur ? String(data.secteur).slice(0, 160) : "",
    tailleParc: data.tailleParc ? String(data.tailleParc).slice(0, 160) : "",
    page: data.page ? String(data.page).slice(0, 200) : "",
    receivedAt: new Date().toISOString(),
  };

  console.log("[lead]", JSON.stringify(lead));

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL && env.LEAD_FROM_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL,
          to: env.LEAD_NOTIFY_EMAIL,
          subject: `Nouveau lead (${lead.type}) — ${lead.nom}`,
          text: [
            `Type: ${lead.type}`,
            `Nom: ${lead.nom}`,
            `Téléphone: ${lead.telephone}`,
            `Email: ${lead.email}`,
            lead.entreprise ? `Entreprise: ${lead.entreprise}` : "",
            lead.secteur ? `Secteur: ${lead.secteur}` : "",
            lead.tailleParc ? `Taille du parc: ${lead.tailleParc}` : "",
            `Message: ${lead.message}`,
            `Page: ${lead.page}`,
            `Reçu le: ${lead.receivedAt}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch (e) {
      console.log("[lead] email notification failed", e.message);
    }
  }

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
