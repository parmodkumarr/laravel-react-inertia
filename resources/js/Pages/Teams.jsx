import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Teams = () => {
    return (
        <MainLayout>
            <Head title="Teams" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Teams</h2>
                <div className="space-y-4">
                    {/* Add your teams content here */}
                    <p>Manage teams here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Teams; 