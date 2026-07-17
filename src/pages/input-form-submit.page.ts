import type {
  Locator,
  Page,
} from '@playwright/test';

export type InputFormData = {
  name: string;
  email: string;
  password: string;
  company: string;
  website: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  zipCode: string;
};

export class InputFormSubmitPage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly companyInput: Locator;
  private readonly websiteInput: Locator;
  private readonly countrySelect: Locator;
  private readonly cityInput: Locator;
  private readonly addressLine1Input: Locator;
  private readonly addressLine2Input: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly submitButton: Locator;

  readonly selectedCountryOption: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.nameInput =
      page.getByPlaceholder('Name', {
        exact: true,
      });

    this.emailInput =
      page.getByPlaceholder('Email', {
        exact: true,
      });

    this.passwordInput =
      page.getByPlaceholder('Password', {
        exact: true,
      });

    this.companyInput =
      page.locator('#company');

    this.websiteInput =
      page.getByPlaceholder('Website', {
        exact: true,
      });

    this.countrySelect =
      page.locator(
        'select[name="country"]',
      );

    this.cityInput =
      page.getByPlaceholder('City', {
        exact: true,
      });

    this.addressLine1Input =
      page.locator('#inputAddress1');

    this.addressLine2Input =
      page.getByPlaceholder(
        'Address 2',
        {
          exact: true,
        },
      );

    this.stateInput =
      page.locator('#inputState');

    this.zipCodeInput =
      page.getByPlaceholder(
        'Zip code',
        {
          exact: true,
        },
      );

    this.submitButton =
      page.getByRole('button', {
        name: 'Submit',
        exact: true,
      });

    this.selectedCountryOption =
      this.countrySelect.locator(
        'option:checked',
      );

    this.successMessage =
      page.locator('.success-msg');
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async getNameValidationMessage():
    Promise<string> {
    return this.nameInput.evaluate(
      (element) =>
        (
          element as HTMLInputElement
        ).validationMessage,
    );
  }

  async fillForm(
    data: InputFormData,
  ): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(
      data.password,
    );

    await this.companyInput.fill(
      data.company,
    );

    await this.websiteInput.fill(
      data.website,
    );

    await this.countrySelect.selectOption({
      label: data.country,
    });

    await this.cityInput.fill(data.city);

    await this.addressLine1Input.fill(
      data.addressLine1,
    );

    await this.addressLine2Input.fill(
      data.addressLine2,
    );

    await this.stateInput.fill(data.state);

    await this.zipCodeInput.fill(
      data.zipCode,
    );
  }
}