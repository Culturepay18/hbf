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
    <h1 style={{ color: "#006838" }}>Thank you for your application, {studentName}!</h1>
    <p>We have successfully received your scholarship application for <strong>Haiti Bright Futures</strong>.</p>
    <p>Your application ID is: <strong>#{applicationId}</strong></p>
    <p>
      Our team will review your application carefully. We will contact you soon by email or phone
      if you are selected for the next stage of the process.
    </p>
    <div style={{ marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Best regards,<br />
        The Haiti Bright Futures Team
      </p>
    </div>
  </div>
);
