// Style reminder: this module exposes only non-secret Preview configuration state; it must remain safe for protected page rendering.
import "server-only";

export function isDocumentHelpAIConfigured() {
  return Boolean(process.env.GROQ_API_KEY);
}
