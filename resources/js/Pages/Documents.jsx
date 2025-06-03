import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Documents = () => {
    return (
        <MainLayout>
            <Head title="Documents" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Documents</h2>
                <div className="space-y-4">
                    {/* Add your documents content here */}
                    <p>Manage your documents and files here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Documents; 