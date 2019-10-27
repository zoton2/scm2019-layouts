import clone from 'clone';
import { ReplicantBrowser } from 'nodecg/types/browser'; // eslint-disable-line import/no-unresolved
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { RunDataActiveRunSurrounding } from '../../../nodecg-speedcontrol/schemas';
import { RunDataActiveRun, RunDataArray, Timer } from '../../../nodecg-speedcontrol/types';
import { Host } from '../../schemas';

Vue.use(Vuex);

const replicantList: { name: string; bundle?: string }[] = [
  { name: 'host' },
  { name: 'runDataActiveRun', bundle: 'nodecg-speedcontrol' },
  { name: 'runDataArray', bundle: 'nodecg-speedcontrol' },
  { name: 'runDataActiveRunSurrounding', bundle: 'nodecg-speedcontrol' },
  { name: 'timer', bundle: 'nodecg-speedcontrol' },
];
const replicants: ReplicantBrowser<unknown>[] = [];

export const store = new Vuex.Store<{
  host: Host;
  runDataActiveRun: RunDataActiveRun;
  runDataArray: RunDataArray;
  runDataActiveRunSurrounding: RunDataActiveRunSurrounding;
  timer: Timer;
}>({
  mutations: {
    updateReplicant(state, { name, value }): void {
      Vue.set(state, name, value);
    },
    updateHost(state, value): void {
      const rep = replicants.find((repObj) => repObj.name === 'host') as ReplicantBrowser<Host>;
      Vue.set(state, 'host', value);
      rep.value = value;
    },
  },
});

replicantList.forEach((obj) => {
  const replicant = nodecg.Replicant(obj.name, obj.bundle || 'scm2019-layouts');

  replicant.on('change', (newVal) => {
    store.commit('updateReplicant', {
      name: replicant.name,
      value: clone(newVal),
    });
  });

  replicants.push(replicant);
});

export async function create(): Promise<Store<{
  host: Host;
  runDataActiveRun: RunDataActiveRun;
  runDataArray: RunDataArray;
  runDataActiveRunSurrounding: RunDataActiveRunSurrounding;
  timer: Timer;
}>> {
  return NodeCG.waitForReplicants(...replicants).then(() => store);
}
