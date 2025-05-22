import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Show = ({ appointment }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Appointment Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Appointment Details</h2>
                                <Link
                                    href={route('appointments.index')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Back to Appointments
                                </Link>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Doctor Information</h3>
                                    <p className="mt-1 text-sm text-gray-600">{appointment.doctor.name}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Appointment Time</h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {new Date(appointment.appointment_date).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Status</h3>
                                    <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                          'bg-red-100 text-red-800'}`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                {appointment.notes && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                                        <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
                                    </div>
                                )}

                                {appointment.status === 'scheduled' && (
                                    <div className="pt-4">
                                        <Link
                                            href={route('appointments.join', appointment.id)}
                                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                                        >
                                            Join Video Consultation
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;