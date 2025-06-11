import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function VerifyOtp({ status, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        email: email,
    });

    useEffect(() => {
        return () => {
            reset('code');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login.verify-otp'));
    };

    const resendOtp = () => {
        post(route('login.resend-otp'), {
            data: { email: email },
            preserveScroll: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Verify OTP" />

            <div className="mb-4 text-sm text-gray-600">
                Please enter the 6-digit code sent to your email address.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="code" value="OTP Code" />
                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        autoComplete="one-time-code"
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                        maxLength={6}
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Verify Code
                    </PrimaryButton>

                    <button
                        type="button"
                        onClick={resendOtp}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                        disabled={processing}
                    >
                        Resend Code
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
} 