import type { Metadata } from "next";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez ChoisirAuto pour toute question, partenariat ou demande de conseil.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Contact</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Une question, un partenariat, une demande ?</h1>
      <p className="mt-3 text-ink/60">Écrivez-nous, nous revenons vers vous rapidement.</p>

      <div className="mt-8">
        <LeadForm type="conseil" />
      </div>
    </div>
  );
}
