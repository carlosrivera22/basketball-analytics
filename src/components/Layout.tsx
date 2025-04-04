import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import {
    BarChart2,
    Users,
    Calendar,
    Settings,
    Menu,
    Activity
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type NavItemProps = {
    href: string;
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, onClick }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} legacyBehavior>
            <a className="block" onClick={onClick}>
                <div
                    className={`flex items-center px-4 py-3 cursor-pointer hover:bg-slate-800 transition-colors ${isActive ? 'border-l-2 border-orange-500 bg-slate-800' : ''
                        }`}
                >
                    <div className="mr-3 text-slate-400">{icon}</div>
                    <span>{text}</span>
                </div>
            </a>
        </Link>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Check if we're in a mobile view based on screen width
    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 1024);
        };

        // Initial check
        checkMobileView();

        // Add event listener for resize
        window.addEventListener('resize', checkMobileView);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const renderSidebarContent = () => (
        <>
            <div className="p-4 flex items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center mr-2">
                    <Activity size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold">Court Stats</h2>
            </div>

            <nav className="mt-6">
                <NavItem href="/" icon={<BarChart2 size={20} />} text="Dashboard" onClick={closeSidebar} />
                <NavItem href="/teams" icon={<Users size={20} />} text="Teams" onClick={closeSidebar} />
                <NavItem href="/players" icon={<Users size={20} />} text="Players" onClick={closeSidebar} />
                <NavItem href="/games" icon={<Calendar size={20} />} text="Games" onClick={closeSidebar} />

                <div className="pt-6 mt-6 border-t border-slate-800">
                    <div className="px-4 mb-2 text-xs text-slate-400">SETTINGS</div>
                    <NavItem href="/settings" icon={<Settings size={20} />} text="Settings" onClick={closeSidebar} />
                </div>
            </nav>

            <div className="mt-auto p-4 border-t border-slate-800 flex items-center">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center mr-2">
                    <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-slate-400">Coach</div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
            {/* Desktop Sidebar - Shown on larger screens */}
            {!isMobileView && (
                <aside className="w-64 bg-slate-900 text-white flex flex-col">
                    {renderSidebarContent()}
                </aside>
            )}

            {/* Mobile Header and Sheet Sidebar */}
            {isMobileView && (
                <div className="fixed top-0 left-0 right-0 z-10 bg-slate-900 text-white flex items-center p-3">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="text-white p-2">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 bg-slate-900 text-white flex flex-col h-full">
                            {renderSidebarContent()}
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center ml-2">
                        <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center mr-2">
                            <Activity size={14} className="text-white" />
                        </div>
                        <h2 className="text-lg font-bold">Court Stats</h2>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 overflow-y-auto ${isMobileView ? 'pt-16' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;