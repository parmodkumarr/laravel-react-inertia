import React, { useState } from 'react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header onMenuClick={toggleSidebar} />
            <div className="flex">
                {/* Mobile sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`
                        fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Main content */}
                <main className="flex-1 w-full lg:pl-0">
                    <div className="py-6 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout; 