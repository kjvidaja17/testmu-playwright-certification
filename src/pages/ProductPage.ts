import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly firstProductCard: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
    
        // 1. Your logic applied: Select the first product matching the locator card group
        this.firstProductCard = page.locator('.product-card').first();
    
        // 2. Transformed to modern locator syntax instead of raw page.click()
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    }

    // 3. Asynchronous action methods to drive the UI
    async selectFirstProduct(): Promise<void> {
        await this.firstProductCard.click();
    }

    async addItemToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
