import {
  expect,
  test,
} from '../src/fixtures/testmu.fixture';

import {
  SeleniumPlaygroundPage,
} from '../src/pages/selenium-playground.page';

import {
  SimpleFormDemoPage,
} from '../src/pages/simple-form-demo.page';

test.describe(
  'TestMu AI Simple Form Demo',
  () => {
    test(
      'displays the same message entered by the user',
      async ({ page }) => {
        const expectedMessage =
          'Welcome to TestMu AI';

        const playgroundPage =
          new SeleniumPlaygroundPage(page);

        const simpleFormDemoPage =
          new SimpleFormDemoPage(page);

        // Step 1
        await playgroundPage.open();

        // Step 2
        await playgroundPage
          .openSimpleFormDemo();

        // Step 3
        await expect(page).toHaveURL(
          /simple-form-demo/,
        );

        // Steps 4 and 5
        await simpleFormDemoPage
          .enterMessage(expectedMessage);

        // Step 6
        await simpleFormDemoPage
          .clickGetCheckedValue();

        // Step 7
        await expect(
          simpleFormDemoPage.displayedMessage,
        ).toHaveText(expectedMessage);
      },
    );
  },
);