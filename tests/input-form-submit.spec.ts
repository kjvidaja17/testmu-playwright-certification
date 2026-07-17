import {
  expect,
  test,
} from '../src/fixtures/testmu.fixture';

import {
  SeleniumPlaygroundPage,
} from '../src/pages/selenium-playground.page';

import {
  InputFormSubmitPage,
  type InputFormData,
} from '../src/pages/input-form-submit.page';

test.describe('TestMu AI Input Form Submit', () => {
  test(
    'validates required fields and submits the completed form',
    async ({ page }) => {
      const expectedSuccessMessage =
        'Thanks for contacting us, ' +
        'we will get back to you shortly.';

      const formData: InputFormData = {
        name: 'Kenneth John Vidaja',
        email: 'kenneth.vidaja@example.com',
        password: 'TestMu123!',
        company: 'QA Automation Labs',
        website: 'https://example.com',
        country: 'United States',
        city: 'New York',
        addressLine1: '123 Test Automation Street',
        addressLine2: 'Suite 100',
        state: 'New York',
        zipCode: '10001',
      };

      const playgroundPage =
        new SeleniumPlaygroundPage(page);

      const inputFormPage =
        new InputFormSubmitPage(page);

      await test.step(
        'Open the Selenium Playground',
        async () => {
          await playgroundPage.open();
        },
      );

      await test.step(
        'Open Input Form Submit',
        async () => {
          await playgroundPage
            .openInputFormSubmit();

          await expect(page).toHaveURL(
            /input-form-demo/,
          );
        },
      );

      await test.step(
        'Submit the empty form',
        async () => {
          await inputFormPage
            .clickSubmit();
        },
      );

      await test.step(
        'Validate the required-field error',
        async () => {
          const validationMessage =
            await inputFormPage
              .getNameValidationMessage();

          expect(
            validationMessage,
            'Expected the browser to display the required-field message',
          ).toMatch(
            /please.*fill.*field/i,
          );
        },
      );

      await test.step(
        'Fill all form fields',
        async () => {
          await inputFormPage.fillForm(
            formData,
          );

          await expect(
            inputFormPage
              .selectedCountryOption,
          ).toHaveText(
            'United States',
          );
        },
      );

      await test.step(
        'Submit the completed form',
        async () => {
          await inputFormPage
            .clickSubmit();
        },
      );

      await test.step(
        'Validate the success message',
        async () => {
          await expect(
            inputFormPage.successMessage,
          ).toBeVisible();

          await expect(
            inputFormPage.successMessage,
          ).toHaveText(
            expectedSuccessMessage,
          );
        },
      );
    },
  );
});