import { websiteConfig } from './config/website';

/**
 * The routes for the application
 */
export enum Routes {
  Root = '/',

  // marketing pages
  FAQ = '/#faq',
  Features = '/#features',

  
  Blog = '/blog',
  Software = '/software',
  About = '/about',
  Contact = '/contact',
  Waitlist = '/waitlist',

  
  // AI routes
  AIText = '/ai/text',
  AIImage = '/ai/image',
  AIChat = '/ai/chat',
  AIVideo = '/ai/video',
  AIAudio = '/ai/audio',

  // block routes
  MagicuiBlocks = '/magicui',
  HeroBlocks = '/blocks/hero-section',
  LogoCloudBlocks = '/blocks/logo-cloud',
  FeaturesBlocks = '/blocks/features',
  IntegrationsBlocks = '/blocks/integrations',
  ContentBlocks = '/blocks/content',
  
  TeamBlocks = '/blocks/team',
  TestimonialsBlocks = '/blocks/testimonials',
  FooterBlocks = '/blocks/footer',

  ComparatorBlocks = '/blocks/comparator',
  FAQBlocks = '/blocks/faqs',
  LoginBlocks = '/blocks/login',
  SignupBlocks = '/blocks/sign-up',
  ForgotPasswordBlocks = '/blocks/forgot-password',
  ContactBlocks = '/blocks/contact',
}

/**
 * The routes that can not be accessed by logged in users
 */
export const routesNotAllowedByLoggedInUsers: string[] = [];

/**
 * The routes that are protected and require authentication
 */
export const protectedRoutes: string[] = [];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = Routes.Root;
