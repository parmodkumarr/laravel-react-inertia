import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Calendar = () => {
    return (
        <MainLayout>
            <Head title="Calendar" />
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
                <div className="space-y-4">
                    {/* Add your calendar content here */}
                    <p>View and manage your schedule here.</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Calendar; 