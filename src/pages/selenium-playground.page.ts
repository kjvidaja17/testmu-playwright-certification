import type {
  Locator,
  Page,
} from '@playwright/test';

export class SeleniumPlaygroundPage {
  private readonly simpleFormDemoLink: Locator;

  constructor(
    private readonly page: Page,
  ) {
    this.simpleFormDemoLink =
      page.getByRole('link', {
        name: 'Simple Form Demo',
        exact: true,
      });
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://www.testmuai.com/selenium-playground/',
    );
  }

  async openSimpleFormDemo(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(
        /simple-form-demo/,
        {
          waitUntil: 'load',
        },
      ),

      this.simpleFormDemoLink.click(),
    ]);
  }
}