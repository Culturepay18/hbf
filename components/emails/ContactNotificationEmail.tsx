import * as React from "react";

import { EmailLayout } from "@/components/emails/EmailLayout";

interface ContactNotificationEmailProps {
  logoUrl: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const fieldLabelStyle: React.CSSProperties = {
  width: "132px",
  padding: "8px 0",
  fontWeight: 700,
  color: "#1a1a1a",
  verticalAlign: "top",
};

const fieldValueStyle: React.CSSProperties = {
  padding: "8px 0",
  color: "#2f3a33",
};

export const ContactNotificationEmail: React.FC<Readonly<ContactNotificationEmailProps>> = ({
  logoUrl,
  name,
  email,
  subject,
  message,
  submittedAt,
}) => (
  <EmailLayout
    logoUrl={logoUrl}
    title="New Contact Message"
    subtitle="A visitor sent a new message through the website contact form."
  >
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={fieldLabelStyle}>Submitted</td>
          <td style={fieldValueStyle}>{submittedAt}</td>
        </tr>
        <tr>
          <td style={fieldLabelStyle}>Name</td>
          <td style={fieldValueStyle}>{name}</td>
        </tr>
        <tr>
          <td style={fieldLabelStyle}>Email</td>
          <td style={fieldValueStyle}>{email}</td>
        </tr>
        <tr>
          <td style={fieldLabelStyle}>Subject</td>
          <td style={fieldValueStyle}>{subject}</td>
        </tr>
      </tbody>
    </table>

    <div
      style={{
        marginTop: "14px",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #e2e8e2",
        backgroundColor: "#fbfdfb",
      }}
    >
      <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#1a1a1a" }}>Message</p>
      <p style={{ margin: 0, whiteSpace: "pre-wrap", color: "#2f3a33" }}>{message}</p>
    </div>
  </EmailLayout>
);
