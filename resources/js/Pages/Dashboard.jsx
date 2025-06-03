import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Dashboard = () => {
    return (
        <MainLayout>
            <Head title="Dashboard" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <p>Welcome to your dashboard!</p>
                {/* Add your dashboard content here */}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
