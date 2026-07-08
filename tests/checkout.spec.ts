// After applying the custom fixtures, the test can be rewritten as follows:

// 1. CRITICAL: Import 'test' and 'expect' from your local fixtures file instead
import { test, expect } from '../src/fixtures';

// 2. Destructure your page classes directly into the test arguments!
test('Using Fixtures: Search, add to cart, and verify correct pricing', async ({ page, shopPage, productPage, cartPage }) => {
  
    // No "new PageObject()" instantiation lines needed here anymore!
  
    await page.goto('https://testmu-staging-site.com');

    await shopPage.searchForProduct('Premium Wireless Headphones');
    await productPage.selectFirstProduct();
    await productPage.addItemToCart();

    await page.goto('https://testmu-staging-site.com');

    await expect(cartPage.checkoutTotalText).toHaveText('$99.00');
});

// 
// 
// Below is the old code before applying the custom fixtures:
// 
// 
// import { test, expect } from '@playwright/test';
// // 1. Import your 3 newly created custom Page Object Classes
// import { ShopPage } from '../src/pages/ShopPage';
// import { ProductPage } from '../src/pages/ProductPage';
// import { CartPage } from '../src/pages/CartPage';

// test('Search, add to cart, and verify correct pricing', async ({ page }) => {
//     // 2. Initialize your class instances using the core syntax
//     const shopPage = new ShopPage(page);
//     const productPage = new ProductPage(page);
//     const cartPage = new CartPage(page);

//     // 3. Step 1: Navigate to the storefront layout view
//     await page.goto('https://testmu-staging-site.com');

//     // 4. Step 2: Drive the UI through your asynchronous action methods
//     await shopPage.searchForProduct('Premium Wireless Headphones');
//     await productPage.selectFirstProduct();
//     await productPage.addItemToCart();

//     // 5. Step 3: Explicitly navigate to the checkout zone URL
//     await page.goto('https://testmu-staging-site.com');

//     // 6. Step 4: Execute a robust, web-first polling assertion
//     // Notice we pass the locator element FROM the cartPage instance directly into expect()!
//     await expect(cartPage.checkoutTotalText).toHaveText('$99.00');
// });
