const fs = require('fs');

const bootstrapSvg = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#7952B3" d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11z"/><path fill="#fff" d="M5.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.62c2.04 0 3.38-1.12 3.38-2.73 0-1.14-.64-1.92-1.68-2.22v-.08c.84-.28 1.41-1.07 1.41-2.02 0-1.48-1.13-2.45-2.92-2.45H5.5zm1.5 2.15h1.74c.94 0 1.48.47 1.48 1.1 0 .66-.54 1.15-1.48 1.15H7v-2.25zm0 3.32h1.92c1.09 0 1.68.51 1.68 1.25 0 .77-.6 1.3-1.68 1.3H7v-2.55z"/></svg>`;
const laragonSvg = `<svg viewBox="-58.57 -59.93 908.27 797.36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><linearGradient id="laragon-grad" gradientUnits="userSpaceOnUse" x1="400.117" x2="400.117" y1="22.293" y2="715"><stop offset=".018" stop-color="#3bb6ff"/><stop offset=".302" stop-color="#39afff"/><stop offset=".552" stop-color="#36a3ff"/><stop offset=".717" stop-color="#359fff"/><stop offset=".832" stop-color="#3398ff"/><stop offset=".964" stop-color="#3297ff"/></linearGradient><path d="M25.27 252.7c1.36-4.1 58.96-201.67 287.1-204.43 0 0 95.66-108.2 226 0 0 0 35.36 29.06 54.76 89.4 0 0 171.14 25.96 198.84 167.4 0 0 57.73 232.9-137.77 396.53 0 0-27.53 22.03-45.87 32.27 0 0-40.66.06-49.06 0-17.9-.14-29.2 0-45.47 0 0 0-25-8.94-26.03-37.5 0 0-2.1-99.34-1.54-116.5 0 0 .5-16.07-22.9-15.07 0 0-22.33-2.57-25.5 16.63 0 0-.53 102.47-1.03 120.64 0 0-1.57 30.23-35.37 31.7 0 0-121.16 3.66-137.26-2.07 0 0-28.07-5.2-30.17-31.73 0 0-22.9-135.2-27.03-177.27 0 0-76.97-42.67-92.57-54.1 0 0 5.2 137.77 53.03 196.03 0 0 8.34 7.3-8.33 17.67 0 0-6.23 5.2-12.5 2.13 0 0-205.17-114.6-129.6-407.1" fill="url(#laragon-grad)"/><path d="M254.93 441.17s179 102.03 287.3-61.77c0 0 87.7-114.53 52.77-236.7 0 0 61.5 102.67-57.5 261.97.03.03-100.9 142.03-282.57 36.5z" fill="#069"/><path d="M184.1 417.1s12.77 59.1-26.5 77.7c0 0-89.33-36.8-80.3-104.77 0 0 2.8-16.96 19.43-6.56 0 0 39.54 21.5 70.74 27.7-.04 0 15.83 1.46 16.63 5.93z" fill="#cee6ff"/><path d="M159.3 317.2s13.47-57.57 64.3-53.93c0 0 43.2 1.16 44.73 60.56 0 .04-34.03-88.83-109.03-6.63z" fill="#069"/></svg>`;

function fixFiles(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace Bootstrap
  const bsRegex = /name:\s*"Bootstrap"[\s\S]*?svg:\s*`.*?`/g;
  content = content.replace(bsRegex, \`name: "Bootstrap",\\n    color: "#7952B3",\\n    svg: \\\`\${bootstrapSvg}\\\`\`);

  // Replace Laragon
  const laragonRegex = /name:\s*"Laragon"[\s\S]*?svg:\s*`.*?`/g;
  content = content.replace(laragonRegex, \`name: "Laragon",\\n    color: "#00C8FF",\\n    svg: \\\`\${laragonSvg}\\\`\`);

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}

fixFiles('src/components/TechStack.tsx');
fixFiles('src/components/Hero.tsx');
