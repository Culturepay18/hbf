function normalizePrivateKey(value: string) {
  const trimmed = value.trim();

  if (trimmed.includes("-----BEGIN PRIVATE KEY-----")) {
    const pem = trimmed.replace(/\\n/g, "\n");

    if (!pem.includes("-----END PRIVATE KEY-----")) {
      throw new Error("Google private key is invalid or incomplete.");
    }

    return pem;
  }

  const decoded = Buffer.from(trimmed.replace(/\s/g, ""), "base64").toString("utf8").trim();

  if (
    decoded.includes("-----BEGIN PRIVATE KEY-----") &&
    decoded.includes("-----END PRIVATE KEY-----")
  ) {
    return decoded;
  }

  throw new Error("Google private key must be a PEM key or a base64-encoded PEM key.");
}

export function getGoogleConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  return {
    client_email: clientEmail,
    private_key: normalizePrivateKey(privateKey),
  };
}
