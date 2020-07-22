import { Draft } from 'immer';
import { v4 as uuid } from 'uuid';
import { writable, derived } from 'svelte/store';
import { createAction, createApi } from './utils';

// 1️⃣ Declare types 
// --------------------------------------------------------

export interface Todo {
    id: string,
    title: string;
    done: boolean;
}

type State = Todo[];
type DraftState = Draft<State>;

// 2️⃣ Create store 
// --------------------------------------------------------

const initialState: State = [];
const store = writable(initialState);

// 3️⃣ Create views (derived stores)
// --------------------------------------------------------

export const todos = derived(store, state => state);
export const doneTodos = derived(store, (todos) => todos.filter(todo => todo.done));
export const openTodos = derived(store, (todos) => todos.filter(todo => !todo.done));

// 4️⃣ Create API
// --------------------------------------------------------

/** Creates and adds a new todo item */
const addTodo = (state: DraftState, title: string) => {
    state.push({
        id: uuid(),
        title,
        done: false
    })
}

/** Sets the done status by id */
export const setDone = (state: DraftState, {id, done}: { id: string, done: boolean }) => {
    const todo = state.find(todo => todo.id === id);
    if (todo) todo.done = done;
};

/** Toggles the done status by id */
export const toggleDone = (state: DraftState, id: string) => {
    const todo = state.find(todo => todo.id === id);
    if (todo) todo.done = !todo.done;
};

/** Reset store to initalState */
const reset = () => store.set(initialState);

export const todosAPI = createApi(store, {
    addTodo,
    setDone,
    toggleDone
});

export default todosAPI;