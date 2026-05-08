import * as React from "react";

import { EmailLayout } from "@/components/emails/EmailLayout";

interface ApplicationNotificationEmailProps {
  logoUrl: string;
  submittedAt: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  school: string;
  grade: string;
  address: string;
  phone: string;
  email: string;
  sex: string;
  nifCin: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  essayName: string;
  studentNifFileName?: string;
  photoName?: string;
}

const labelStyle: React.CSSProperties = {
  width: "156px",
  padding: "7px 0",
  fontWeight: 700,
  color: "#1a1a1a",
  verticalAlign: "top",
};

const valueStyle: React.CSSProperties = {
  padding: "7px 0",
  color: "#2f3a33",
};

export const ApplicationNotificationEmail: React.FC<Readonly<ApplicationNotificationEmailProps>> = ({
  logoUrl,
  submittedAt,
  applicationId,
  firstName,
  lastName,
  dateOfBirth,
  school,
  grade,
  address,
  phone,
  email,
  sex,
  nifCin,
  guardianName,
  guardianPhone,
  guardianEmail,
  essayName,
  studentNifFileName,
  photoName,
}) => (
  <EmailLayout
    logoUrl={logoUrl}
    title="New Scholarship Application"
    subtitle="A new candidate application has been submitted on the website."
  >
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={labelStyle}>Submitted</td>
          <td style={valueStyle}>{submittedAt}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Application ID</td>
          <td style={valueStyle}>#{applicationId}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Student</td>
          <td style={valueStyle}>{firstName} {lastName}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Date of birth</td>
          <td style={valueStyle}>{dateOfBirth}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Sex</td>
          <td style={valueStyle}>{sex}</td>
        </tr>
        <tr>
          <td style={labelStyle}>School / Grade</td>
          <td style={valueStyle}>{school} · {grade}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Phone</td>
          <td style={valueStyle}>{phone}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Email</td>
          <td style={valueStyle}>{email}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Address</td>
          <td style={valueStyle}>{address}</td>
        </tr>
        <tr>
          <td style={labelStyle}>NIF/CIN</td>
          <td style={valueStyle}>{nifCin}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Guardian</td>
          <td style={valueStyle}>{guardianName}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Guardian phone</td>
          <td style={valueStyle}>{guardianPhone}</td>
        </tr>
        <tr>
          <td style={labelStyle}>Guardian email</td>
          <td style={valueStyle}>{guardianEmail}</td>
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
      <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#1a1a1a" }}>Attached files</p>
      <p style={{ margin: 0, color: "#2f3a33" }}>
        Essay: <strong>{essayName}</strong>
      </p>
      <p style={{ margin: "4px 0 0", color: "#2f3a33" }}>
        Student NIF/CIN: <strong>{studentNifFileName || "Not provided"}</strong>
      </p>
      <p style={{ margin: "4px 0 0", color: "#2f3a33" }}>
        Photo: <strong>{photoName || "Not provided"}</strong>
      </p>
    </div>
  </EmailLayout>
);
