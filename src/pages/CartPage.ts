import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    // Declare the locator property for the total price text field
    readonly checkoutTotalText: Locator;

    constructor(page: Page) {
        this.page = page;
        // Target the price display element using a clean text locator
        this.checkoutTotalText = page.locator('.cart-total-price');
    }
}
