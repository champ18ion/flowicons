import {
    Airplane, Bell, ArrowUp, Heart, Rocket, Send, List, MoreHorizontal, Menu, BellOff, Flame, MessageCircle, Like, Camera, Star, Settings, Search, Lock, AlarmClockPlus, Clock, Eye, DoubleCheck, FilledChecked, HandHeart, Moon, PartyPopper, Toggle, Trash, TriangleAlert, Volume2, Link, UserCheck, UserPlus, Users, Wifi, ArrowBigDown, ArrowBigDownDash, ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash, ArrowBigUp, ArrowBigUpDash, FileDescription, Home, Mail, Globe, ShieldCheck, Refresh, Pen, X, QrCode, PhoneVolume, Bookmark, Book, Cart, Coffee, Copy,
    ArrowDown10, ArrowDownAZ, Checked, Player,
    PlayCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
    ChartBar, DotsVertical, RosetteDiscount,
    Target, LayoutSidebarRight, CurrencyRupee, FlowIcon, Sparkle
, Download, Upload, User, Save, Info, Plus, Minus, Image, Video, Music, Calendar, Folder, File, MapPin, Map, Cloud, Sun, Zap, Share, Printer, Monitor, Activity, Anchor, Award, BaggageClaim, Balloon, Ban, Banknote, Baseline, Bath, Battery, Beaker, Bed, Bike, Biohazard, Bird, Bluetooth, Bone, Box, Briefcase, Bug, Building, Bus, Cable, Calculator, Car, Carrot, Cast, Cat, ChefHat, Cherry, Compass, Church, CigaretteOff, Cigarette, Citrus, Clapperboard, Clipboard, CloudRain, Clover, Code, BatteryCharging, BatteryFull, Cpu, CreditCard, Database, EyeOff, FileText, Gift, HardDrive, Headphones, Key, Laptop, Maximize, Mic, Minimize, Navigation, Paperclip, Pause, PenTool, Scissors, Server, Shield, ShoppingCart, SkipForward, Smartphone, Snowflake, StarHalf, StopCircle, Tablet, Tag, Terminal, ThumbsDown, ThumbsUp, Umbrella, Unlock, Wallet, Watch, Wind, ZoomIn, ZoomOut, Filter, Lightbulb, LoaderCircle, LogIn, LogOut, Play, SkipBack, Repeat, Shuffle, Timer, Hourglass, Truck, Wrench, Palette, Trophy, Smile, Ghost, Dice5, Keyboard, Droplet } from "@champ18ion/flowicons";
import { useState, useMemo } from "react";
import IconCard from "../components/IconCard";
import { motion, AnimatePresence } from "framer-motion";

interface PlaygroundProps {
    onBack: () => void;
}

