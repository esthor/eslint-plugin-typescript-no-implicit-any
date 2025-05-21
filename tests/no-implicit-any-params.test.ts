import { TSESLint } from '@typescript-eslint/utils';
import rule from '../rules/no-implicit-any-params';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-implicit-any-params', rule, {
  valid: [
    'function typed(a: string) {}',
  ],
  invalid: [
    {
      code: 'function untyped(a) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
      output: 'function untyped(a: any) {}',
    },
  ],
});
