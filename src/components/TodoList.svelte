<script>
    import TodoItem from "./TodoItem.svelte";

    export let todos;
</script>

<ul>
    {#each todos as todo}
        <TodoItem {todo} />
    {/each}
</ul>