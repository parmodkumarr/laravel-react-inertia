import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Settings = () => {
    return (
        <MainLayout>
            <Head title="Settings" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                    {/* Add your settings content here */}
                    <p>Configure your application settings here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings; 