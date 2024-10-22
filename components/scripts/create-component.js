#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createComponent(name) {
  const componentDir = path.join(__dirname, '../src', name.toLowerCase());
  fs.mkdirSync(componentDir, { recursive: true });

  // Create index.jsx
  const indexContent = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import ${name} from './${name}'
import './styles.css'

const container = document.getElementById('${name.toLowerCase()}')
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <${name} />
    </React.StrictMode>,
  )
}
`.trim();

  // Create component file
  const componentContent = `
import React from 'react'

const ${name} = () => {
  return (
    <div className="w-full">
      {/* Component content */}
    </div>
  )
}

export default ${name}
`.trim();

  // Create styles file
  const stylesContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

  fs.writeFileSync(path.join(componentDir, 'index.jsx'), indexContent);
  fs.writeFileSync(path.join(componentDir, `${name}.jsx`), componentContent);
  fs.writeFileSync(path.join(componentDir, 'styles.css'), stylesContent);

  // Update vite.config.js with new component
  const viteConfig = path.join(__dirname, '../vite.config.js');
  let configContent = fs.readFileSync(viteConfig, 'utf8');
  const componentsArrayMatch = configContent.match(/const components = \[(.*?)\];/s);
  if (componentsArrayMatch) {
    const updatedComponentsArray = componentsArrayMatch[1]
      ? `${componentsArrayMatch[1]}, '${name.toLowerCase()}'`
      : `'${name.toLowerCase()}'`;
    configContent = configContent.replace(
      /const components = \[(.*?)\];/s,
      `const components = [${updatedComponentsArray}];`
    );
    fs.writeFileSync(viteConfig, configContent);
  }

  console.log(`Component ${name} created successfully!`);
}

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

createComponent(componentName);