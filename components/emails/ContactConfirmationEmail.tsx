import * as React from "react";

import { EmailLayout } from "@/components/emails/EmailLayout";

interface ContactConfirmationEmailProps {
  logoUrl: string;
  name: string;
  subject: string;
}

export const ContactConfirmationEmail: React.FC<Readonly<ContactConfirmationEmailProps>> = ({
  logoUrl,
  name,
  subject,
}) => (
  <EmailLayout
    logoUrl={logoUrl}
    title="We Received Your Message"
    subtitle="Thank you for contacting Haiti Bright Futures."
  >
    <p style={{ margin: 0 }}>Hello {name},</p>

    <p style={{ margin: "12px 0 0" }}>
      We received your message about <strong>{subject}</strong>.
    </p>

    <p style={{ margin: "12px 0 0" }}>
      Our team will review it and get back to you as soon as possible.
    </p>

    <div
      style={{
        marginTop: "18px",
        padding: "12px 14px",
        borderRadius: "12px",
        backgroundColor: "#f3f9f3",
        border: "1px solid #dce8dc",
        color: "#1f3a24",
      }}
    >
      This is an automatic confirmation email.
    </div>

    <p style={{ margin: "18px 0 0" }}>
      Best regards,
      <br />
      Haiti Bright Futures Team
    </p>
  </EmailLayout>
);
