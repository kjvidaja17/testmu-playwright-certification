import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables safely from your hidden .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true, // Certification parallel requirement
    workers: 2,         // Safe processing limit for remote cloud grids
  
    use: {
        // Enable mandatory reporting artifacts globally
        screenshot: 'on',
        video: 'on',
        trace: 'retain-on-failure',
    },

    projects: [
        {
            name: 'testmu-cloud-chrome',
            use: {
                // Establishes the secure connection link away from your local machine
                connectOptions: {
                    wsEndpoint: `wss://cdp.testmu.ai/playwright?user=${process.env.TM_USERNAME}&key=${process.env.TM_ACCESS_KEY}`,
                },
                // Injects the mandatory reporting capabilities required by the exam portal
                launchOptions: {
                    capabilities: {
                        'browserName': 'Chrome',
                        'browserVersion': 'latest',
                        'platform': 'Windows 11',
                        'testmu:options': {
                            'network': true,      // Captures your network traffic logs
                            'console': true,      // Captures your console log outputs
                            'video': true,        // Records the visual execution
                            'screenshot': true    // Takes automated screen logs
                        }
                    }
                }
            },
        },
    ],
});
