import QDialog from './components/QDialog.vue';
import { defaultOptions } from './config';

const Plugin = {
  install: (app, userOptions = {}) => {
    const options = {
      ...defaultOptions,
      ...userOptions,
    };

    app.component('QDialog', QDialog);
    app.provide('qDialog', {
      options,
    });
  },
};

export default Plugin;
