"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodecg_1 = require("./util/nodecg");
const obs_1 = __importDefault(require("./util/obs"));
const nodecg = nodecg_1.get();
const { sendMessage } = nodecg.extensions['nodecg-speedcontrol'];
const timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');
timer.on('change', (newVal, oldVal) => {
    if (oldVal && oldVal.state !== 'finished' && newVal.state === 'finished') {
        nodecg.sendMessage('refreshIntermission');
    }
});
nodecg.listenFor('nextRun', (data, ack) => {
    sendMessage('changeToNextRun')
        .then(() => {
        // mute audio sources
        obs_1.default.changeToIntermission();
    })
        .catch(() => { })
        .finally(() => {
        if (ack && !ack.handled) {
            ack(null);
        }
    });
});
