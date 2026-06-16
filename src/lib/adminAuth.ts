const ENCODER = new TextEncoder();

async function getCryptoKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    ENCODER.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signAdminToken(username: string, secret: string, maxAgeInSeconds: number = 86400): Promise<string> {
  const expiresAt = Date.now() + maxAgeInSeconds * 1000;
  const payload = `${username}:${expiresAt}`;
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, ENCODER.encode(payload));
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
  // Safe base64 encoding across Edge runtime and standard Node.js
  const payloadBase64 = typeof btoa !== "undefined" 
    ? btoa(payload) 
    : Buffer.from(payload).toString("base64");
  
  return `${payloadBase64}.${signatureHex}`;
}

export async function verifyAdminToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  try {
    const payloadBase64 = parts[0];
    const signatureHex = parts[1];
    
    const payload = typeof atob !== "undefined"
      ? atob(payloadBase64)
      : Buffer.from(payloadBase64, "base64").toString("utf-8");
      
    const [username, expiresAtStr] = payload.split(":");
    const expiresAt = parseInt(expiresAtStr, 10);
    
    if (isNaN(expiresAt) || expiresAt < Date.now()) {
      return false;
    }

    const key = await getCryptoKey(secret);
    
    // Reconstruct Uint8Array from hex string
    const hexMatch = signatureHex.match(/.{1,2}/g);
    if (!hexMatch) return false;
    
    const signatureBytes = new Uint8Array(
      hexMatch.map((byte) => parseInt(byte, 16))
    );
    
    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      ENCODER.encode(payload)
    );
    
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    return verified && username === adminUsername;
  } catch (e) {
    return false;
  }
}
