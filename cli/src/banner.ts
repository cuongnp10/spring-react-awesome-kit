import { cyan, bold, green } from 'kolorist';

export function printBanner(): void {
  const banner = `
  ${cyan('╔═══════════════════════════════════════════════════════════╗')}
  ${cyan('║')}  ${bold(green('★  SPRING BOOT & REACT AWESOME STARTER KIT  ★'))}         ${cyan('║')}
  ${cyan('║')}  Production-Ready • Java 21 LTS • Fullstack Scaffolder      ${cyan('║')}
  ${cyan('╚═══════════════════════════════════════════════════════════╝')}
  `;
  console.log(banner);
}
