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

export type RectType = {
  id: string
  top: number
  fill: string
  left: number
  width: number
  height: number
}

//declare state
export type State = { counter: number; name: string; canvasObject: RectType[] }

//set state
const state: State = {
  counter: 0,
  name: 'John Doe',
  canvasObject: [
    {
      width: 50,
      height: 50,
      fill: 'blue',
      left: 0,
      top: 0,
      id: '1'
    },
    {
      width: 50,
      height: 50,
      fill: 'red',
      left: 60,
      top: 60,
      id: '2'
    }
  ]
}

// mutations and action enums

export enum MutationTypes {
  ADD_RECT = 'ADD_RECT',
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
  [MutationTypes.ADD_RECT](state: S, payload: RectType): void
}

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.INC_COUNTER](state: State, payload: number) {
    state.counter += payload
  },
  [MutationTypes.UPDATE_NAME](state: State, payload: string) {
    state.name = payload
  },
  [MutationTypes.ADD_RECT](state: State, payload: RectType) {
    state.canvasObject.push(payload)
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
  getLengthCanvasObject(state: State): number
}

//getters

export const getters: GetterTree<State, State> & Getters = {
  doubleCounter: (state) => {
    console.log('state', state.counter)
    return state.counter * 2
  },
  getLengthCanvasObject: (state) => {
    return state.canvasObject.length
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
