import clone from 'clone';
import { ReplicantBrowser } from 'nodecg/types/browser'; // eslint-disable-line import/no-unresolved
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Host } from '../../schemas';

Vue.use(Vuex);

const replicantNames = [
  'host',
];
const replicants: ReplicantBrowser<unknown>[] = [];

export const store = new Vuex.Store({
  state: {
    host: '' as Host,
  },
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

replicantNames.forEach((name) => {
  const replicant = nodecg.Replicant(name);

  replicant.on('change', (newVal) => {
    store.commit('updateReplicant', {
      name: replicant.name,
      value: clone(newVal),
    });
  });

  replicants.push(replicant);
});

export async function create(): Promise<Store<{ host: Host }>> {
  return NodeCG.waitForReplicants(...replicants).then(() => store);
}
