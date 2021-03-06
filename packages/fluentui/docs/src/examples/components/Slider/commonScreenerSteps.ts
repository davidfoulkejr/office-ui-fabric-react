import { Slider } from '@fluentui/react';

const selectors = {
  input: `.${Slider.slotClassNames.input}`
};

const focusSliderStep: ScreenerStep = (builder, keys) => builder.keys('body', keys.tab);

const getScreenerSteps = (): ScreenerSteps => [
  (builder, keys) => focusSliderStep(builder, keys).snapshot('Focuses the slider'),
  (builder, keys) =>
    focusSliderStep(builder, keys)
      .keys(selectors.input, keys.rightArrow)
      .keys(selectors.input, keys.rightArrow)
      .keys(selectors.input, keys.rightArrow)
      .keys(selectors.input, keys.rightArrow)
      .keys(selectors.input, keys.rightArrow)
      .snapshot('Navigates to the right with the right arrow key'),
  (builder, keys) =>
    focusSliderStep(builder, keys)
      .keys(selectors.input, keys.upArrow)
      .keys(selectors.input, keys.upArrow)
      .keys(selectors.input, keys.upArrow)
      .keys(selectors.input, keys.upArrow)
      .keys(selectors.input, keys.upArrow)
      .snapshot('Navigates to the right with the up arrow key')
];

export default getScreenerSteps;
