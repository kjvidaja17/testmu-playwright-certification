import type {
  Locator,
  Page,
} from '@playwright/test';

export class SeleniumPlaygroundPage {
  private readonly simpleFormDemoLink: Locator;
  private readonly dragDropSlidersLink: Locator;
  private readonly inputFormSubmitLink: Locator;

  constructor(
    private readonly page: Page,
  ) {
    this.simpleFormDemoLink =
      page.getByRole('link', {
        name: 'Simple Form Demo',
        exact: true,
      });

    this.dragDropSlidersLink =
      page.getByRole('link', {
        name: 'Drag & Drop Sliders',
        exact: true,
      });

    this.inputFormSubmitLink =
      page.getByRole('link', {
        name: 'Input Form Submit',
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

    await this.page.waitForLoadState('load');
  }

  async openDragDropSliders(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(
        /drag-drop-range-sliders-demo/,
      ),

      this.dragDropSlidersLink.click(),
    ]);
  }

  async openInputFormSubmit(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(
        /input-form-demo/,
      ),

      this.inputFormSubmitLink.click(),
    ]);
  }
}