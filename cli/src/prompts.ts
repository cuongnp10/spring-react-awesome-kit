import * as p from '@clack/prompts';
import { green, dim, yellow, cyan } from 'kolorist';
import path from 'node:path';
import fs from 'fs-extra';
import { BackendArchitecture } from './scaffolder.js';

export interface PromptResult {
  projectName: string;
  targetDir: string;
  architecture: BackendArchitecture;
}

export async function runInteractivePrompts(defaultProjectName?: string): Promise<PromptResult> {
  const project = await p.group(
    {
      projectName: () =>
        p.text({
          message: 'What is your project name?',
          placeholder: 'my-awesome-app',
          defaultValue: defaultProjectName || 'my-awesome-app',
          validate: (value) => {
            if (!value || value.trim().length === 0) return 'Project name is required!';
            if (!/^[a-zA-Z0-9-_]+$/.test(value)) return 'Project name may only contain letters, numbers, dashes and underscores.';
          },
        }),
      architecture: () =>
        p.select<
          { value: BackendArchitecture; label: string; hint?: string }[],
          BackendArchitecture
        >({
          message: 'Select backend architecture style:',
          options: [
            {
              value: 'layered',
              label: '🏛️  Academic Layered',
              hint: 'Standard university N-tier (controller/service/repository/entity). Matches SBA301/SWP/PRN.',
            },
            {
              value: 'feature',
              label: '📦 Feature-Sliced (Modular)',
              hint: 'Self-contained vertical slices (modules/product). Best for speed and indie startups.',
            },
            {
              value: 'hexagonal',
              label: '🔷 Modern Hexagonal (Clean)',
              hint: 'Ports & Adapters (domain/application/infrastructure/web). Claude Code enterprise favorite.',
            },
          ],
          initialValue: 'layered',
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    }
  );

  const targetDir = path.resolve(process.cwd(), project.projectName);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    const shouldOverwrite = await p.confirm({
      message: `Target directory '${project.projectName}' is not empty. Overwrite existing files?`,
      initialValue: false,
    });

    if (p.isCancel(shouldOverwrite) || !shouldOverwrite) {
      p.cancel('Scaffolding cancelled to protect existing directory.');
      process.exit(0);
    }
  }

  return {
    projectName: project.projectName,
    targetDir,
    architecture: project.architecture,
  };
}
