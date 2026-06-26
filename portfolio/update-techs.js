const fs = require('fs');

const newTechs = fs.readFileSync('new-techs.txt', 'utf8');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the end of the techs array
  const regex = /(const techs = \[[\s\S]*?)(\n\];)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, `$1\n${newTechs}$2`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Could not find techs array in ${filePath}`);
  }
}

updateFile('src/components/Hero.tsx');
updateFile('src/components/TechStack.tsx');
