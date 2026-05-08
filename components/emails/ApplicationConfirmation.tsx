import * as React from "react";

import { EmailLayout } from "@/components/emails/EmailLayout";

interface ApplicationConfirmationEmailProps {
  logoUrl: string;
  studentName: string;
  applicationId: string;
}

export const ApplicationConfirmationEmail: React.FC<Readonly<ApplicationConfirmationEmailProps>> = ({
  logoUrl,
  studentName,
  applicationId,
}) => (
  <EmailLayout
    logoUrl={logoUrl}
    title="Application Received"
    subtitle="Thank you for submitting your scholarship application."
  >
    <p style={{ margin: 0 }}>Hello {studentName},</p>

    <p style={{ margin: "12px 0 0" }}>
      We have successfully received your scholarship application for <strong>Haiti Bright Futures</strong>.
    </p>

    <p style={{ margin: "12px 0 0" }}>
      Your application ID is: <strong>#{applicationId}</strong>
    </p>

    <p>
      Our team will review your application carefully. We will contact you soon by email or phone
      if you are selected for the next stage of the process.
    </p>

    <p style={{ margin: "16px 0 0" }}>
      Best regards,
      <br />
      Haiti Bright Futures Team
    </p>
  </EmailLayout>
);
