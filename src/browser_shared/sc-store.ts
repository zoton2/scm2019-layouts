import clone from 'clone';
import { ReplicantBrowser } from 'nodecg/types/browser'; // eslint-disable-line import/no-unresolved
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { RunDataActiveRunSurrounding } from '../../../nodecg-speedcontrol/schemas';
import { RunDataActiveRun, RunDataArray, Timer } from '../../../nodecg-speedcontrol/types';

Vue.use(Vuex);

const replicantNames = [
  'runDataActiveRun',
  'runDataArray',
  'runDataActiveRunSurrounding',
  'timer',
];
const replicants: ReplicantBrowser<unknown>[] = [];

export const store = new Vuex.Store({
  state: {
    runDataActiveRun: null as RunDataActiveRun,
    runDataArray: [] as RunDataArray,
    runDataActiveRunSurrounding: {} as RunDataActiveRunSurrounding,
    timer: {} as Timer,
  },
  mutations: {
    updateReplicant(state, { name, value }): void {
      Vue.set(state, name, value);
    },
  },
});

replicantNames.forEach((name) => {
  const replicant = nodecg.Replicant(name, 'nodecg-speedcontrol');

  replicant.on('change', (newVal) => {
    store.commit('updateReplicant', {
      name: replicant.name,
      value: clone(newVal),
    });
  });

  replicants.push(replicant);
});

export async function create(): Promise<Store<{
  runDataActiveRun: RunDataActiveRun;
  runDataArray: RunDataArray;
  runDataActiveRunSurrounding: RunDataActiveRunSurrounding;
  timer: Timer;
}>> {
  return NodeCG.waitForReplicants(...replicants).then(() => store);
}
