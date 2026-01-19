import {
    Airplane, Bell, ArrowUp, Heart, Rocket, Send, List, MoreHorizontal, Menu, BellOff, Flame, MessageCircle, Like, Camera, Star, Settings, Search, Lock, AlarmClockPlus, Clock, Eye, DoubleCheck, FilledChecked, HandHeart, Moon, PartyPopper, Toggle, Trash, TriangleAlert, Volume2, Link, UserCheck, UserPlus, Users, Wifi, ArrowBigDown, ArrowBigDownDash, ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash, ArrowBigUp, ArrowBigUpDash, FileDescription, Home, Mail, Globe, ShieldCheck, Refresh, Pen, X, QrCode, PhoneVolume, Bookmark, Book, Cart, Coffee, Copy,
    ArrowDown10, ArrowDownAZ, Checked, Player,
    PlayCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
    ChartBar, DotsVertical, RosetteDiscount,
    Target, LayoutSidebarRight, CurrencyRupee, FlowIcon, Sparkle
} from "@champ18ion/flowicons";
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
    ].sort((a, b) => a.name.localeCompare(b.name)), []);

    const filteredIcons = icons.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-500/30 overflow-x-hidden relative">

            {/* Global Noise */}
            <div className="fixed inset-0 bg-noise z-0 opacity-[0.12] pointer-events-none" />

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-[600px] bg-brand-500/5 blur-[120px] -z-10 pointer-events-none rounded-full translate-x-1/4 -translate-y-1/2" />


            {/* Settings FAB */}
            <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="bg-neutral-900/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl w-80 mb-2"
                        >
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                        <span>Size</span>
                                        <span className="text-brand-400">{size}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="16"
                                        max="64"
                                        value={size}
                                        onChange={(e) => setSize(Number(e.target.value))}
                                        className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-500"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                        <span>Stroke</span>
                                        <span className="text-brand-400">{stroke}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.5"
                                        value={stroke}
                                        onChange={(e) => setStroke(Number(e.target.value))}
                                        className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-500"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Color Preset</label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {['#ffffff', '#0ea5e9', '#a855f7', '#f43f5e', '#10b981'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setColor(c)}
                                                className={`w-9 h-9 rounded-xl border-2 transition-all ${color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-110'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mt-2">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden"
                                        />
                                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{color}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`w-16 h-16 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center border ${showSettings ? 'bg-white text-black border-white' : 'bg-brand-600 text-white border-brand-500 hover:bg-brand-500'}`}
                >
                    {showSettings ? <X size={28} /> : <Settings size={28} />}
                </button>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050505]/80 border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                            <FlowIcon size={32} color="#0ea5e9" className="relative group-hover:scale-90 transition-all duration-500" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tighter">Flowicons</h1>
                    </div>

                    <div className="flex-1 max-w-xl mx-8 hidden md:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-brand-500 transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search through 100+ icons..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all placeholder:text-neutral-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLoading(!loading)}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${loading ? 'bg-brand-500/10 border-brand-500/30 text-brand-400 shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                        >
                            {loading ? <div className="w-3 h-3 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" /> : <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-current ml-0.5" />}
                            {loading ? 'Playing' : 'Preview All'}
                        </button>
                    </div>
                </div>
                {/* Mobile Search */}
                <div className="md:hidden px-6 pt-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-brand-500 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search icons..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-6 pb-40"
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
                        className="text-center py-40"
                    >
                        <div className="inline-flex p-8 rounded-[2rem] bg-white/5 mb-8 text-neutral-700 border border-white/5">
                            <Search size={48} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No icons match your search</h3>
                        <p className="text-neutral-500">Try searching for something else or browse the library.</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

