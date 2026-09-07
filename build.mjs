import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.mjs', 'calculator.mjs']) {
  await copyFile(file, `dist/${file}`);
}
console.log('Static site prepared in dist/');
