import { TSESLint } from '@typescript-eslint/utils';
import rule from '../rules/no-implicit-any-params';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

// Test suite for the "no-implicit-any-params" rule. Each test demonstrates a
// particular scenario that should either pass or fail under the rule.  The rule
// simply checks whether a parameter has an explicit type annotation.  It does
// *not* attempt to infer types using TypeScript's type checker.

ruleTester.run('no-implicit-any-params', rule, {
  valid: [
    // Plain typed parameter should pass
    'function typed(a: string) {}',

    // Multiple annotated parameters
    'function typedMany(a: number, b: string) {}',

    // Default parameters that include a type are allowed
    'function defaultTyped(a: number = 1) {}',
    'const typedDefault = function(a: number = 1) {};',

    // Parameter properties with explicit type annotations are valid
    'class A { constructor(private p: string) {} }',

    // Parameter properties with both a type and default value
    'class A { constructor(private p: string = "foo") {} }',

    // Destructured parameters require a type on the pattern
    'function destructured({a}: { a: string }) {}',

    // Typed rest parameters are fine
    'function rest(...args: number[]) {}',

    // Arrow functions are ignored by this rule
    '(a) => {}',

    // Even an explicit `any` counts as typed
    'function explicitAny(a: any) {}',
  ],
  invalid: [
    {
      // Basic untyped parameter
      code: 'function untyped(a) {}',
      output: 'function untyped(a: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Default parameter without a type
      code: 'function defaultUntyped(a = 1) {}',
      output: 'function defaultUntyped(a: any = 1) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Parameter property lacking a type
      code: 'class A { constructor(private p) {} }',
      output: 'class A { constructor(private p: any) {} }',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Parameter property with default value but no type
      code: 'class A { constructor(private p = 1) {} }',
      output: 'class A { constructor(private p: any = 1) {} }',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Destructured object parameter without type annotation
      code: 'function destructured({a}) {}',
      output: 'function destructured({a}: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Rest parameter without an explicit type
      code: 'function rest(...args) {}',
      output: 'function rest(...args: any) {}',
      errors: [{ messageId: 'noImplicitAnyRequired' }],
    },
    {
      // Destructured array parameter without a type
      code: 'function destructuredArray([a]) {}',
      output: 'function destructuredArray([a]: any) {}',
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
  ],
});