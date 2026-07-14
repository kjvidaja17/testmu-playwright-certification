import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly bioText: Locator;
    readonly profilePicInput: Locator;
    readonly saveButton: Locator;
    readonly successBanner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bioText = page.frameLocator('iframe#bio-frame').getByPlaceholder('Enter your bio');
        // Targeting the functional file input element by its user-facing label
        this.profilePicInput = page.getByLabel('Upload Profile Picture');
        this.saveButton = page.getByRole('button', { name: 'Save Changes' });
        this.successBanner = page.locator('#success-banner');
    }

    async updateProfile(filePath: string): Promise<void> {
        await this.bioText.clear();
        await this.profilePicInput.setInputFiles(filePath);

        // Handle the simultaneous network click event safely to prevent race conditions
        await Promise.all([
            this.page.waitForResponse(
                (resp) => resp.url().includes(
                    '/api/v1/profile/save'
                ) && resp.status() === 200
            ),
            await this.saveButton.click()
        ]);
    }
}
