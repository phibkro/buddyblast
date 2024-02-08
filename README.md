# Buddyblast

## TODO: Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## TODO: Installation

Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Tech-stack

### Typescript

Typescript is essential for our workflow as it provides us with type safety and a better development experience (DX).

### Linting

ESlint is used for linting. Our configs lie in .eslintrc.cjs. To manually test the linting of the project run the command

`npm run lint`

### Formatting (Prettier)

Prettier is our choice of formatter.
To manually format the project run

`npm run format`

in the app directory.\
Our team prefers to use the VSCode Prettier extension with the "Format on save" option enabled.
That way it is practically impossible to push unformatted code.

`.prettierrc` contains our configurations so everyone has the same formatting rules.
These are set to the defaults with the exception of enabling plugins.

#### Plugins

The plugins we use are:

- "prettier-plugin-organize-imports"
- "prettier-plugin-tailwindcss"

These sort and clean up our imports and tailwind classes so to avoid meaningless merge conflicts.

### React

Javascript frameworks are a staple of modern web development and React is our choice for its popularity and ease of use.

### Vite

Vite is our required frontend build tool. No configuration is required outside of whats included in the repo.

### Tailwind

Tailwind is our choice for in-line styling.
It is popular for good reasons.
The development experience (DX) it provides lets us focus on making a good website without having to bother with the intricacies of plain css.

### shadcn/ui

Shadcn/ui or Shadui for short is a collection of re-usable components that you can copy and paste into your apps.
This is not a component library in the sense that it is not a dependency.

We use shadcn/ui components as our base and build on top of the sensible defaults it provides.

## Commit messages

We follow the conventional commits specifications described in <https://www.conventionalcommits.org/en/v1.0.0/>

[more concise and web oriented document](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

We also use the conventional commits VSCode extension for ease of use

### Template

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.
