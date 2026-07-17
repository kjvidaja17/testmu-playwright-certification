import {
  expect,
  test,
} from '../src/fixtures/testmu.fixture';

import {
  SeleniumPlaygroundPage,
} from '../src/pages/selenium-playground.page';

import {
  DragDropSlidersPage,
} from '../src/pages/drag-drop-sliders.page';

test.describe('TestMu AI Drag & Drop Sliders', () => {
  test(
    'sets the Default value 15 slider to 95',
    async ({ page }) => {
      const targetValue = 95;

      const playgroundPage =
        new SeleniumPlaygroundPage(page);

      const slidersPage =
        new DragDropSlidersPage(page);

      await test.step(
        'Open the Selenium Playground',
        async () => {
          await playgroundPage.open();
        },
      );

      await test.step(
        'Open Drag & Drop Sliders',
        async () => {
          await playgroundPage
            .openDragDropSliders();

          await expect(page).toHaveURL(
            /drag-drop-range-sliders-demo/,
          );
        },
      );

      await test.step(
        'Validate the initial slider value',
        async () => {
          await expect(
            slidersPage.default15Slider,
          ).toBeVisible();

          await expect(
            slidersPage.default15Slider,
          ).toHaveValue('15');
        },
      );

      await test.step(
        'Drag the slider to 95',
        async () => {
          await slidersPage.dragDefault15SliderTo(
            targetValue,
          );
        },
      );

      await test.step(
        'Validate the displayed range value',
        async () => {
          await expect(
            slidersPage.default15Slider,
          ).toHaveValue(
            String(targetValue),
          );

          await expect(
            slidersPage.default15RangeValue,
          ).toHaveText(
            String(targetValue),
          );
        },
      );
    },
  );
});