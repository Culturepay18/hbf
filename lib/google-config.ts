function normalizePrivateKey(value: string) {
  if (!value) return "";
  const trimmed = value.trim();

  // Handle keys that might be wrapped in extra quotes from Vercel/env loaders
  let cleanKey = trimmed;
  if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
    cleanKey = cleanKey.substring(1, cleanKey.length - 1);
  }

  if (cleanKey.includes("-----BEGIN PRIVATE KEY-----")) {
    // Replace literal \n with real newlines
    return cleanKey.replace(/\\n/g, "\n");
  }

  return cleanKey;
}

export function getGoogleConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.warn("Google Sheets config missing: GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY.");
    return null;
  }

  return {
    client_email: clientEmail,
    private_key: normalizePrivateKey(privateKey),
  };
}
