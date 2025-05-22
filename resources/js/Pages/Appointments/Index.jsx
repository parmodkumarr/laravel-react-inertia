import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ appointments }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Appointments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">My Appointments</h2>
                                <Link
                                    href={route('appointments.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Schedule New Appointment
                                </Link>
                            </div>

                            {appointments.length === 0 ? (
                                <p className="text-gray-500">No appointments scheduled.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Doctor
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {appointments.map((appointment) => (
                                                <tr key={appointment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {appointment.doctor.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(appointment.appointment_date).toLocaleString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                            ${appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                                              appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                              'bg-red-100 text-red-800'}`}>
                                                            {appointment.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {appointment.status === 'scheduled' && (
                                                            <Link
                                                                href={route('appointments.join', appointment.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                            >
                                                                Join Meeting
                                                            </Link>
                                                        )}
                                                        <Link
                                                            href={route('appointments.show', appointment.id)}
                                                            className="text-gray-600 hover:text-gray-900"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
