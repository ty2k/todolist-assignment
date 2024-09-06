# Fixes to To Do List

This documents my fixes to the To Do List application.

## Changes

### Missing `key` prop on `TodoItem`

Upon running the `dev` script to start the application, the terminal displays a warning:

```sh
todolist-assignment on  main via ⬢ v20.17.0
➜ npm run dev

> react-todo-app@0.1.0 dev
> next dev

 ⚠ Port 3000 is in use, trying 3001 instead.
 ⚠ Port 3001 is in use, trying 3002 instead.
  ▲ Next.js 14.2.6
  - Local:        http://localhost:3002

 ✓ Starting...
 ✓ Ready in 1138ms
 ○ Compiling / ...
 ✓ Compiled / in 5.2s (275 modules)
Warning: Each child in a list should have a unique "key" prop.

Check the top-level render call using <ul>. See https://reactjs.org/link/warning-keys for more information.
    at TodoItem (webpack-internal:///./src/components/TodoItem.tsx:15:25)
    at TodoList (webpack-internal:///./src/components/TodoList.tsx:15:25)
    at div
    at Home (webpack-internal:///./src/pages/index.tsx:36:78)
    at App (webpack-internal:///./src/pages/_app.tsx:11:16)
    at StyleRegistry (/Users/tykrys/code/todolist-assignment/node_modules/styled-jsx/dist/index/index.js:449:36)
    at eU (/Users/tykrys/code/todolist-assignment/node_modules/next/dist/compiled/next-server/pages.runtime.dev.js:8:20468)
    at eH (/Users/tykrys/code/todolist-assignment/node_modules/next/dist/compiled/next-server/pages.runtime.dev.js:17:1765)
    at eJ (/Users/tykrys/code/todolist-assignment/node_modules/next/dist/compiled/next-server/pages.runtime.dev.js:17:3068)
    at div
    at e9 (/Users/tykrys/code/todolist-assignment/node_modules/next/dist/compiled/next-server/pages.runtime.dev.js:26:761)
 GET / 200 in 5327ms
```

This is caused by [the need to pass a unique `key` prop to JSX elements](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) being rendered from inside of a `.map()` function.

As a fix, I added a `key` prop to the instances of the `<TodoItem>` rendered by the `<TodoList>`. The `key` prop is built using the Todo object's `id` property, which I am assuming to be unique.

### Missing `event.preventDefault()` call in AddTodoForm `handleSubmit()` function

The `AddTodoForm` is built using a genuine `<form>` element with a `<button type="submit">` to add the new todo item. Because of this, the default behavior for submitting a form is a page reload. In a React Single Page Application (SPA) like ours, we need to carefully manage this behavior to make sure our application state is updated the way we expect. In this case, I added an `event.preventDefault()` to allow the `handleSubmit()` function to work as expected. See React's [Preventing default behavior](https://react.dev/learn/responding-to-events#preventing-default-behavior) documentation.

### Mutating state in `AddTodo()` function

The `AddTodo()` function in the `Home` component has a confusing name. In React code bases, [it is conventional](https://letsreact.org/capitalizing-reactjs-component-names/) to only use a leading capital letter in function names when the function is returning a React component. While this function can be made to work with a leading capital letter, it is preferable to keep its casing consistent, so I renamed it to `addTodo()`.

More importantly for this function, it is initially written in a way mutates a stateful variable. Changing stateful variables in place in React causes the UI to become stale, since a stateful variable mutation doesn't cause a component re-render. See React's [Don't mutate state](https://letsreact.org/capitalizing-reactjs-component-names/) documentation for details. To fix this, I used JavaScript's [`structuredClone()` global function](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to make a deep clone copy of the `todos` state variable before mutating my copy and calling `setTodos()`.

With this fixed, new todo items can be added to our `Home` component's state as expected.

### Fix conditional logic in `displayTodos()`

This function was incorrectly double-displaying the "Implement user authentication" and never displaying the non-urgent, non-complete todo items. I fixed the logic by removing the check for `displayUrgent` within the `if/else` block, since we are already checking the state of `displayUrgent` to enter the block. I also set the `else` block to use `!x.isUrgent`, since we are in a condition where `displayUrgent` is false.

### Fix filter logic in `deleteTodo()`

This function was incorrectly deleting everything but the intended todo item. I fixed it by reversing the conditional in the `filter()` function.

### Fix `toggleProperty()` state mutation and dependency array

The `toggleProperty()` function was directly mutating the state of the of the `todo` item that met the `if` condition. I've fixed this by using `structuredClone()` to make a copy of the `todo` and then working on that copy before returning it.

Additionally, I added `todos` to the `useCallback()` dependency array to make sure that the state of `todos` is correct when `toggleProperty()` is called.

### Fix CSS class `.todo-item` logic in TodoItem

The way the nested ternary statements in `<li className={}>` were written, it meant that the complete items (with `.todo-item-complete`) were having more vertical margin applied to their `<h3>` tags than incomplete items. This makes no sense, since we would expect completed items to be less visually "important" than incomplete items. I updated the class assignment logic and simplified the CSS by removing the now-duplicate rules for `.todo-item` and `.todo-item-urgent`.

---

Original instructions below.

---

# To Do List

In our increasingly complex and ever-evolving business landscape demand is constantly growing for simple, intuitive, and lightly space-themed task management software.

Are you tired of your current To Do List solutions letting you down during crucial moments? Well, look no further than the To Do List app!

Now, every rose has its thorns and the To Do List app is no different.

Early user testing has indicated that the app is riddled with bugs and borderline unusable... This is where you come in!

## The Assignment

This project features a collection of introduced bugs. Your task is to find & fix 6 issues (intentional or unintentional), and briefly describe your rationale for the change.

The scope of this assignment is limited to the `.tsx` files. You're welcome to change things to your liking, but running the development server (following the [steps below](#getting-started)) is expected to work with no additional warnings or errors, and only changes to the `.tsx` files will be considered.

**Let's make this To Do List a To Done List!**

## Getting Started

First, install the dependencies:

`npm install`

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
