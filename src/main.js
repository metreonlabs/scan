import './assets/main.css';

import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import utils from './plugins/utils';

const store = createStore({
    state() {
        return {
            messages: [],
            network: 'mainnet'
        };
    },
    mutations: {
        setMessages(state, messages) {
            state.messages = messages;
        },
        setNetwork(state, network) {
            state.network = network;
            console.log(network);
        }
    }
});

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(utils);
app.use(store);

app.mount('#app');
