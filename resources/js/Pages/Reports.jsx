import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Reports = () => {
    return (
        <MainLayout>
            <Head title="Reports" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Reports</h2>
                <div className="space-y-4">
                    {/* Add your reports content here */}
                    <p>View and generate reports here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Reports; 