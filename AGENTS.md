# AGENTS.md

## Essential Commands

- **Start the application**: `npm start`
- **Build the application**: `npm run build`
- **Development server**: `npm run dev`
- **Run migrations**: `npm run migrate:dev`

## Code Organization

The codebase is organized around the `src` directory which includes:
- `config`: Configuration files and database initialization.
- `routes`: All API routes organized by feature.

## Application Architecture

- Utilizes **Express** for server management.
- Controls data flow through routing modules, each handling different parts of the application (planning, transactions, category, auth, etc.).

## Naming Conventions

- Use camelCase for variables and function names.
- Use PascalCase for class names and module names.

## Testing Approach

Follow standard practices for testing using available tools, ensuring that tests are integrated into CI/CD flow if applicable.

## Important Gotchas

- Ensure environment variables are set up correctly in `.env` files for local development.
- Use `knex` for migrations and remember to point to the correct configuration based on the environment.
- Watch for **CORS** configuration when testing APIs, particularly in an external environment.

## Project-Specific Context

- The project uses TypeScript, so make sure to follow TypeScript conventions throughout the code.
- The application defaults to port **3000** unless specified in environment variables.