import { withKnobs, number } from '@storybook/addon-knobs';
import BarChart from '.';

export default {
  component: BarChart,
  title: 'Bar chart',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: { BarChart },
  template: '<BarChart :bar-chart-data="ratings"/>',
  props: {
    ratings: {
      default: () =>
        new Array(number('length', 50, {}, 'data'))
          .fill(0)
          .map(() => Math.random() * number('values range', 100, {}, 'data')),
    },
  },
});
