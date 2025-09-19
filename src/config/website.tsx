import type { WebsiteConfig } from '@/types';

/**
 * website config, without translations
 *
 * docs:
 * https://mksaas.com/docs/config/website
 */
export const websiteConfig: WebsiteConfig = {
  ui: {
    theme: {
      defaultTheme: 'default',
      enableSwitch: true,
    },
    mode: {
      defaultMode: 'dark',
      enableSwitch: true,

    },
  },
  metadata: {
    images: {
      ogImage: '/og.png',
      logoLight: '/logo.png',
      logoDark: '/logo-dark.png',
    },
    social: {
      github: 'https://github.com/MkSaaSHQ',
      twitter: 'https://mksaas.link/twitter',
      blueSky: 'https://mksaas.link/bsky',
      discord: 'https://mksaas.link/discord',
      mastodon: 'https://mksaas.link/mastodon',
      linkedin: 'https://mksaas.link/linkedin',
      youtube: 'https://mksaas.link/youtube',
    },
  },
  features: {

    enableUpdateAvatar: true,
    enableCrispChat: process.env.NEXT_PUBLIC_DEMO_WEBSITE === 'true',
    enableTurnstileCaptcha: process.env.NEXT_PUBLIC_DEMO_WEBSITE === 'true',
  },
  routes: {
    defaultLoginRedirect: '/',
  },
  analytics: {
    enableVercelAnalytics: false,
    enableSpeedInsights: false,
  },
  auth: {
    enableGoogleLogin: true,
    enableGithubLogin: true,
    enableCredentialLogin: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: {
      en: {
        flag: '🇺🇸',
        name: 'English',
      },
      zh: {
        flag: '🇨🇳',
        name: '中文',
      },
    },
  },
  blog: {
    enable: true,
    paginationSize: 6,
    relatedPostsSize: 3,
  },
  docs: {
    enable: true,
  },
  mail: {
    provider: 'resend',
    fromEmail: 'MkSaaS <support@mksaas.com>',
    supportEmail: 'MkSaaS <support@mksaas.com>',
  },
  newsletter: {
    enable: true,
    provider: 'resend',
    autoSubscribeAfterSignUp: true,
  },
  storage: {
    enable: true,
    provider: 's3',
  },
  credits: {
    enableCredits: false,
    registerGiftCredits: {
      enable: false,
      amount: 0,
    },
    packages: {},
  },
};