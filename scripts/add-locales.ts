import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

interface LocaleConfig {
  code: string;
  flag: string;
  name: string;
  translationData?: any;
}

/**
 * Automation script for creating new locale files and integrating them into the application's configuration
 */
class LocaleAutomation {
  private messagesDir: string;
  private configPath: string;
  private defaultLocalePath: string;
  
  constructor() {
    this.messagesDir = path.join(process.cwd(), 'messages');
    this.configPath = path.join(process.cwd(), 'src', 'config', 'website.tsx');
    this.defaultLocalePath = path.join(process.cwd(), 'messages', 'en.json');
  }
  
  /**
   * Main function to add new locales to the application
   * @param locales Array of locale configurations to add
   */
  async addLocales(locales: LocaleConfig[]): Promise<void> {
    console.log(`Starting locale automation for ${locales.length} locales...`);
    
    for (const locale of locales) {
      try {
        console.log(`Processing locale: ${locale.code}`);
        
        // Step 1: Generate new translation file
        await this.generateTranslationFile(locale);
        
        // Step 2: Update main configuration file
        await this.updateConfigFile(locale);
        
        console.log(`Successfully added locale: ${locale.code}`);
      } catch (error) {
        console.error(`Failed to add locale ${locale.code}:`, error);
        throw error;
      }
    }
    
    // Step 3: Commit and push changes
    await this.commitAndPush(locales);
    
    console.log('Locale automation completed successfully!');
  }
  
  /**
   * Generate a new translation file from the default English file
   * @param locale The locale configuration
   */
  private async generateTranslationFile(locale: LocaleConfig): Promise<void> {
    // Read the default English locale file
    const defaultContent = await fs.readFile(this.defaultLocalePath, 'utf-8');
    const defaultMessages = JSON.parse(defaultContent);
    
    // Use provided translation data or create an empty object for now
    // In a real scenario, you might want to implement actual translation logic
    const translationData = locale.translationData || this.createEmptyTranslation(defaultMessages);
    
    // Write the new locale file
    const localeFilePath = path.join(this.messagesDir, `${locale.code}.json`);
    await fs.writeFile(localeFilePath, JSON.stringify(translationData, null, 2));
    console.log(`Created translation file: ${localeFilePath}`);
  }
  
  /**
   * Create an empty translation object with the same structure as the default
   */
  private createEmptyTranslation(defaultMessages: any): any {
    const result: any = {};
    
    const traverse = (obj: any, target: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          target[key] = {};
          traverse(obj[key], target[key]);
        } else {
          // For now, we'll set it as empty or use the default value as placeholder
          target[key] = obj[key];
        }
      }
    };
    
    traverse(defaultMessages, result);
    return result;
  }
  
  /**
   * Update the main configuration file to include the new locale
   * @param locale The locale configuration to add
   */
  private async updateConfigFile(locale: LocaleConfig): Promise<void> {
    let configContent = await fs.readFile(this.configPath, 'utf-8');
    
    // Check if locale already exists in config
    if (configContent.includes(`${locale.code}: {`)) {
      console.log(`Locale ${locale.code} already exists in config, skipping...`);
      return;
    }
    
    // Find the section where locales are defined: between "locales: {" and the closing "}"
    // that comes before the "blog:" section
    const startMarker = 'locales: {';
    const endMarker = '  blog: {';
    
    const startIndex = configContent.indexOf(startMarker);
    if (startIndex === -1) {
      throw new Error('Could not find locales section start in config file');
    }
    
    const endIndex = configContent.indexOf(endMarker, startIndex);
    if (endIndex === -1) {
      throw new Error('Could not find locales section end in config file');
    }
    
    // Extract the locales section to insert our new locale in the right place
    const beforeLocales = configContent.substring(0, startIndex + startMarker.length);
    const localesSection = configContent.substring(startIndex + startMarker.length, endIndex);
    const afterLocales = configContent.substring(endIndex);
    
    // Find the last closing brace within the locales section to insert before
    // We need to find the right place to insert our new locale
    const newLocaleEntry = `\n      ${locale.code}: {\n        flag: '${locale.flag}',\n        name: '${locale.name}',\n      },`;
    
    // Insert the new locale entry before the closing brace of the locales object
    const updatedLocalesSection = localesSection.replace(/\s*(\n\s*\},\s*\n\s*\},)$/, newLocaleEntry + '$1');
    
    // Reassemble the config
    configContent = beforeLocales + updatedLocalesSection + afterLocales;
    
    // Write the updated config file
    await fs.writeFile(this.configPath, configContent);
    console.log(`Updated config file with locale: ${locale.code}`);
  }
  
  /**
   * Commit and push all modified files
   * @param locales The locales that were added
   */
  private async commitAndPush(locales: LocaleConfig[]): Promise<void> {
    const localeCodes = locales.map(locale => locale.code).join(', ');
    const commitMessage = `feat: add new locales [${localeCodes}]`;
    
    try {
      // Stage all changes
      await execPromise('git add .');
      console.log('Staged all changes');
      
      // Commit changes
      await execPromise(`git commit -m "${commitMessage}"`);
      console.log(`Committed changes: ${commitMessage}`);
      
      // Push changes (assuming main branch, could be configurable)
      await execPromise('git push origin main');
      console.log('Pushed changes to remote repository');
    } catch (error) {
      console.error('Failed to commit and push changes:', error);
      throw error;
    }
  }
  
  /**
   * Add a GitHub Action that triggers this automation on project creation
   */
  async setupGitHubAction(): Promise<void> {
    const actionDir = path.join(process.cwd(), '.github', 'workflows');
    await fs.mkdir(actionDir, { recursive: true });
    
    const actionContent = `name: Add Locales Automation
on:
  push:
    branches: [ main ]

jobs:
  add-locales:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run locale automation script
      run: npm run add-locales
      env:
        NODE_ENV: production
`;
    
    const actionPath = path.join(actionDir, 'add-locales.yml');
    await fs.writeFile(actionPath, actionContent);
    console.log('Created GitHub Action workflow for locale automation');
  }
}

