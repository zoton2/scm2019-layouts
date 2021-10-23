import { Asset } from '@scm2019-layouts/types';
import { DonationTotal, Host } from '@scm2019-layouts/types/schemas';
import clone from 'clone';
import type { ReplicantBrowser } from 'nodecg/types/browser';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { RunDataActiveRun, RunDataArray, Timer } from '../../../nodecg-speedcontrol/src/types';
import { RunDataActiveRunSurrounding } from '../../../nodecg-speedcontrol/src/types/schemas';

Vue.use(Vuex);

const replicantList: { name: string; bundle?: string }[] = [
  { name: 'host' },
  { name: 'donationTotal' },
  { name: 'assets:sponsor-logos' },
  { name: 'runDataActiveRun', bundle: 'nodecg-speedcontrol' },
  { name: 'runDataArray', bundle: 'nodecg-speedcontrol' },
  { name: 'runDataActiveRunSurrounding', bundle: 'nodecg-speedcontrol' },
  { name: 'timer', bundle: 'nodecg-speedcontrol' },
];
const replicants: ReplicantBrowser<unknown>[] = [];

interface StoreTypes {
  host: Host;
  donationTotal: DonationTotal;
  'assets:sponsor-logos': Asset[];
  runDataActiveRun: RunDataActiveRun;
  runDataArray: RunDataArray;
  runDataActiveRunSurrounding: RunDataActiveRunSurrounding;
  timer: Timer;
}

export const store = new Vuex.Store<StoreTypes>({
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

export async function create(): Promise<Store<StoreTypes>> {
  return NodeCG.waitForReplicants(...replicants).then(() => store);
}
