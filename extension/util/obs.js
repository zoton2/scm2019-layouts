"use strict";
/* eslint @typescript-eslint/ban-ts-ignore: off */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const obs_websocket_js_1 = __importDefault(require("obs-websocket-js"));
const nodecg_1 = require("./nodecg");
const nodecg = nodecg_1.get();
const config = nodecg.bundleConfig.obs;
// Extending the OBS library with some of our own functions.
class OBSUtility extends obs_websocket_js_1.default {
    /**
     * Change to this OBS scene.
     * @param name Name of the scene.
     */
    changeScene(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.send('SetCurrentScene', { 'scene-name': name });
            }
            catch (err) {
                nodecg.log.warn(`Cannot change OBS scene [${name}]: ${err.error}`);
                throw err;
            }
        });
    }
    /**
     * Change to the intermission based on name in config.
     */
    changeToIntermission() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.changeScene(config.names.scenes.intermission);
            }
            catch (err) {
                // err
            }
        });
    }
    /**
     * Mute or unmute the named OBS source.
     * @param source Name of the source.
     */
    toggleSourceAudio(source, mute = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.send('SetMute', { source, mute });
            }
            catch (err) {
                nodecg.log.warn(`Cannot mute OBS source [${source}]: ${err.error}`);
                throw err;
            }
        });
    }
    /**
     * Mute all audio sources listed in the config.
     */
    muteAudio() {
        return __awaiter(this, void 0, void 0, function* () {
            config.names.audioToMute.forEach((source) => {
                this.toggleSourceAudio(source, true).catch(() => { });
            });
        });
    }
    /**
     * Unmute all audio sources listed in the config.
     */
    unmuteAudio() {
        return __awaiter(this, void 0, void 0, function* () {
            config.names.audioToUnmute.forEach((source) => {
                this.toggleSourceAudio(source, false).catch(() => { });
            });
        });
    }
}
const obs = new OBSUtility();
const settings = {
    address: config.address,
    password: config.password,
};
function connect() {
    obs.connect(settings).then(() => {
        nodecg.log.info('OBS connection successful.');
    }).catch((err) => {
        nodecg.log.warn('OBS connection error.');
        nodecg.log.debug('OBS connection error:', err);
    });
}
if (config.enable) {
    nodecg.log.info('Setting up OBS connection.');
    connect();
    obs.on('ConnectionClosed', () => {
        nodecg.log.warn('OBS connection lost, retrying in 5 seconds.');
        setTimeout(connect, 5000);
    });
    // @ts-ignore: Pretty sure this emits an error.
    obs.on('error', (err) => {
        nodecg.log.warn('OBS connection error.');
        nodecg.log.debug('OBS connection error:', err);
    });
}
exports.default = obs;
