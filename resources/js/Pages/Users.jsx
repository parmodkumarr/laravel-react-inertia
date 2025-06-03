import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Users = () => {
    return (
        <MainLayout>
            <Head title="Users" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <div className="space-y-4">
                    {/* Add your users content here */}
                    <p>Manage users here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Users; 