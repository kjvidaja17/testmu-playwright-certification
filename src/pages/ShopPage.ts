import { Page, Locator } from '@playwright/test';

export class ShopPage {
    // 1. Declare structural types for your class properties
    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        // 2. Initialize the search bar locator using a resilient user-facing selector
        this.searchInput = page.getByPlaceholder('Search products...');
    }

    // 3. Create an asynchronous action method to handle searching
    async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }
}
