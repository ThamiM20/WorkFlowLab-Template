import fs from 'fs/promises';
import path from 'path';

interface TranslationService {
  translateText: (text: string, targetLang: string, sourceLang?: string) => Promise<string>;
}

/**
 * A mock translation service for demonstration purposes.
 * In a real application, you would replace this with a real translation API
 * such as Google Translate API, DeepL API, etc.
 */
class MockTranslationService implements TranslationService {
  async translateText(text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> {
    // In a real implementation, this would call an actual translation API
    // For this demo, we'll return the original text with a note
    if (targetLang === 'es') {
      // Provide some example Spanish translations for common terms
      const commonTranslations: { [key: string]: string } = {
        'Log in': 'Iniciar sesión',
        'Log out': 'Cerrar sesión',
        'Sign up': 'Registrarse',
        'WorkflowLab': 'WorkflowLab',
        'Your Catalog of Essential Software Tools': 'Su Catálogo de Herramientas de Software Esenciales',
        'Discover and explore a comprehensive catalog of software tools and services designed to streamline your workflow.': 'Descubra y explore un catálogo completo de herramientas y servicios de software diseñados para optimizar su flujo de trabajo.',
        'Testimonials': 'Testimonios',
        'Frequently Asked Questions': 'Preguntas Frecuentes',
        'FAQ': 'Preguntas Frecuentes',
        'About': 'Acerca de'
      };
      return commonTranslations[text] || text;
    } else if (targetLang === 'fr') {
      const commonTranslations: { [key: string]: string } = {
        'Log in': 'Se connecter',
        'Log out': 'Se déconnecter',
        'Sign up': 'S\'inscrire',
        'WorkflowLab': 'WorkflowLab',
        'Your Catalog of Essential Software Tools': 'Votre Catalogue d\'Outils Logiciels Essentiels',
        'Discover and explore a comprehensive catalog of software tools and services designed to streamline your workflow.': 'Découvrez et explorez un catalogue complet d\'outils et services logiciels conçus pour rationaliser votre flux de travail.',
        'Testimonials': 'Témoignages',
        'Frequently Asked Questions': 'Foire Aux Questions',
        'FAQ': 'FAQ',
        'About': 'À propos'
      };
      return commonTranslations[text] || text;
    } else if (targetLang === 'de') {
      const commonTranslations: { [key: string]: string } = {
        'Log in': 'Einloggen',
        'Log out': 'Ausloggen',
        'Sign up': 'Anmelden',
        'WorkflowLab': 'WorkflowLab',
        'Your Catalog of Essential Software Tools': 'Ihr Katalog Essentieller Software-Tools',
        'Discover and explore a comprehensive catalog of software tools and services designed to streamline your workflow.': 'Entdecken und erkunden Sie einen umfassenden Katalog von Software-Tools und Diensten, die entwickelt wurden, um Ihren Arbeitsablauf zu optimieren.',
        'Testimonials': 'Referenzen',
        'Frequently Asked Questions': 'Häufig Gestellte Fragen',
        'FAQ': 'FAQ',
        'About': 'Über'
      };
      return commonTranslations[text] || text;
    } else if (targetLang === 'zh') {
      const commonTranslations: { [key: string]: string } = {
        'Log in': '登录',
        'Log out': '登出',
        'Sign up': '注册',
        'WorkflowLab': 'WorkflowLab',
        'Your Catalog of Essential Software Tools': '您的必备软件工具目录',
        'Discover and explore a comprehensive catalog of software tools and services designed to streamline your workflow.': '发现和探索全面的软件工具和服务目录，旨在简化您的工作流程。',
        'Testimonials': '推荐',
        'Frequently Asked Questions': '常见问题解答',
        'FAQ': '常见问题',
        'About': '关于我们'
      };
      return commonTranslations[text] || text;
    }
    // For other languages, return the original text
    return text;
  }
}

class LocaleTranslator {
  private translationService: TranslationService;
  private messagesDir: string;
  
  constructor(translationService: TranslationService) {
    this.translationService = translationService;
    this.messagesDir = path.join(process.cwd(), 'messages');
  }
  
  /**
   * Generate translated locale files for all target languages
   * @param targetLocales Array of locale codes to translate to
   * @param sourceLocale The source locale to translate from (default: en)
   */
  async generateTranslatedLocales(targetLocales: string[], sourceLocale: string = 'en'): Promise<void> {
    console.log(`Generating translations for locales: ${targetLocales.join(', ')}`);
    
    // Read the source locale file
    const sourcePath = path.join(this.messagesDir, `${sourceLocale}.json`);
    const sourceContent = await fs.readFile(sourcePath, 'utf-8');
    const sourceData = JSON.parse(sourceContent);
    
    // For each target locale, create a translation
    for (const targetLocale of targetLocales) {
      console.log(`Translating to ${targetLocale}...`);
      
      try {
        // Translate the entire source data structure
        const translatedData = await this.translateObject(sourceData, targetLocale);
        
        // Write the translated data to a new file
        const targetPath = path.join(this.messagesDir, `${targetLocale}.json`);
        await fs.writeFile(targetPath, JSON.stringify(translatedData, null, 2));
        
        console.log(`Successfully created translation file: ${targetPath}`);
      } catch (error) {
        console.error(`Failed to translate to ${targetLocale}:`, error);
        throw error;
      }
    }
    
    console.log('Translation process completed!');
  }
  
  /**
   * Recursively translate all strings in an object
   */
  private async translateObject(obj: any, targetLocale: string): Promise<any> {
    if (typeof obj === 'string') {
      // Translate the string
      return await this.translationService.translateText(obj, targetLocale);
    } else if (Array.isArray(obj)) {
      // Translate each element in the array
      const translatedArray = [];
      for (const item of obj) {
        translatedArray.push(await this.translateObject(item, targetLocale));
      }
      return translatedArray;
    } else if (typeof obj === 'object' && obj !== null) {
      // Translate each property in the object
      const translatedObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
        translatedObj[key] = await this.translateObject(value, targetLocale);
      }
      return translatedObj;
    } else {
      // Return the value as is if it's not a string, array, or object
      return obj;
    }
  }
}

// Define the 12 most used languages excluding English (which is the source)
const targetLanguages = [
  'zh',  // Chinese
  'es',  // Spanish
  'ar',  // Arabic
  'pt',  // Portuguese
  'id',  // Indonesian
  'fr',  // French
  'ja',  // Japanese
  'ru',  // Russian
  'de',  // German
  'it',  // Italian
  'hi'   // Hindi
];

// Check if this script is being run directly
if (require.main === module) {
  const translator = new LocaleTranslator(new MockTranslationService());
  
  const args = process.argv.slice(2);
  
  if (args.includes('--translate-all')) {
    translator.generateTranslatedLocales(targetLanguages)
      .then(() => console.log('All translations completed successfully'))
      .catch(error => console.error('Error during translation:', error));
  } else if (args.includes('--help')) {
    console.log('Usage:');
    console.log('  --translate-all    Generate translations for all target languages');
    console.log('  --help             Show this help message');
  } else {
    console.log('Use --translate-all to generate translations for all languages.');
    console.log('Note: This uses a mock translation service; replace with a real API for accurate translations.');
  }
}

export { LocaleTranslator, TranslationService, MockTranslationService, targetLanguages };