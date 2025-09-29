import type { WebsiteConfig } from '@/types';

/**
 * website config, without translations
 *
 * docs:
 * https://workflowlab.com/docs/config/website
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
      logoLight: '/workflowlab-logo.svg',
      logoDark: '/workflowlab-logo.svg',
    },
    social: {
      github: 'https://github.com/WorkflowLabHQ',
      twitter: 'https://workflowlab.link/twitter',
      blueSky: 'https://workflowlab.link/bsky',
      discord: 'https://workflowlab.link/discord',
      mastodon: 'https://workflowlab.link/mastodon',
      linkedin: 'https://workflowlab.link/linkedin',
      youtube: 'https://workflowlab.link/youtube',
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
      zh: {
        flag: '🇨🇳',
        name: 'Chinese',
      es: {
        flag: '🇪🇸',
        name: 'Spanish',
      ar: {
        flag: '🇸🇦',
        name: 'Arabic',
      pt: {
        flag: '🇧🇷',
        name: 'Portuguese',
      id: {
        flag: '🇮🇩',
        name: 'Indonesian',
      fr: {
        flag: '🇫🇷',
        name: 'French',
      ja: {
        flag: '🇯🇵',
        name: 'Japanese',
      ru: {
        flag: '🇷🇺',
        name: 'Russian',
      de: {
        flag: '🇩🇪',
        name: 'German',
      it: {
        flag: '🇮🇹',
        name: 'Italian',
      hi: {
        flag: '🇮🇳',
        name: 'Hindi',
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
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
    fromEmail: 'WorkflowLab <support@workflowlab.com>',
    supportEmail: 'WorkflowLab <support@workflowlab.com>',
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