const fs = require('fs');
const path = require('path');

const playgroundFile = path.join('playground', 'src', 'pages', 'Playground.tsx');
let content = fs.readFileSync(playgroundFile, 'utf8');

// The script accidentally injected components into the 'react' and 'framer-motion' imports. Let's fix that.
content = content.replace(/import \{ BatteryCharging,.*?\} from "react";\n/g, 'import { useState, useMemo } from "react";\n');
content = content.replace(/import \{ BatteryCharging,.*?\} from "framer-motion";\n/g, 'import { motion, AnimatePresence } from "framer-motion";\n');

// And we need to add the imports to the correct line: `@champ18ion/flowicons`
const newIcons = "BatteryCharging, BatteryFull, Cpu, CreditCard, Database, EyeOff, FileText, Gift, HardDrive, Headphones, Key, Laptop, Maximize, Mic, Minimize, Navigation, Paperclip, Pause, PenTool, Scissors, Server, Shield, ShoppingCart, SkipForward, Smartphone, Snowflake, StarHalf, StopCircle, Tablet, Tag, Terminal, ThumbsDown, ThumbsUp, Umbrella, Unlock, Wallet, Watch, Wind, ZoomIn, ZoomOut, ";
content = content.replace(/Code\} from "\@champ18ion\/flowicons";/g, `Code, ${newIcons} } from "@champ18ion/flowicons";`);

fs.writeFileSync(playgroundFile, content);