// Example usage for the 12 most used languages on the Internet
// (English is already included as default)
const mostUsedLanguages: LocaleConfig[] = [
  { code: 'zh', flag: '🇨🇳', name: 'Chinese' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese' },
  { code: 'id', flag: '🇮🇩', name: 'Indonesian' },
  { code: 'fr', flag: '🇫🇷', name: 'French' },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian' },
  { code: 'de', flag: '🇩🇪', name: 'German' },
  { code: 'it', flag: '🇮🇹', name: 'Italian' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi' }
];

// Check if this script is being run directly
if (require.main === module) {
  const automation = new LocaleAutomation();
  
  // Parse command line arguments to determine which locales to add
  const args = process.argv.slice(2);
  
  if (args.includes('--setup-github-action')) {
    automation.setupGitHubAction()
      .then(() => console.log('GitHub Action setup completed'))
      .catch(error => console.error('Error setting up GitHub Action:', error));
  } else if (args.includes('--add-most-used')) {
    automation.addLocales(mostUsedLanguages)
      .catch(error => console.error('Error during locale automation:', error));
  } else if (args.length > 0) {
    // Add specific locales passed as arguments (e.g., --locales es-ES,fr-FR)
    const localeArg = args.find(arg => arg.startsWith('--locales='));
    if (localeArg) {
      const codes = localeArg.split('=')[1].split(',');
      const localeConfigs: LocaleConfig[] = codes.map(code => ({
        code,
        flag: getFlagForLocale(code),
        name: getLanguageNameForLocale(code)
      }));
      automation.addLocales(localeConfigs)
        .catch(error => console.error('Error during locale automation:', error));
    } else {
      console.error('Invalid arguments. Use --add-most-used or --locales=code1,code2');
    }
  } else {
    console.log('Usage:');
    console.log('  --add-most-used    Add the 12 most used languages on the Internet');
    console.log('  --locales=code1,code2   Add specific locales');
    console.log('  --setup-github-action  Setup GitHub Action workflow');
  }
}

// Helper functions to get flags and names for locales
function getFlagForLocale(code: string): string {
  const flagMap: { [key: string]: string } = {
    'en': '🇺🇸',
    'zh': '🇨🇳',
    'es': '🇪🇸',
    'ar': '🇸🇦',
    'pt': '🇧🇷',
    'id': '🇮🇩',
    'fr': '🇫🇷',
    'ja': '🇯🇵',
    'ru': '🇷🇺',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'hi': '🇮🇳'
  };
  return flagMap[code] || '🌐';
}

function getLanguageNameForLocale(code: string): string {
  const nameMap: { [key: string]: string } = {
    'en': 'English',
    'zh': 'Chinese',
    'es': 'Spanish',
    'ar': 'Arabic',
    'pt': 'Portuguese',
    'id': 'Indonesian',
    'fr': 'French',
    'ja': 'Japanese',
    'ru': 'Russian',
    'de': 'German',
    'it': 'Italian',
    'hi': 'Hindi'
  };
  return nameMap[code] || code;
}

export { LocaleAutomation, LocaleConfig, mostUsedLanguages };