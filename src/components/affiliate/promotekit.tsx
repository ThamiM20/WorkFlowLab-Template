'use client';

import Script from 'next/script';

/**
 * PromoteKit
 *
 * https://www.promotekit.com
 */
export default function PromotekitScript() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const promotekitKey = process.env.NEXT_PUBLIC_AFFILIATE_PROMOTEKIT_ID;
  if (!promotekitKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://cdn.promotekit.com/promotekit.js"
        data-promotekit={promotekitKey}
        strategy="afterInteractive"
      />
    </>
  );
}