export default function Playground({ onBack }: PlaygroundProps) {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [size, setSize] = useState(48);
    const [stroke, setStroke] = useState(2);
    const [color, setColor] = useState("#ffffff");
    const [showSettings, setShowSettings] = useState(false);

    const icons = useMemo(() => [
        { name: "Activity", Component: Activity },
        { name: "Anchor", Component: Anchor },
        { name: "Award", Component: Award },
        { name: "BaggageClaim", Component: BaggageClaim },
        { name: "Balloon", Component: Balloon },
        { name: "Ban", Component: Ban },
        { name: "Banknote", Component: Banknote },
        { name: "Baseline", Component: Baseline },
        { name: "Bath", Component: Bath },
        { name: "Battery", Component: Battery },
        { name: "Beaker", Component: Beaker },
        { name: "Bed", Component: Bed },
        { name: "Bike", Component: Bike },
        { name: "Biohazard", Component: Biohazard },
        { name: "Bird", Component: Bird },
        { name: "Bluetooth", Component: Bluetooth },
        { name: "Bone", Component: Bone },
        { name: "Box", Component: Box },
        { name: "Briefcase", Component: Briefcase },
        { name: "Bug", Component: Bug },
        { name: "Building", Component: Building },
        { name: "Bus", Component: Bus },
        { name: "Cable", Component: Cable },
        { name: "Calculator", Component: Calculator },
        { name: "Car", Component: Car },
        { name: "Carrot", Component: Carrot },
        { name: "Cast", Component: Cast },
        { name: "Cat", Component: Cat },
        { name: "ChefHat", Component: ChefHat },
        { name: "Cherry", Component: Cherry },
        { name: "Compass", Component: Compass },
        { name: "Church", Component: Church },
        { name: "CigaretteOff", Component: CigaretteOff },
        { name: "Cigarette", Component: Cigarette },
        { name: "Citrus", Component: Citrus },
        { name: "Clapperboard", Component: Clapperboard },
        { name: "Clipboard", Component: Clipboard },
        { name: "CloudRain", Component: CloudRain },
        { name: "Clover", Component: Clover },
        { name: "Code", Component: Code },
        { name: "Download", Component: Download },
        { name: "Upload", Component: Upload },
        { name: "User", Component: User },
        { name: "Save", Component: Save },
        { name: "Info", Component: Info },
        { name: "Plus", Component: Plus },
        { name: "Minus", Component: Minus },
        { name: "Image", Component: Image },
        { name: "Video", Component: Video },
        { name: "Music", Component: Music },
        { name: "Calendar", Component: Calendar },
        { name: "Folder", Component: Folder },
        { name: "File", Component: File },
        { name: "MapPin", Component: MapPin },
        { name: "Map", Component: Map },
        { name: "Cloud", Component: Cloud },
        { name: "Sun", Component: Sun },
        { name: "Zap", Component: Zap },
        { name: "Share", Component: Share },
        { name: "Printer", Component: Printer },
        { name: "Monitor", Component: Monitor },
        { name: "Airplane", Component: Airplane },
        { name: "AlarmClockPlus", Component: AlarmClockPlus },
        { name: "ArrowBigDown", Component: ArrowBigDown },
        { name: "ArrowBigDownDash", Component: ArrowBigDownDash },
        { name: "ArrowBigLeft", Component: ArrowBigLeft },
        { name: "ArrowBigLeftDash", Component: ArrowBigLeftDash },
        { name: "ArrowBigRight", Component: ArrowBigRight },
        { name: "ArrowBigRightDash", Component: ArrowBigRightDash },
        { name: "ArrowBigUp", Component: ArrowBigUp },
        { name: "ArrowBigUpDash", Component: ArrowBigUpDash },
        { name: "ArrowDown10", Component: ArrowDown10 },
        { name: "ArrowDownAZ", Component: ArrowDownAZ },
        { name: "ArrowUp", Component: ArrowUp },
        { name: "Bell", Component: Bell },
        { name: "BellOff", Component: BellOff },
        { name: "Book", Component: Book },
        { name: "Bookmark", Component: Bookmark },
        { name: "Camera", Component: Camera },
        { name: "Cart", Component: Cart },
        { name: "ChartBar", Component: ChartBar },
        { name: "Checked", Component: Checked },
        { name: "ChevronDown", Component: ChevronDown },
        { name: "ChevronLeft", Component: ChevronLeft },
        { name: "ChevronRight", Component: ChevronRight },
        { name: "ChevronUp", Component: ChevronUp },
        { name: "Clock", Component: Clock },
        { name: "Coffee", Component: Coffee },
        { name: "Copy", Component: Copy },
        { name: "CurrencyRupee", Component: CurrencyRupee },
        { name: "DotsVertical", Component: DotsVertical },
        { name: "DoubleCheck", Component: DoubleCheck },
        { name: "Eye", Component: Eye },
        { name: "FileDescription", Component: FileDescription },
        { name: "FilledChecked", Component: FilledChecked },
        { name: "Flame", Component: Flame },
        { name: "Globe", Component: Globe },
        { name: "HandHeart", Component: HandHeart },
        { name: "Heart", Component: Heart },
        { name: "Home", Component: Home },
        { name: "LayoutSidebarRight", Component: LayoutSidebarRight },
        { name: "Like", Component: Like },
        { name: "Link", Component: Link },
        { name: "List", Component: List },
        { name: "Lock", Component: Lock },
        { name: "Mail", Component: Mail },
        { name: "Menu", Component: Menu },
        { name: "MessageCircle", Component: MessageCircle },
        { name: "Moon", Component: Moon },
        { name: "MoreHorizontal", Component: MoreHorizontal },
        { name: "PartyPopper", Component: PartyPopper },
        { name: "Pen", Component: Pen },
        { name: "PhoneVolume", Component: PhoneVolume },
        { name: "PlayCircle", Component: PlayCircle },
        { name: "Player", Component: Player },
        { name: "QrCode", Component: QrCode },
        { name: "Refresh", Component: Refresh },
        { name: "Rocket", Component: Rocket },
        { name: "RosetteDiscount", Component: RosetteDiscount },
        { name: "Search", Component: Search },
        { name: "Send", Component: Send },
        { name: "Settings", Component: Settings },
        { name: "ShieldCheck", Component: ShieldCheck },
        { name: "Star", Component: Star },
        { name: "Target", Component: Target },
        { name: "Toggle", Component: Toggle },
        { name: "Trash", Component: Trash },
        { name: "TriangleAlert", Component: TriangleAlert },
        { name: "UserCheck", Component: UserCheck },
        { name: "UserPlus", Component: UserPlus },
        { name: "Users", Component: Users },
        { name: "Volume2", Component: Volume2 },
        { name: "Wifi", Component: Wifi },
        { name: "X", Component: X },
        { name: "FlowIcon", Component: FlowIcon },
        { name: "Sparkle", Component: Sparkle },
        { name: "BatteryCharging", Component: BatteryCharging },
        { name: "BatteryFull", Component: BatteryFull },
        { name: "Cpu", Component: Cpu },
        { name: "CreditCard", Component: CreditCard },
        { name: "Database", Component: Database },
        { name: "EyeOff", Component: EyeOff },
        { name: "FileText", Component: FileText },
        { name: "Gift", Component: Gift },
        { name: "HardDrive", Component: HardDrive },
        { name: "Headphones", Component: Headphones },
        { name: "Key", Component: Key },
        { name: "Laptop", Component: Laptop },
        { name: "Maximize", Component: Maximize },
        { name: "Mic", Component: Mic },
        { name: "Minimize", Component: Minimize },
        { name: "Navigation", Component: Navigation },
        { name: "Paperclip", Component: Paperclip },
        { name: "Pause", Component: Pause },
        { name: "PenTool", Component: PenTool },
        { name: "Scissors", Component: Scissors },
        { name: "Server", Component: Server },
        { name: "Shield", Component: Shield },
        { name: "ShoppingCart", Component: ShoppingCart },
        { name: "SkipForward", Component: SkipForward },
        { name: "Smartphone", Component: Smartphone },
        { name: "Snowflake", Component: Snowflake },
        { name: "StarHalf", Component: StarHalf },
        { name: "StopCircle", Component: StopCircle },
        { name: "Tablet", Component: Tablet },
        { name: "Tag", Component: Tag },
        { name: "Terminal", Component: Terminal },
        { name: "ThumbsDown", Component: ThumbsDown },
        { name: "ThumbsUp", Component: ThumbsUp },
        { name: "Umbrella", Component: Umbrella },
        { name: "Unlock", Component: Unlock },
        { name: "Wallet", Component: Wallet },
        { name: "Watch", Component: Watch },
        { name: "Wind", Component: Wind },
        { name: "ZoomIn", Component: ZoomIn },
        { name: "ZoomOut", Component: ZoomOut },
        { name: "Filter", Component: Filter },
        { name: "Lightbulb", Component: Lightbulb },
        { name: "LoaderCircle", Component: LoaderCircle },
        { name: "LogIn", Component: LogIn },
        { name: "LogOut", Component: LogOut },
        { name: "Play", Component: Play },
        { name: "SkipBack", Component: SkipBack },
        { name: "Repeat", Component: Repeat },
        { name: "Shuffle", Component: Shuffle },
        { name: "Timer", Component: Timer },
        { name: "Hourglass", Component: Hourglass },
        { name: "Truck", Component: Truck },
        { name: "Wrench", Component: Wrench },
        { name: "Palette", Component: Palette },
        { name: "Trophy", Component: Trophy },
        { name: "Smile", Component: Smile },
        { name: "Ghost", Component: Ghost },
        { name: "Dice5", Component: Dice5 },
        { name: "Keyboard", Component: Keyboard },
        { name: "Droplet", Component: Droplet },
    ].sort((a, b) => a.name.localeCompare(b.name)), []);

    const filteredIcons = icons.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-ink text-fg font-body antialiased overflow-x-hidden">

            {/* Settings panel */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.15 }}
                            className="border border-line bg-surface rounded-lg shadow-xl w-72 overflow-hidden"
                        >
                            <div className="px-4 py-3 border-b border-line">
                                <span className="font-mono text-xs text-mut tracking-wide">DISPLAY</span>
                            </div>
                            <div className="p-4 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between font-mono text-xs text-mut">
                                        <span>size</span>
                                        <span className="text-accent">{size}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="16"
                                        max="64"
                                        value={size}
                                        onChange={(e) => setSize(Number(e.target.value))}
                                        className="w-full h-1 bg-line rounded-full appearance-none cursor-pointer accent-accent"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between font-mono text-xs text-mut">
                                        <span>stroke</span>
                                        <span className="text-accent">{stroke}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.5"
                                        value={stroke}
                                        onChange={(e) => setStroke(Number(e.target.value))}
                                        className="w-full h-1 bg-line rounded-full appearance-none cursor-pointer accent-accent"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <span className="font-mono text-xs text-mut">color</span>
                                    <div className="flex items-center gap-2">
                                        {['#e7ecf3', '#38bdf8', '#a78bfa', '#fb7185', '#34d399'].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setColor(c)}
                                                className={`w-6 h-6 rounded-full border transition-all ${color === c ? 'border-fg scale-110' : 'border-line hover:scale-105'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        <div className="flex-1 flex items-center gap-2 bg-raise border border-line rounded px-2 py-1 ml-1">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="w-4 h-4 rounded bg-transparent border-none cursor-pointer p-0"
                                            />
                                            <span className="font-mono text-[11px] text-mut">{color}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${showSettings ? 'bg-accent border-accent text-ink' : 'bg-surface border-line text-mut hover:text-fg hover:border-faint'}`}
                >
                    {showSettings ? <X size={18} /> : <Settings size={18} />}
                </button>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 w-full bg-ink/90 backdrop-blur-md border-b border-line">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
                    <button className="flex items-center gap-2.5 shrink-0" onClick={onBack}>
                        <Wind size={24} color="#38bdf8" />
                        <span className="font-display font-semibold text-base tracking-tight hidden sm:inline">Flowicons</span>
                    </button>

                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-faint">
                                <Search size={15} />
                            </div>
                            <input
                                type="text"
                                placeholder={`Search ${icons.length} icons…`}
                                className="w-full bg-surface border border-line rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-faint"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setLoading(!loading)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-mono text-xs transition-colors border shrink-0 ${loading ? 'bg-accent/10 border-accent/40 text-accent' : 'bg-surface border-line text-mut hover:text-fg hover:border-faint'}`}
                    >
                        {loading ? (
                            <span className="w-2.5 h-2.5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                        ) : (
                            <span className="w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-current" />
                        )}
                        loading
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
                <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-xs text-mut">
                        {filteredIcons.length} of {icons.length}
                    </span>
                    <span className="font-mono text-xs text-faint">click any icon to trigger .play()</span>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredIcons.map(({ name, Component }) => (
                            <IconCard
                                key={name}
                                name={name}
                                Component={Component}
                                size={size}
                                strokeWidth={stroke}
                                color={color}
                                loading={loading}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredIcons.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 border border-line rounded-lg bg-surface"
                    >
                        <div className="inline-flex p-5 rounded-full bg-raise mb-6 text-faint">
                            <Search size={28} />
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2">No icons match "{search}"</h3>
                        <p className="text-mut text-sm">Try a different name, or browse the full set.</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

