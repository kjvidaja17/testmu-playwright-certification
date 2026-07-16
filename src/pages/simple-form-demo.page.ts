import type {
  Locator,
  Page,
} from '@playwright/test';

export class SimpleFormDemoPage {
  readonly messageInput: Locator;
  readonly getCheckedValueButton: Locator;
  readonly displayedMessage: Locator;

  constructor(page: Page) {
    this.messageInput = page.getByPlaceholder(
      'Please enter your Message',
    );

    this.getCheckedValueButton =
      page.getByRole('button', {
        name: 'Get Checked Value',
        exact: true,
      });

    this.displayedMessage =
      page.locator('#message');
  }

  async enterMessage(
    message: string,
  ): Promise<void> {
    await this.messageInput.fill(message);
  }

  async clickGetCheckedValue(): Promise<void> {
    await this.getCheckedValueButton.click();
  }
}