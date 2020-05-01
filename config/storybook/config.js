import { configure, addDecorator } from '@storybook/vue';
import vuetifyConfig from '../../src/plugins/vuetify';
import { VApp, VContent } from 'vuetify/lib';

// import '@mdi/font/css/materialdesignicons.css';

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  vuetify: vuetifyConfig,
  // components: { VApp, VContent },
  template: '<v-app><v-content><story/></v-content></v-app>',
}));

const req = require.context('../../src/', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
