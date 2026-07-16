const fs = require('fs');
const path = require('path');
const lucide = require('lucide-react');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

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

function generateAnimation(iconName, svgContent) {
    let hoverState = '{ scale: 1.1 }';
    let clickState = '{ scale: 0.9 }';
    let loadingState = '{ opacity: [1, 0.5, 1], transition: { repeat: Infinity, duration: 1 } }';

    if (["BatteryCharging", "BatteryFull", "Database", "HardDrive", "Server"].includes(iconName)) {
        hoverState = '{ y: -2 }';
        loadingState = '{ opacity: [0.5, 1, 0.5], scale: [0.95, 1, 0.95], transition: { repeat: Infinity, duration: 1.5 } }';
    } else if (["Cpu", "Key", "Shield", "Unlock"].includes(iconName)) {
        hoverState = '{ rotate: 5, scale: 1.05 }';
        clickState = '{ rotate: -5, scale: 0.95 }';
    } else if (["CreditCard", "Wallet", "Gift", "ShoppingCart", "Tag"].includes(iconName)) {
        hoverState = '{ y: -3, rotate: -2 }';
        clickState = '{ y: 0, scale: 0.9 }';
    } else if (["Headphones", "Mic", "Pause", "SkipForward", "StopCircle"].includes(iconName)) {
        hoverState = '{ scale: 1.15 }';
        clickState = '{ scale: 0.85 }';
        loadingState = '{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.8 } }';
    } else if (["Smartphone", "Tablet", "Laptop", "Watch"].includes(iconName)) {
        hoverState = '{ rotate: 2, scale: 1.05 }';
        clickState = '{ rotate: -2, scale: 0.95 }';
    } else if (["Wind", "Snowflake", "Umbrella"].includes(iconName)) {
        hoverState = '{ rotate: 15 }';
        clickState = '{ scale: 0.9 }';
        loadingState = '{ rotate: [0, 360], transition: { repeat: Infinity, duration: 2, ease: "linear" } }';
    } else if (["ZoomIn", "ZoomOut", "Maximize", "Minimize"].includes(iconName)) {
        hoverState = '{ scale: 1.2 }';
        clickState = '{ scale: 0.8 }';
    }

    let animatedContent = svgContent.replace(/<([a-z]+)(\s[^>]+)?>/g, (match, tag, attrs) => {
        if (tag === 'svg') return match;
        if (['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse'].includes(tag)) {
            // Remove ending slashes inside attrs to prevent bad formatting
            let cleanAttrs = (attrs || '').replace(/\/$/, '').trim();
            if (cleanAttrs) cleanAttrs = ' ' + cleanAttrs;
            return `<motion.${tag}${cleanAttrs} variants={elementVariants} />`;
        }
        return match;
    });

    // Remove stray tags just in case
    animatedContent = animatedContent.replace(/<\/(path|circle|rect|line|polyline|polygon|ellipse)>/g, '');

    return `
import { forwardRef } from 'react';
import { motion, type Variants } from 'motion/react';
import type { IconProps } from '../types';

const ${iconName} = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', state = 'idle', className = '', ...props }, ref) => {

    const variants: Variants = {
      idle: { scale: 1, rotate: 0, y: 0, opacity: 1 },
      hover: ${hoverState},
      click: ${clickState},
      loading: ${loadingState},
    };

    const elementVariants: Variants = {
      idle: { pathLength: 1, opacity: 1 },
      loading: {
        pathLength: [0, 1],
        opacity: [0.5, 1],
        transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      }
    };

    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        variants={variants}
        initial="idle"
        animate={state}
        {...props}
      >
        ${animatedContent}
      </motion.svg>
    );
  }
);

${iconName}.displayName = '${iconName}';

export default ${iconName};
`;
}

if (!fs.existsSync(path.join('src', 'icons'))) {
    fs.mkdirSync(path.join('src', 'icons'), { recursive: true });
}

for (const icon of icons) {
    const IconComponent = lucide[icon];
    if (IconComponent) {
        const svgString = ReactDOMServer.renderToStaticMarkup(React.createElement(IconComponent));
        const match = svgString.match(/<svg[^>]*>(.*?)<\/svg>/s);
        if (match && match[1]) {
            let innerContent = match[1];
            // Format self closing tags by replacing inner content tags with no slashes
            innerContent = innerContent.replace(/<([a-z]+)([^>]*)\/?>/g, '<$1$2>');
            innerContent = innerContent.replace(/([a-z]+)-([a-z]+)=/g, (m, p1, p2) => `${p1}${p2.charAt(0).toUpperCase() + p2.slice(1)}=`);
            innerContent = innerContent.replace(/class=/g, 'className=');

            const componentCode = generateAnimation(icon, innerContent);
            fs.writeFileSync(path.join('src', 'icons', `${icon}.tsx`), componentCode.trim() + '\n');
            console.log(`Generated ${icon}`);
        }
    } else {
        console.log(`Failed to find ${icon} in Lucide`);
    }
}
