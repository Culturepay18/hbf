/* eslint-disable @next/next/no-img-element */

import * as React from "react";

interface EmailLayoutProps {
  title: string;
  subtitle?: string;
  logoUrl: string;
  children: React.ReactNode;
}

export const EmailLayout: React.FC<Readonly<EmailLayoutProps>> = ({
  title,
  subtitle,
  logoUrl,
  children,
}) => (
  <div
    style={{
      margin: 0,
      padding: "28px 12px",
      backgroundColor: "#f4f7f4",
      fontFamily: "'Poppins', Arial, sans-serif",
      color: "#1a1a1a",
    }}
  >
    <div
      style={{
        maxWidth: "620px",
        margin: "0 auto",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #e4ebe4",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 26px rgba(22, 42, 22, 0.08)",
      }}
    >
      {/* Logo on white background — blends naturally */}
      <div
        style={{
          textAlign: "center",
          padding: "24px 22px 16px",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={logoUrl}
          alt="Haiti Bright Futures"
          width={200}
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "200px",
            height: "auto",
          }}
        />
      </div>

      {/* Gold accent divider */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #d4a843 0%, #e8c564 50%, #d4a843 100%)" }} />

      {/* Green title section */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 22px",
          background: "linear-gradient(180deg, #2e7d32 0%, #256a2a 100%)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "22px",
            lineHeight: 1.3,
            fontWeight: 700,
            letterSpacing: "0.3px",
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            style={{
              margin: "8px 0 0",
              color: "rgba(255,255,255,0.9)",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* Email body */}
      <div style={{ padding: "24px 22px", fontSize: "15px", lineHeight: 1.65 }}>{children}</div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #e9eee9",
          padding: "14px 22px",
          backgroundColor: "#f9fbf9",
          fontSize: "12px",
          lineHeight: 1.5,
          color: "#5f6b63",
          textAlign: "center",
        }}
      >
        Haiti Bright Futures · info@hbfhaiti.org
      </div>
    </div>
  </div>
);
