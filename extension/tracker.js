"use strict";
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
const needle_1 = __importDefault(require("needle"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const nodecg_1 = require("./util/nodecg");
const nodecg = nodecg_1.get();
const eventShort = 'scm2019';
const repeaterURL = 'https://donate.speedsouls.com';
const statsURL = 'https://donate.speedsouls.com/1?json';
const repeater = socket_io_client_1.default(repeaterURL, { path: '/repeater/socket.io' });
const donationTotal = nodecg.Replicant('donationTotal');
// Get donation total from HTTPS API, backup for the repeater socket server.
// We need to add both events together to get the correct total.
function updateDontationTotalFromAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield needle_1.default('get', statsURL);
            if (resp.statusCode !== 200) {
                throw new Error(JSON.stringify(resp.body));
            }
            const total = resp.body.agg.amount ? parseFloat(resp.body.agg.amount) : 0;
            if (donationTotal.value !== total) {
                nodecg.log.info(`API donation total changed: $${total}`);
            }
            donationTotal.value = total;
        }
        catch (err) {
            nodecg.log.info('Issue getting API donation total:', err);
        }
    });
}
// Getting the initial donation total on startup.
updateDontationTotalFromAPI();
setInterval(updateDontationTotalFromAPI, 60000); // Also do this every 60s as a socket fallback.
repeater.on('connect', () => nodecg.log.info('Connected to repeater server:', repeaterURL));
repeater.on('connect_error', (err) => nodecg.log.warn('Repeater connect_error:', err));
repeater.on('disconnect', () => nodecg.log.warn('Disconnected from repeater'));
repeater.on('error', (err) => nodecg.log.warn('Repeater error:', err));
// Triggered when a new donation that can be shown on stream is received.
repeater.on('donation', (data) => {
    if (data.event === eventShort) {
        nodecg.log.info(`Received new donation with ID ${data.id}`);
        nodecg.sendMessage('newDonation', data);
    }
});
// Triggered when the updated donation total is received.
repeater.on('total', (data) => {
    if (data.event === eventShort) {
        donationTotal.value = parseFloat(data.new_total);
    }
    nodecg.log.info(`Updated donation total received: $${parseFloat(data.new_total).toFixed(2)}`);
});
