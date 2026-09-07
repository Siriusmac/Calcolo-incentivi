import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.mjs', 'calculator.mjs', 'site.webmanifest']) {
  await copyFile(file, `dist/${file}`);
}
console.log('Static site prepared in dist/');

await cp('icons', 'dist/icons', { recursive: true });
