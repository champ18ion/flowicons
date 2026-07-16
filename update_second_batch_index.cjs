const fs = require('fs');
const path = require('path');

const icons = [
    "BatteryCharging","BatteryFull","Cpu","CreditCard","Database",
    "EyeOff","FileText","Gift","HardDrive","Headphones",
    "Key","Laptop","Maximize","Mic","Minimize",
    "Navigation","Paperclip","Pause","PenTool","Scissors",
    "Server","Shield","ShoppingCart","SkipForward","Smartphone",
    "Snowflake","StarHalf","StopCircle","Tablet","Tag",
    "Terminal","ThumbsDown","ThumbsUp","Umbrella","Unlock",
    "Wallet","Watch","Wind","ZoomIn","ZoomOut"
];

const indexFile = path.join('src', 'index.ts');
let indexContent = fs.readFileSync(indexFile, 'utf8');

for (const icon of icons) {
    if (!indexContent.includes(`export { default as ${icon} }`)) {
        indexContent += `export { default as ${icon} } from './icons/${icon}';\n`;
    }
}
fs.writeFileSync(indexFile, indexContent);
console.log('Updated src/index.ts');

const playgroundFile = path.join('playground', 'src', 'pages', 'Playground.tsx');
let playgroundContent = fs.readFileSync(playgroundFile, 'utf8');
const previewIconsMatch = playgroundContent.match(/const previewIcons = \[\n([\s\S]*?)  \];/);
if (previewIconsMatch) {
    let previewIconsList = previewIconsMatch[1];
    let toAdd = '';
    for (const icon of icons) {
        if (!previewIconsList.includes(`Icon: FlowIcons.${icon}`)) {
            toAdd += `    { name: '${icon}', Icon: FlowIcons.${icon} },\n`;
        }
    }
    const newList = previewIconsList + toAdd;
    playgroundContent = playgroundContent.replace(/const previewIcons = \[\n[\s\S]*?  \];/, `const previewIcons = [\n${newList}  ];`);
    fs.writeFileSync(playgroundFile, playgroundContent);
    console.log('Updated Playground.tsx');
}
