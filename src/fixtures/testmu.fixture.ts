import {
  chromium,
  expect,
  test as base,
  type Browser,
  type BrowserContext,
  type Page,
  type TestInfo,
} from '@playwright/test';

const playwrightClientVersion = (
  require('playwright/package.json') as {
    version: string;
  }
).version;

export type TestMuBrowserName =
  | 'pw-chromium'
  | 'pw-firefox';

export type TestMuOptions = {
  testMuBrowserName: TestMuBrowserName;
  testMuBrowserVersion: string;
  testMuPlatform: string;
};

export const test = base.extend<TestMuOptions>({
  testMuBrowserName: [
    'pw-chromium',
    {
      option: true,
    },
  ],

  testMuBrowserVersion: [
    'latest',
    {
      option: true,
    },
  ],

  testMuPlatform: [
    'Windows 10',
    {
      option: true,
    },
  ],

  page: [
    async (
      {
        testMuBrowserName,
        testMuBrowserVersion,
        testMuPlatform,
      },
      use,
      testInfo,
    ) => {
      const username = process.env.LT_USERNAME;
      const accessKey = process.env.LT_ACCESS_KEY;

      if (!username || !accessKey) {
        throw new Error(
          'Missing LT_USERNAME or LT_ACCESS_KEY. ' +
            'Add both variables to your .env file.',
        );
      }

      const capabilities = {
        browserName: testMuBrowserName,
        browserVersion: testMuBrowserVersion,

        'LT:Options': {
          platform: testMuPlatform,

          build:
            process.env.LT_BUILD_NAME ??
            'Playwright TypeScript POM Assignment',

          name:
            `${testInfo.title} - ` +
            `${testInfo.project.name}`,

          projectName:
            'TestMu AI Selenium Playground',

          user: username,
          accessKey,

          network: true,
          video: true,
          console: true,
          visual: true,

          playwrightClientVersion,
          useSpecificBundleVersion: true,
        },
      };

      const wsEndpoint =
        'wss://cdp.lambdatest.com/playwright' +
        `?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities),
        )}`;

      let browser: Browser | undefined;
      let context: BrowserContext | undefined;
      let cloudPage: Page | undefined;

      try {
        browser = await chromium.connect(
          wsEndpoint,
          {
            timeout: 300_000,
          },
        );

        context = await browser.newContext({
          viewport: {
            width: 1920,
            height: 1080,
          },
        });

        cloudPage = await context.newPage();

        await use(cloudPage);
      } finally {
        const passed =
          testInfo.status ===
          testInfo.expectedStatus;

        const remark = passed
          ? 'Test completed successfully'
          : testInfo.error?.message ??
            `Test finished with status: ${
              testInfo.status
            }`;

        if (
          cloudPage &&
          !cloudPage.isClosed()
        ) {
          if (!passed) {
            await attachFailureScreenshot(
              cloudPage,
              testInfo,
            );
          }

          await setTestMuStatus(
            cloudPage,
            passed,
            remark,
          );
        }

        await context
          ?.close()
          .catch(() => {});

        await browser
          ?.close()
          .catch(() => {});
      }
    },

    {
      scope: 'test',
      timeout: 330_000,
    },
  ],
});

async function attachFailureScreenshot(
  page: Page,
  testInfo: TestInfo,
): Promise<void> {
  try {
    const screenshot = await page.screenshot({
      fullPage: true,
    });

    await testInfo.attach('failure-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  } catch {
    // Do not replace the original test failure.
  }
}

async function setTestMuStatus(
  page: Page,
  passed: boolean,
  remark: string,
): Promise<void> {
  const command =
    `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: {
        status: passed ? 'passed' : 'failed',
        remark: remark.slice(0, 255),
      },
    })}`;

  try {
    await page.evaluate(
      () => {},
      command,
    );
  } catch {
    // Do not replace the original test result.
  }
}

export { expect };