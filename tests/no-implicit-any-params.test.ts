import { TSESLint } from '@typescript-eslint/utils';
import rule from '../rules/no-implicit-any-params';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-implicit-any-params', rule, {
  valid: [
    // annotated parameter
    'function typed(a: string) {}',
    // multiple annotated parameters
    'function typedMany(a: number, b: string) {}',
    // parameter explicitly annotated as any
    'function explicitAny(a: any) {}',
    // parameter with both annotation and default value
    'const typedDefault = function(a: number = 1) {};',
    // destructured parameter with type annotation
    'function destructured({a}: { a: string }) {}',
  ],
  invalid: [
    {
      code: 'function untyped(a) {}',
      output: 'function untyped(a: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      code: 'const expr = function(b) {}',
      output: 'const expr = function(b: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      code: 'function multipleUntyped(a, b: string) {}',
      output: 'function multipleUntyped(a: any, b: string) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      code: 'function destructured({a}) {}',
      output: 'function destructured({a}: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
  ],
});
