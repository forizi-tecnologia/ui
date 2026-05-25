import type { Plugin } from '@opencode-ai/plugin';

export const AutoFix: Plugin = async ({ $ }) => {
  return {
    'tool.execute.after': async (input) => {
      if (input.tool === 'edit' || input.tool === 'write' || input.tool === 'apply_patch') {
        await $`pnpm lint --fix 2> /dev/null || true`;
      }
    },
  };
};
