import { test as base } from '@playwright/test';
// 1. Import your Page Object Classes
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';

// 2. Your custom type declaration applied flawlessly!
type MyPages = {
    shopPage: ShopPage;
    productPage: ProductPage;
    cartPage: CartPage;
    profilePage: ProfilePage;
};

// 3. Extend the base Playwright test object to include your custom fixtures
export const test = base.extend<MyPages>({
    shopPage: async ({ page }, use) => {
        // Automatically creates an instance of ShopPage when called
        await use(new ShopPage(page));
    },
    productPage: async ({ page }, use) => {
        // Automatically creates an instance of ProductPage when called
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        // Automatically creates an instance of CartPage when called
        await use(new CartPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    }
});

// 4. Export the base expect object so everything can be imported from one single file
export { expect } from '@playwright/test';
