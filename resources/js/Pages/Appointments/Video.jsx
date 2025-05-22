import React, { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { ZoomMtg } from '@zoomus/websdk';

const Video = ({ appointment, isHost }) => {
    const zoomRootRef = useRef(null);

    useEffect(() => {
        // Initialize Zoom SDK
        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        // Generate signature
        const generateSignature = async () => {
            const response = await axios.post('/api/zoom/signature', {
                meetingNumber: appointment.zoom_meeting_id,
                role: isHost ? 1 : 0, // 1 for host, 0 for attendee
            });
            return response.data.signature;
        };

        const joinMeeting = async () => {
            const signature = await generateSignature();

            ZoomMtg.init({
                leaveUrl: window.location.origin + '/appointments',
                success: () => {
                    ZoomMtg.join({
                        signature,
                        meetingNumber: appointment.zoom_meeting_id,
                        userName: isHost ? 'Doctor' : 'Patient',
                        apiKey: process.env.MIX_ZOOM_API_KEY,
                        passWord: appointment.zoom_password,
                        success: () => {
                            console.log('Joined meeting successfully');
                        },
                        error: (error) => {
                            console.error('Failed to join meeting:', error);
                        }
                    });
                }
            });
        };

        joinMeeting();
    }, [appointment, isHost]);

    return (
        <>
            <Head title="Video Consultation" />
            <div className="min-h-screen bg-gray-100">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h1 className="text-2xl font-semibold mb-4">
                                    Video Consultation
                                </h1>
                                <div ref={zoomRootRef} id="zmmtg-root"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Video;
