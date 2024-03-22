# React TypeScript Vite Template

This project is a template for quickly starting a React project with TypeScript, Vite, ESLint, Prettier, and Husky pre-commit hooks.

## Features

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast, modern build tooling that serves your code via native ES Module imports.
- **ESLint**: A pluggable linting utility for JavaScript and JSX.
- **Prettier**: An opinionated code formatter.
- **Husky**: Git hooks made easy.

## Project Structure

- `src/`: Contains the source code files.
- `.eslintrc.cjs`: ESLint configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `.prettierrc`: Prettier configuration file.
- `husky/`: Contains Husky pre-commit hooks configuration.
- `.vscode/settings.json`: VSCode editor settings.

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Tinnapat-S/your-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project
   ```

3. Install dependencies using [pnpm](https://pnpm.io/):

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm lint`: Lint the source code using ESLint.
- `pnpm format`: Format the source code using Prettier.

## VSCode Settings

To enable auto-formatting on save in VSCode, make sure the following settings are configured in your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Contributing

```
Feel free to contribute to this project by opening issues or pull requests.
```
