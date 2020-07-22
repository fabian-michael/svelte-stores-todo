<svelte:options immutable={true} />

<script lang="ts">
    import {todosAPI, Todo} from '../state/todos.store';

    export let todo: Todo;

    function handleToggle() {
        todosAPI.toggleDone(todo.id);
    }
</script>

<li>{JSON.stringify(todo)} <button on:click={handleToggle} class="bg-gray-300 rounded" class:bg-green-500={todo.done}>{todo.done}</button></li>