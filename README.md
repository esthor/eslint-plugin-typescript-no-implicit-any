# eslint-plugin-typescript-no-implicit-any

This ESLint plugin provides a rule for detecting function parameters that receive an implicit `any` type in TypeScript code. It can optionally insert `: any` to make the parameter type explicit when using ESLint's `--fix` option.

## Installation

Install the plugin as a development dependency:

```bash
npm install --save-dev eslint-plugin-typescript-no-implicit-any
```

## Usage

Add `typescript-no-implicit-any` to the list of plugins in your ESLint configuration and enable the rule `no-implicit-any-params`.

```js
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['typescript-no-implicit-any'],
  rules: {
    'typescript-no-implicit-any/no-implicit-any-params': 'error',
  },
};
```

Running ESLint on the following code will produce an error because the parameter `msg` has no type annotation and is implicitly `any`:

```ts
function log(msg) {
  console.log(msg);
}
```

### Autofix

The rule includes a fixer that can add `: any` to parameters lacking a type. Run ESLint with the `--fix` flag to apply it:

```bash
npx eslint src --fix
```

After fixing, the previous example becomes:

```ts
function log(msg: any) {
  console.log(msg);
}
```

