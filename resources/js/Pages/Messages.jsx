import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Messages = () => {
    return (
        <MainLayout>
            <Head title="Messages" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Messages</h2>
                <div className="space-y-4">
                    {/* Add your messages content here */}
                    <p>View and manage your messages here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Messages; 