import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import { green, cyan, dim } from 'kolorist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type BackendArchitecture = 'layered' | 'feature' | 'hexagonal';

export interface ScaffoldOptions {
  projectName: string;
  targetDir: string;
  architecture: BackendArchitecture;
}

export async function scaffoldProject(options: ScaffoldOptions): Promise<void> {
  const { projectName, targetDir, architecture } = options;

  // Find production root directory
  const candidateRoots = [
    path.resolve(__dirname, '../..'), // if inside production/cli/dist
    path.resolve(__dirname, '../../production'), // if inside root/cli/dist
    path.resolve(__dirname, '..'), // if inside production/cli
  ];

  let prodRoot = candidateRoots.find((p) => fs.existsSync(path.join(p, 'templates/backends'))) ||
                 candidateRoots.find((p) => fs.existsSync(path.join(p, 'production/templates/backends')));

  if (!prodRoot) {
    prodRoot = path.resolve(__dirname, '../../production');
  }

  let templatesBase = path.join(prodRoot, 'templates/backends');
  if (!fs.existsSync(templatesBase)) {
    templatesBase = path.join(prodRoot, 'production/templates/backends');
  }

  const selectedBackendSrc = path.join(templatesBase, architecture);

  if (!fs.existsSync(selectedBackendSrc)) {
    throw new Error(`Backend template '${architecture}' not found at: ${selectedBackendSrc}`);
  }

  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  // 1. Copy selected Backend template
  const targetBackendDir = path.join(targetDir, 'backend');
  await fs.copy(selectedBackendSrc, targetBackendDir, {
    filter: (src) => !src.includes('target') && !src.includes('.git'),
  });

  // 2. Copy Frontend if available
  const productionFrontend = path.join(prodRoot, 'frontend');
  const targetFrontendDir = path.join(targetDir, 'frontend');
  if (fs.existsSync(productionFrontend)) {
    await fs.copy(productionFrontend, targetFrontendDir, {
      filter: (src) => !src.includes('node_modules') && !src.includes('dist'),
    });
  }

  // 3. Copy Shared Infrastructure & Agent OS
  const sharedFiles = [
    { src: path.join(prodRoot, 'docker-compose.yml'), dest: path.join(targetDir, 'docker-compose.yml') },
    { src: path.join(prodRoot, '.env.example'), dest: path.join(targetDir, '.env.example') },
    { src: path.join(prodRoot, '.gitignore'), dest: path.join(targetDir, '.gitignore') },
    { src: path.join(prodRoot, 'README.md'), dest: path.join(targetDir, 'README.md') },
  ];

  for (const item of sharedFiles) {
    if (fs.existsSync(item.src)) {
      await fs.copy(item.src, item.dest);
    }
  }

  // Copy .agents/ OS
  const agentsSrc = path.join(prodRoot, '.agents');
  const agentsDest = path.join(targetDir, '.agents');
  if (fs.existsSync(agentsSrc)) {
    await fs.copy(agentsSrc, agentsDest);
  }

  // Copy docs/ scaffold
  const docsSrc = path.join(prodRoot, 'docs');
  const docsDest = path.join(targetDir, 'docs');
  if (fs.existsSync(docsSrc)) {
    await fs.copy(docsSrc, docsDest);
  }

  // 4. Token Replacement (Interpolation)
  const pomXmlPath = path.join(targetBackendDir, 'pom.xml');
  if (fs.existsSync(pomXmlPath)) {
    let pomContent = await fs.readFile(pomXmlPath, 'utf-8');
    pomContent = pomContent.replace(
      /<artifactId>spring-react-awesome-kit-backend<\/artifactId>/g,
      `<artifactId>${projectName}-backend</artifactId>`
    );
    pomContent = pomContent.replace(
      /<name>spring-react-awesome-kit-backend<\/name>/g,
      `<name>${projectName}-backend</name>`
    );
    await fs.writeFile(pomXmlPath, pomContent, 'utf-8');
  }

  // Replace package.json name if frontend exists
  const packageJsonPath = path.join(targetFrontendDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    let pkgContent = await fs.readFile(packageJsonPath, 'utf-8');
    pkgContent = pkgContent.replace(
      /"name":\s*"[^"]*"/,
      `"name": "${projectName}-frontend"`
    );
    await fs.writeFile(packageJsonPath, pkgContent, 'utf-8');
  }

  // Generate kit.config.json for AI Agent context
  const kitConfig = {
    projectName,
    backendArchitecture: architecture,
    generatedAt: new Date().toISOString(),
    kitVersion: "1.0.0"
  };
  await fs.writeJson(path.join(targetDir, 'kit.config.json'), kitConfig, { spaces: 2 });
}
