/* eslint no-new: off, @typescript-eslint/explicit-function-return-type: off */

import Vue from 'vue';
import { create, store } from '../../browser_shared/replicant-store';
import vuetify from '../_misc/vuetify';
import App from './main.vue';

create().then(() => {
  new Vue({
    store,
    vuetify,
    el: '#App',
    render: (h) => h(App),
  });
});
