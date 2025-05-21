# TODO

This repository contains an unfinished ESLint plugin named `eslint-plugin-typescript-no-implicit-any`. The goal is to catch cases where function parameters in TypeScript code end up with an implicit `any` type. Only a stub rule (`no-implicit-any-params`) currently exists and tests are minimal.

## Minimum Viable Product Plan

1. **Finalize rule logic**
   - Update `rules/no-implicit-any-params.ts` to use TypeScript parser services and the `TypeChecker` so that a parameter is only reported when its type is truly `any` and not otherwise inferrable.
   - Optionally provide a fixer that inserts `: any` to make the implicit type explicit.

2. **Create full tests**
   - Implement comprehensive Jest tests using `RuleTester` under `tests/no-implicit-any-params.test.ts`.
   - Cover parameters that are annotated, inferred, and implicitly `any`.

3. **Build pipeline**
   - Add a `build` script to compile TypeScript to a `dist/` directory with `tsc`.
   - Ensure the compiled plugin exports its rules from `dist` for publishing.

4. **Documentation**
   - Write a `README.md` explaining installation, usage, configuration of the rule, and examples.

5. **Package configuration**
   - Update `package.json` for proper entry points and publishing settings.
   - Optionally include an `.npmignore` to keep source and tests out of the package.

This scope provides a workable ESLint plugin that highlights implicit `any` on function parameters and can be extended with additional rules in the future.
