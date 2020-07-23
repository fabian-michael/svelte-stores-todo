import { Draft, produce } from 'immer';
import { Writable } from 'svelte/store';

export type Action<Payload> = (payload: Payload) => void;
export type ActionCallback<State, Payload=void> = (state: Draft<State>, payload?: Payload) => void;
type StateTypeOf<Store> = Store extends Writable<infer State> ? State : never;

export const createAction = <
	Payload,
	Store extends Writable<any>,
	State extends StateTypeOf<Store>
>(store: Store, callback: ActionCallback<State, Payload>): Action<Payload> =>
	(payload: Payload) => {
		store.update(state => produce(callback)(state, payload));
	}


export const createApi = <
	Store extends Writable<any>,
	State extends StateTypeOf<Store>,
	ActionCallbacks extends {
		[name: string]: ActionCallback<State, any>
	},
	Api extends {
		[K in keyof ActionCallbacks]: ActionCallbacks[K] extends ActionCallback<State, void>
		? Action<void>
		: ActionCallbacks[K] extends ActionCallback<State, infer Payload>
		? Action<Payload>
		: never
	}
>(store: Store, callbacks: ActionCallbacks): Api => {
	const actions: any = {};
	for (const [name, callback] of Object.entries(callbacks)) {
		actions[name] = createAction(store, callback);
	}
	return actions;
}