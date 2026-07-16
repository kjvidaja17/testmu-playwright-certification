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

test.describe('TestMu AI Simple Form Demo', () => {
  test(
    'displays the same message entered by the user',
    async ({ page }) => {
      const expectedMessage =
        'Welcome to TestMu AI';

      const playgroundPage =
        new SeleniumPlaygroundPage(page);

      const simpleFormDemoPage =
        new SimpleFormDemoPage(page);

      await test.step(
        'Open the Selenium Playground',
        async () => {
          await playgroundPage.open();
        },
      );

      await test.step(
        'Open the Simple Form Demo',
        async () => {
          await playgroundPage
            .openSimpleFormDemo();

          await expect(page).toHaveURL(
            /simple-form-demo/,
          );
        },
      );

      await test.step(
        'Enter the message',
        async () => {
          await expect(
            simpleFormDemoPage.messageInput,
          ).toBeVisible();

          await expect(
            simpleFormDemoPage.messageInput,
          ).toBeEditable();

          await simpleFormDemoPage
            .enterMessage(expectedMessage);

          /*
           * This assertion confirms the input was really
           * populated before the button is clicked.
           */
          await expect(
            simpleFormDemoPage.messageInput,
          ).toHaveValue(expectedMessage);
        },
      );

      await test.step(
        'Submit the message',
        async () => {
          await expect(
            simpleFormDemoPage
              .getCheckedValueButton,
          ).toBeVisible();

          await expect(
            simpleFormDemoPage
              .getCheckedValueButton,
          ).toBeEnabled();

          await simpleFormDemoPage
            .clickGetCheckedValue();
        },
      );

      await test.step(
        'Validate the displayed message',
        async () => {
          await expect(
            simpleFormDemoPage.displayedMessage,
          ).toBeVisible();

          await expect(
            simpleFormDemoPage.displayedMessage,
          ).toHaveText(expectedMessage);
        },
      );
    },
  );
});