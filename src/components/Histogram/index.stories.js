import { withKnobs, number } from '@storybook/addon-knobs';
import Histogram from '.';

export default {
  component: Histogram,
  title: 'Histogram',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: { Histogram },
  template: '<Histogram :histogram-data="ratings"/>',
  props: {
    ratings: {
      default: () =>
        new Array(number('length', 50, {}, 'data'))
          .fill(0)
          .map(() => Math.random() * number('values range', 100, {}, 'data')),
    },
  },
});
