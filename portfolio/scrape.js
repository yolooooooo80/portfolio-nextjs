const https = require('https');
const fs = require('fs');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  const username = 'yolooooooo80';
  const years = [2024, 2025, 2026];
  let totalContributions = 0;
  
  const days = [];

  for (const year of years) {
    const url = `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`;
    console.log(`Fetching ${url}...`);
    const html = await fetchHtml(url);
    
    const countMatch = html.match(/(\d+)\s+contributions\s+in\s+/);
    if (countMatch) {
      totalContributions += parseInt(countMatch[1]);
    }
    
    const regex = /data-date="([^"]+)"\s+id="[^"]+"\s+data-level="([^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      days.push({ date: match[1], level: parseInt(match[2]) });
    }
  }

  days.sort((a, b) => new Date(a.date) - new Date(b.date));

  const uniqueDaysMap = new Map();
  days.forEach(d => uniqueDaysMap.set(d.date, d.level));
  
  const sortedUniqueDays = Array.from(uniqueDaysMap.entries())
    .map(([date, level]) => ({ date, level }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const weeks = [];
  let currentWeek = [];
  
  for (const day of sortedUniqueDays) {
    const d = new Date(day.date);
    const dayOfWeek = d.getUTCDay(); 
    
    if (currentWeek.length === 0 && dayOfWeek !== 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(0);
      }
    }
    
    currentWeek.push(day.level);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(0);
    }
    weeks.push(currentWeek);
  }

  const result = {
    total: totalContributions,
    weeks: weeks
  };

  fs.writeFileSync('github-data.json', JSON.stringify(result, null, 2));
  console.log('Done! Total weeks:', weeks.length, 'Total contributions:', totalContributions);
}

scrape();
