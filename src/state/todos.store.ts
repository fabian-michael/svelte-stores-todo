import { createDraft } from 'immer';
import { v4 as uuid } from 'uuid';
import { writable, derived } from 'svelte/store';
import { createApi, ActionCallback } from './utils';

// 1️⃣ Declare types 
// --------------------------------------------------------

export type Todo = {
    id: string,
    title: string;
    done: boolean;
}
type TodoState = Todo[];
type TodoAction<Payload=void> = ActionCallback<TodoState, Payload>

// 2️⃣ Create store 
// --------------------------------------------------------

const initialState: TodoState = [];
const store = writable(initialState);

// 3️⃣ Create views (derived stores)
// --------------------------------------------------------

export const todos = derived(store, state => state);
export const doneTodos = derived(store, (todos) => todos.filter(todo => todo.done));
export const openTodos = derived(store, (todos) => todos.filter(todo => !todo.done));

// 4️⃣ Create API
// --------------------------------------------------------

/** Creates and adds a new todo item */
const addTodo: TodoAction<string> = (state, title) => {
    state.push({
        id: uuid(),
        title,
        done: false
    })
}

/** Removes a todo by id */
const removeTodo: TodoAction<string> = (state, id) => {
    return state.filter(todo => todo.id !== id);
}

/** Sets the done status by id */
const setDone: TodoAction<{ id: string, done: boolean }> = (state, {id, done}) => {
    const todo = state.find(todo => todo.id === id);
    if (todo) todo.done = done;
};

/** Toggles the done status by id */
const toggleDone: TodoAction<string> = (state, id) => {
    const todo = state.find(todo => todo.id === id);
    if (todo) todo.done = !todo.done;
};

/** Reset store to initalState */
const reset: TodoAction = () => {
    return createDraft(initialState);
};

export const todosApi = createApi(store, {
    addTodo,
    removeTodo,
    setDone,
    toggleDone,
    reset
});