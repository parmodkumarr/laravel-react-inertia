import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const MenuItem = ({ item, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (item.submenu) {
        return (
            <div className="mb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center space-x-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </div>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                            <Link
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                                onClick={() => onClose?.()}
                            >
                                <span className="text-xl">{subItem.icon}</span>
                                <span className="text-sm">{subItem.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <li>
            <Link
                href={item.href}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => onClose?.()}
            >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
            </Link>
        </li>
    );
};

const Sidebar = ({ onClose }) => {
    const menuItems = [
        { label: 'Dashboard', icon: '📊', href: '/dashboard' },
        {
            label: 'Projects',
            icon: '📁',
            submenu: [
                { label: 'All Projects', icon: '📋', href: '/projects' },
                { label: 'Add New', icon: '➕', href: '/projects/create' },
                { label: 'Categories', icon: '🏷️', href: '/projects/categories' }
            ]
        },
        {
            label: 'Tasks',
            icon: '✓',
            submenu: [
                { label: 'My Tasks', icon: '📝', href: '/tasks' },
                { label: 'Assigned', icon: '👥', href: '/tasks/assigned' },
                { label: 'Calendar', icon: '📅', href: '/tasks/calendar' }
            ]
        },
        {
            label: 'Team',
            icon: '👥',
            submenu: [
                { label: 'Members', icon: '👤', href: '/team/members' },
                { label: 'Roles', icon: '🔑', href: '/team/roles' },
                { label: 'Permissions', icon: '🔒', href: '/team/permissions' }
            ]
        },
        { label: 'Messages', icon: '💬', href: '/messages' },
        { label: 'Documents', icon: '📄', href: '/documents' },
        { label: 'Reports', icon: '📈', href: '/reports' },
        { label: 'Settings', icon: '⚙️', href: '/settings' }
    ];

    return (
        <aside className="bg-gray-800 text-white h-full flex flex-col">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                    <span className="sr-only">Close menu</span>
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-2">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} item={item} onClose={onClose} />
                    ))}
                </ul>
            </nav>

            {/* User profile section at bottom */}
            <div className="p-4 border-t border-gray-700">
                <Link
                    href="/profile"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
                >
                    <span className="text-xl">👤</span>
                    <span className="text-sm">Profile</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar; 