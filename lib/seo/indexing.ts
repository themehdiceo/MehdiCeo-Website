/**
 * Site-wide indexing guard.
 *
 * Production launch: set NEXT_PUBLIC_SITE_INDEXING_ENABLED=true on
 * https://themehdiceo.com (e.g. in Vercel Production environment variables).
 * Leave unset or false on preview deployments and local development.
 */
export function isSiteIndexingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SITE_INDEXING_ENABLED === "true";
}

export function getDefaultRobots(): { index: boolean; follow: boolean } {
  if (isSiteIndexingEnabled()) {
    return { index: true, follow: true };
  }
  return { index: false, follow: false };
}
