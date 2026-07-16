const lucide = require('lucide');
const icons = Object.keys(lucide.icons);
console.log(icons.filter(i => /^(Github|Facebook|Twitter|Instagram|Linkedin|Youtube|Twitch|Figma|Framer|Codepen|Codesandbox|Chrome|Apple|Android|Slack|Discord|Trello|Gitlab|Bitbucket|Google|X|Amazon|Apple|Microsoft|Ubuntu|Linux|Centos|Fedora)$/i.test(i)).join(', '));
