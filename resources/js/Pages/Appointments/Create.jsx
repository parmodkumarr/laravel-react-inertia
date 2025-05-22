import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ doctors }) => {
    const { data, setData, post, processing, errors } = useForm({
        doctor_id: '',
        appointment_date: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Schedule Appointment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Schedule New Appointment</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700">
                                        Select Doctor
                                    </label>
                                    <select
                                        id="doctor_id"
                                        value={data.doctor_id}
                                        onChange={(e) => setData('doctor_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select a doctor</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.doctor_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.doctor_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700">
                                        Appointment Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="appointment_date"
                                        value={data.appointment_date}
                                        onChange={(e) => setData('appointment_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.appointment_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.appointment_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.notes && (
                                        <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Schedule Appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
