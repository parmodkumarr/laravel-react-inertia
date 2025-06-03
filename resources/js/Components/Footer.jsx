import React from 'react';
import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                        <p className="text-gray-600 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Your Company. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:space-x-6">
                        <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                            Terms of Service
                        </Link>
                        <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 