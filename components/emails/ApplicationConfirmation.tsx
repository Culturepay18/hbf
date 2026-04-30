import * as React from "react";

interface ApplicationConfirmationEmailProps {
  studentName: string;
  applicationId: string;
}

export const ApplicationConfirmationEmail: React.FC<Readonly<ApplicationConfirmationEmailProps>> = ({
  studentName,
  applicationId,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
    <h1 style={{ color: "#006838" }}>Merci pour votre candidature, {studentName} !</h1>
    <p>Nous avons bien reçu votre demande de bourse pour <strong>Haiti Bright Futures</strong>.</p>
    <p>Votre numéro de dossier est : <strong>#{applicationId}</strong></p>
    <p>
      Notre équipe va examiner votre dossier attentivement. Nous vous contacterons prochainement par email ou par téléphone
      si vous êtes sélectionné pour l'étape suivante.
    </p>
    <div style={{ marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Cordialement,<br />
        L'équipe Haiti Bright Futures
      </p>
    </div>
  </div>
);
