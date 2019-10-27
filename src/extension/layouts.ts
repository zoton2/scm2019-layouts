import { ExtensionReturn, Timer } from '../../../nodecg-speedcontrol/types';
import { get } from './util/nodecg';
import obs from './util/obs';

const nodecg = get();
const { sendMessage } = nodecg.extensions['nodecg-speedcontrol'] as unknown as ExtensionReturn;
const timer = nodecg.Replicant<Timer>('timer', 'nodecg-speedcontrol');

timer.on('change', (newVal, oldVal) => {
  if (oldVal && oldVal.state !== 'finished' && newVal.state === 'finished') {
    nodecg.sendMessage('refreshIntermission');
  }
});

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
