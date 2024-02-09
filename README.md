# Buddyblast

## TODO: Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Get Started

- Clone the repo
- Download dependencies by running `npm install` in the terminal, in the root `buddyblast` folder
  - make sure Node is installed and up-to-date, either manually or with Homebrew
- Fire up the dev environment with `npm run dev`
- Check out the prod environment by building `npm run build` and preview `npm run preview`

## VSCode configuration

To improve developer experience we commit the VSCode workspace configuration.

### Extensions

- Prettier is used for good default formatting to avoid non-functional merge conflicts
- ESLint lets the team enjoy errors at compile rather than on runtime
- Conventional Commits makes it easy for the team to write good commits
- GitLab workflow makes working with GitLab easier
- npm Intellisense gives us autocomplete for npm
- Tailwind CSS Intellisense gives us autocomplete for Tailwind CSS

### Settings/Good defaults

- tabSize is set to 2 to avoid merge conflicts
- formatOnSave is a good setting to enable in combination with Prettier as the default formatter
- defaultFormatter is Prettier

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
