const https = require('https');
const fs = require('fs');

const icons = {
  VSCode: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg', color: '#007ACC' },
  CSS: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg', color: '#1572B6' },
  Tailwind: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
  Bootstrap: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
  MySQL: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', color: '#4479A1' },
  Oracle: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg', color: '#F80000' },
  Docker: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', color: '#2496ED' },
  Laragon: { url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg', color: '#00C8FF' }, // Fallback for Laragon
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  let result = '';
  for (const [name, info] of Object.entries(icons)) {
    try {
      let svg = await fetchUrl(info.url);
      svg = svg.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, "'"); // clean up
      if(name === 'Laragon') {
        svg = `<svg viewBox="0 0 24 24" fill="none" stroke="${info.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`; // Generic star or hex
      }
      result += `  {
    name: "${name === 'Oracle' ? 'Oracle SQL' : name}",
    color: "${info.color}",
    svg: \`${svg}\`,
  },\n`;
    } catch (e) {
      console.error(e);
    }
  }
  fs.writeFileSync('new-techs.txt', result);
  console.log('Done');
}

run();
