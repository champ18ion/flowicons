const fs = require('fs');
const path = require('path');

const iconsDir = path.join('src', 'icons');
const files = fs.readdirSync(iconsDir);

for (const file of files) {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(iconsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove `as const` and import Variants explicitly if needed, but the issue is Type '{...}' is not assignable to type 'Variants'.
        // Let's type elementVariants properly
        content = content.replace(/const elementVariants = \{/g, 'const elementVariants: import("motion/react").Variants = {');

        fs.writeFileSync(filePath, content);
    }
}
