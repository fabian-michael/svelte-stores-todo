<script>
	import { todos, openTodos, doneTodos, todosAPI } from "./state/todos.store";
	import { Form, Input } from "sveltejs-forms";
	import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
	import * as yup from "yup";
	import TodoItem from "./components/TodoItem.svelte";

	const formProps = {
		schema: yup.object().shape({
			todo: yup.string().required(),
		}),
	};

	async function handleSubmit ({detail: { values, resetForm }}) {
		todosAPI.addTodo(values.todo); 
		resetForm();
	}

	$: all = $todos;
	$: open = $openTodos;
	$: done = $doneTodos;
</script>

<style lang="postcss">
	
</style>

<div class="h-screen p-8 bg-gray-100 app">
	<div class="container max-w-lg">
		<div class="p-4 text-white bg-gray-800 rounded-lg shadow-xl">
			<Form {...formProps} on:submit={handleSubmit}>
				<label for="todo">Todo Title</label>
				<div class="">
					<div class="flex">
						<Input name="todo" id="todo" placeholder="Lorem ipsum ..." />
						<button type="submit" class="px-2 py-1 ml-4 bg-blue-500 rounded">
							Add
						</button>
						<button
							type="button"
							class="px-2 py-1 ml-4 bg-red-500 rounded"
							on:click={todosAPI.reset}>
							Reset
						</button>
					</div>
				</div>
			</Form>
		</div>

		<Tabs>
			<TabList>
				<Tab>All</Tab>
				<Tab>Open</Tab>
				<Tab>Done</Tab>
			</TabList>

			<TabPanel>
				<h2>All Todos</h2>
				<ul>
					{#each all as todo}
						<TodoItem {todo} />
					{/each}
				</ul>
			</TabPanel>

			<TabPanel>
				<h2>Open Todos</h2>
				<ul>
					{#each open as todo}
						<TodoItem {todo} />
					{/each}
				</ul>
			</TabPanel>

			<TabPanel>
				<h2>Done Todos</h2>
				<ul>
					{#each done as todo}
						<TodoItem {todo} />
					{/each}
				</ul>
			</TabPanel>
		</Tabs>
	</div>
</div>
