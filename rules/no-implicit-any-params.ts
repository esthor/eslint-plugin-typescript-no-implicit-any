import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

export const RULE_NAME = "no-implicit-any-params";
export type MessageIds = "noImplicitAnyRequired | else";
export type Options = [];

const createRule = ESLintUtils.RuleCreator((name) => RULE_NAME);

export default createRule({
  create: (context) => {
    // Totally gonna snatch these nice helpers from the `typedef` typescript-eslint rule: https://github.com/typescript-eslint/typescript-eslint/blob/dc58ff5da99989510fdbbe5575a31acd320b1808/packages/eslint-plugin/src/rules/typedef.ts
    // TODO: Add more of those helpers, especially for ancestors; big issue is not to just warn on ALL instances of lacking explicity typedefs (I.e., we want to ONLY report if a type could not be inferred by TS, so it is truly an implicit any according to TS.)
    function report(location: TSESTree.Node, name?: string): void {
      context.report({
        node: location,
        messageId: "noImplicitAnyRequired",
        data: { name },
        fix: (fixer) => {
          return location ? fixer.insertTextAfter(location, ": any") : null;
        },
      });
    }

    function getNodeName(
      node: TSESTree.Parameter | TSESTree.PropertyName
    ): string | undefined {
      return node.type === AST_NODE_TYPES.Identifier ? node.name : undefined;
    }

    function checkParameters(params: TSESTree.Parameter[]): void {
      for (const param of params) {
        let annotationNode: TSESTree.Node | undefined;

        switch (param.type) {
          case AST_NODE_TYPES.AssignmentPattern:
            annotationNode = param.left;
            break;
          case AST_NODE_TYPES.TSParameterProperty:
            annotationNode = param.parameter;

            // Check TS parameter property with default value like `constructor(private param: string = 'something') {}`
            if (
              annotationNode &&
              annotationNode.type === AST_NODE_TYPES.AssignmentPattern
            ) {
              annotationNode = annotationNode.left;
            }

            break;
          default:
            annotationNode = param;
            break;
        }

        if (annotationNode !== undefined && !annotationNode.typeAnnotation) {
          report(param, getNodeName(param));
        }
      }
    }

    return {
      // FunctionDeclaration(node) {
      "FunctionDeclaration, FunctionExpression"(
        node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression
      ): void {
        checkParameters(node.params);
      },
    };
  },
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "no implicit any types in function params",
      recommended: "error",
    },
    fixable: "code",
    schema: [],
    messages: {
      noImplicitAnyRequired:
        "You should write an annotation. And I think you can do better that an *explicit* any, too.",
      else: ":shrug:",
    },
  },
  defaultOptions: [],
});
