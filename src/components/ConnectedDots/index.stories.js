import { withKnobs, number } from '@storybook/addon-knobs';
import ConnectedDots from '.';

export default {
  component: ConnectedDots,
  title: 'Connected dots',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: { ConnectedDots },
  template: '<ConnectedDots :chart-data="chartData"/>',
  props: {
    chartData: {
      default: () =>
        new Array(number('dot amount', 5, {}, 'data'))
          .fill(0)
          .map((_, idx) => ({
            x: Math.random() * number('values range', 100, {}, 'data'),
            y: Math.random() * number('values range', 100, {}, 'data'),
            description: `This is dot number: ${idx}`,
          })),
    },
  },
});
