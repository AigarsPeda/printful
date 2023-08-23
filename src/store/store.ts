import {
  createStore,
  type MutationTree,
  type ActionContext,
  type ActionTree,
  type GetterTree,
  Store as VuexStore,
  type CommitOptions,
  type DispatchOptions,
  createLogger
} from 'vuex'

//declare state
export type State = { counter: number; name: string }

//set state
const state: State = { counter: 0, name: 'John Doe' }

// mutations and action enums

export enum MutationTypes {
  INC_COUNTER = 'SET_COUNTER',
  UPDATE_NAME = 'UPDATE_NAME'
}

export enum ActionTypes {
  INC_COUNTER = 'SET_COUNTER'
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.INC_COUNTER](state: S, payload: number): void
  [MutationTypes.UPDATE_NAME](state: S, payload: string): void
}

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.INC_COUNTER](state: State, payload: number) {
    state.counter += payload
  },
  [MutationTypes.UPDATE_NAME](state: State, payload: string) {
    state.name = payload
  }
}

//actions

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

// actions interface

export interface Actions {
  [ActionTypes.INC_COUNTER]({ commit }: AugmentedActionContext, payload: number): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INC_COUNTER]({ commit }, payload: number) {
    commit(MutationTypes.INC_COUNTER, payload)
  }
}

// Getters types
export type Getters = {
  doubleCounter(state: State): number
}

//getters

export const getters: GetterTree<State, State> & Getters = {
  doubleCounter: (state) => {
    console.log('state', state.counter)
    return state.counter * 2
  }
}

//setup store type
export type Store = Omit<VuexStore<State>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger()]
})

export function useStore() {
  return store as Store
}
