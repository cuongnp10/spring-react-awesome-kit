#!/usr/bin/env node

import { Command } from 'commander';
import * as p from '@clack/prompts';
import { green, cyan, bold, dim, yellow } from 'kolorist';
import { printBanner } from './banner.js';
import { runInteractivePrompts } from './prompts.js';
import { scaffoldProject, BackendArchitecture } from './scaffolder.js';
import path from 'node:path';

const program = new Command();

program
  .name('create-spring-react-kit')
  .description('Interactive CLI Scaffolder for Spring Boot + React Awesome Kit')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project directory')
  .option('-a, --arch <architecture>', 'Backend architecture (layered, feature, hexagonal)')
  .action(async (projectNameArg, options) => {
    printBanner();
    p.intro(bold(cyan('🚀 Welcome to Spring Boot & React Awesome Scaffolder')));

    let projectName = projectNameArg;
    let architecture = options.arch as BackendArchitecture | undefined;

    // Validate CLI arch flag if provided
    if (architecture && !['layered', 'feature', 'hexagonal'].includes(architecture)) {
      p.log.error(yellow(`Invalid architecture '${architecture}'. Valid options: layered, feature, hexagonal`));
      architecture = undefined;
    }

    let targetDir = projectName ? path.resolve(process.cwd(), projectName) : '';

    if (!projectName || !architecture) {
      const answers = await runInteractivePrompts(projectName);
      projectName = answers.projectName;
      targetDir = answers.targetDir;
      architecture = answers.architecture;
    }

    const s = p.spinner();
    s.start(`Scaffolding ${cyan(projectName)} with ${green(architecture)} architecture...`);

    try {
      await scaffoldProject({
        projectName,
        targetDir,
        architecture,
      });

      s.stop(`Successfully scaffolded ${bold(green(projectName))}!`);

      p.note(
        [
          `cd ${projectName}`,
          `docker compose up -d              ${dim('# Start PostgreSQL 16 & Mailpit')}`,
          `cd backend && ./mvnw spring-boot:run ${dim('# Run Spring Boot API')}`,
          `cd ../frontend && npm install && npm run dev ${dim('# Run React UI')}`,
        ].join('\n'),
        'Next steps to get started'
      );

      p.outro(green('✨ Happy Coding with Spring Boot, React & AI Agents!'));
    } catch (err: any) {
      s.stop('Scaffolding failed!');
      p.log.error(err.message || String(err));
      process.exit(1);
    }
  });

program.parse(process.argv);
