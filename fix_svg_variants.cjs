const fs = require('fs');
const path = require('path');

const iconsDir = path.join('src', 'icons');
const files = fs.readdirSync(iconsDir);

for (const file of files) {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(iconsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Let's create an extended interface for these components if 'state' is not available
        content = content.replace(/import type \{ AnimatedIconProps as IconProps \} from '\.\.\/core\/types';/g, "import type { AnimatedIconProps } from '../core/types';\ninterface IconProps extends AnimatedIconProps {\n  state?: 'idle' | 'hover' | 'click' | 'loading';\n}");

        fs.writeFileSync(filePath, content);
    }
}
