import { ExtensionReturn } from '../../../nodecg-speedcontrol/types';
import { get } from './util/nodecg';
import obs from './util/obs';

const nodecg = get();
const { sendMessage } = nodecg.extensions['nodecg-speedcontrol'] as unknown as ExtensionReturn;

nodecg.listenFor('nextRun', (data, ack) => {
  sendMessage('changeToNextRun')
    .then(() => {
      // mute audio sources
      obs.changeToIntermission();
    })
    .catch(() => {})
    .finally(() => {
      if (ack && !ack.handled) {
        ack(null);
      }
    });
});
