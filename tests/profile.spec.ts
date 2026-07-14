// Core import from your unified custom fixtures hub
import { test, expect } from '../src/fixtures';

test('Clear bio, update profile picture, save changes', async ({ page, profilePage }) => {
    
    // Navigate straight to the profile landing zone
    await page.goto('https://testmu-staging-site.com');
    
    // Execute your automated POM action method cleanly with the correct avatar payload
    await profilePage.updateProfile('tests/data/avatar.jpg');

    // Run your web-first state validation assertion right inside the spec file
    await expect(profilePage.successBanner).toBeVisible();
    await expect(profilePage.successBanner).toContainText('Profile Updated Successfully');

});