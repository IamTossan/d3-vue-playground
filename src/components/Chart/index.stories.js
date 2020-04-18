import Chart from '.';

export default {
  component: Chart,
  title: 'Chart',
};

export const basic = () => ({
  components: { Chart },
  template: '<chart />',
});
