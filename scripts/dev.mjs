import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOCAL = path.join(ROOT, '.mereos-local-dev');
const DEV_ROOT = path.join(LOCAL, 'dev');

let cleanedUp = false;
let viteProcess = null;

function log(msg) {
	console.log(`[mereos-dev] ${msg}`);
}

function writeFile(relPath, content) {
	const full = path.join(LOCAL, relPath);
	fs.mkdirSync(path.dirname(full), { recursive: true });
	fs.writeFileSync(full, content, 'utf8');
}

const UI_DIR = path.join(__dirname, 'dev-ui');

function readUiTemplate(name) {
	return fs.readFileSync(path.join(UI_DIR, name), 'utf8');
}

function createDevAssets() {
	fs.rmSync(LOCAL, { recursive: true, force: true });
	fs.mkdirSync(DEV_ROOT, { recursive: true });

	const projectRoot = ROOT.replace(/\\/g, '/');

	const browserCompatPlugin = fs.readFileSync(
		path.join(UI_DIR, 'browser-compat-plugin.mjs'),
		'utf8',
	);

	const mainJs = readUiTemplate('main.js').replaceAll('__PROJECT_ROOT__', projectRoot);

	const viteConfig = `import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { browserCompatPlugin } from './browser-compat-plugin.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = ${JSON.stringify(projectRoot)};

export default defineConfig({
	root: path.join(__dirname, 'dev'),
	server: {
		port: 5173,
		open: true,
		fs: { allow: [projectRoot, __dirname] },
		watch: {
			ignored: ['**/.mereos-local-dev/**'],
		},
	},
	plugins: [browserCompatPlugin(projectRoot)],
	optimizeDeps: {
		include: ['twilio-video', '@tensorflow/tfjs', 'i18next'],
	},
	resolve: {
		alias: {
			mereos: path.join(projectRoot, 'index.js'),
		},
	},
});
`;

	writeFile('browser-compat-plugin.mjs', browserCompatPlugin);
	writeFile('dev/defaults.js', readUiTemplate('defaults.js'));
	writeFile('dev/main.js', mainJs);
	writeFile('dev/index.html', readUiTemplate('index.html'));
	writeFile('vite.config.mjs', viteConfig);

	log(`Created temporary dev files in ${LOCAL}`);
}

function cleanup() {
	if (cleanedUp) return;
	cleanedUp = true;
	log('Stopping — removing local dev files...');
	fs.rmSync(LOCAL, { recursive: true, force: true });
	log('Cleanup complete.');
}

function killViteProcess() {
	if (!viteProcess || viteProcess.killed) return;

	if (process.platform === 'win32') {
		spawn('taskkill', ['/pid', String(viteProcess.pid), '/T', '/F'], { stdio: 'ignore', shell: true });
	} else {
		viteProcess.kill('SIGTERM');
	}
}

function startVite() {
	const viteBin = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
	const configPath = path.join(LOCAL, 'vite.config.mjs');

	viteProcess = spawn(process.execPath, [viteBin, '--config', configPath], {
		cwd: ROOT,
		stdio: 'inherit',
		shell: false,
	});

	viteProcess.on('close', (code) => {
		cleanup();
		process.exit(code ?? 0);
	});

	viteProcess.on('error', (err) => {
		console.error(err);
		cleanup();
		process.exit(1);
	});
}

function shutdown() {
	if (viteProcess && !viteProcess.killed) {
		killViteProcess();
	} else {
		cleanup();
		process.exit(0);
	}
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', () => {
	if (!cleanedUp) cleanup();
});

try {
	log('Setting up local development environment...');
	createDevAssets();
	log('Starting Vite on http://localhost:5173/');
	log('Press Ctrl+C to stop — all temporary files will be removed.');
	log('No source or test files are modified.');
	startVite();
} catch (err) {
	console.error(err);
	cleanup();
	process.exit(1);
}
