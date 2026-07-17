import type {
  Locator,
  Page,
} from '@playwright/test';

export class DragDropSlidersPage {
  readonly default15Slider: Locator;
  readonly default15RangeValue: Locator;

  constructor(
    private readonly page: Page,
  ) {
    this.default15Slider =
      page.locator(
        'input[type="range"][value="15"]',
      );

    this.default15RangeValue =
      page.locator('#rangeSuccess');
  }

  async dragDefault15SliderTo(
    targetValue: number,
  ): Promise<void> {
    await this.default15Slider
      .scrollIntoViewIfNeeded();

    const sliderBox =
      await this.default15Slider.boundingBox();

    if (!sliderBox) {
      throw new Error(
        'Unable to determine the slider position.',
      );
    }

    const min = Number(
      (await this.default15Slider
        .getAttribute('min')) ?? '0',
    );

    const max = Number(
      (await this.default15Slider
        .getAttribute('max')) ?? '100',
    );

    const currentValue = Number(
      await this.default15Slider.inputValue(),
    );

    if (
      targetValue < min ||
      targetValue > max
    ) {
      throw new Error(
        `Target value ${targetValue} must be ` +
          `between ${min} and ${max}.`,
      );
    }

    const valueToXCoordinate = (
      value: number,
    ): number => {
      const percentage =
        (value - min) / (max - min);

      return (
        sliderBox.x +
        sliderBox.width * percentage
      );
    };

    const sliderY =
      sliderBox.y + sliderBox.height / 2;

    const startX =
      valueToXCoordinate(currentValue);

    const targetX =
      valueToXCoordinate(targetValue);

    await this.page.mouse.move(
      startX,
      sliderY,
    );

    await this.page.mouse.down();

    await this.page.mouse.move(
      targetX,
      sliderY,
      {
        steps: 20,
      },
    );

    await this.page.mouse.up();

    const valueAfterDrag = Number(
      await this.default15Slider.inputValue(),
    );

    const difference =
      targetValue - valueAfterDrag;

    if (Math.abs(difference) > 3) {
      throw new Error(
        `Slider drag ended at ${valueAfterDrag} ` +
          `instead of near ${targetValue}.`,
      );
    }

    if (difference !== 0) {
      await this.default15Slider.focus();

      const correctionKey =
        difference > 0
          ? 'ArrowRight'
          : 'ArrowLeft';

      for (
        let count = 0;
        count < Math.abs(difference);
        count += 1
      ) {
        await this.default15Slider.press(
          correctionKey,
        );
      }
    }
  }
}