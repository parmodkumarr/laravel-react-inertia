import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const peerConnection = useRef(null);
    const localStream = useRef(null);
    const echo = useRef(null);

    useEffect(() => {
        initializeMedia();
        initializeWebRTC();
        return () => {
            cleanup();
        };
    }, [roomId]);

    const initializeMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStream.current = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const initializeWebRTC = () => {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };

        peerConnection.current = new RTCPeerConnection(configuration);

        // Add local stream tracks to peer connection
        localStream.current?.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, localStream.current);
        });

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal({
                    type: 'candidate',
                    data: event.candidate
                });
            }
        };

        // Handle incoming tracks
        peerConnection.current.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // Initialize Pusher
        window.Pusher = Pusher;

        echo.current = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
            enabledTransports: ['ws', 'wss'],
            authEndpoint: '/broadcasting/auth',
            auth: {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                }
            }
        });

        // Listen for signals
        echo.current.private(`teleconsultation-${roomId}`)
            .listen('signal', (data) => {
                handleSignal(data);
            });
    };

    const handleSignal = async (signal) => {
        if (!peerConnection.current) return;

        switch (signal.type) {
            case 'offer':
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.data));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                sendSignal({
                    type: 'answer',
                    data: answer
                });
                break;

            case 'answer':
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.data));
                break;

            case 'candidate':
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal.data));
                break;
        }
    };

    const sendSignal = async (signal) => {
        try {
            await axios.post('/signal', {
                roomId,
                type: signal.type,
                data: signal.data,
                from: 'user-' + Math.random().toString(36).substr(2, 9)
            });
        } catch (error) {
            console.error('Error sending signal:', error);
        }
    };

    const startCall = async () => {
        try {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            sendSignal({
                type: 'offer',
                data: offer
            });
            setIsCallActive(true);
        } catch (error) {
            console.error('Error starting call:', error);
        }
    };

    const toggleMute = () => {
        if (localStream.current) {
            const audioTracks = localStream.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream.current) {
            const videoTracks = localStream.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const cleanup = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
        }
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => track.stop());
        }
        if (echo.current) {
            echo.current.disconnect();
        }
        setIsCallActive(false);
    };

    const endCall = () => {
        cleanup();
    };

    return (
        <>
            <Head title="Teleconsultation" />
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <video
                                                ref={localVideoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full rounded-lg shadow-lg"
                                            />
                                            <div className="absolute bottom-2 left-2 text-white text-sm">
                                                You
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <video
                                                ref={remoteVideoRef}
                                                autoPlay
                                                playsInline
                                                className="w-full rounded-lg shadow-lg bg-gray-900"
                                            />
                                            <div className="absolute bottom-2 left-2 text-white text-sm">
                                                Remote User
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-4">
                                        {!isCallActive && (
                                            <button
                                                onClick={startCall}
                                                className="p-3 rounded-full bg-green-500"
                                            >
                                                📞
                                            </button>
                                        )}
                                        <button
                                            onClick={toggleMute}
                                            className={`p-3 rounded-full ${
                                                isMuted ? 'bg-red-500' : 'bg-gray-200'
                                            }`}
                                        >
                                            {isMuted ? '🔇' : '🔊'}
                                        </button>
                                        <button
                                            onClick={toggleVideo}
                                            className={`p-3 rounded-full ${
                                                isVideoOff ? 'bg-red-500' : 'bg-gray-200'
                                            }`}
                                        >
                                            {isVideoOff ? '📷' : '📹'}
                                        </button>
                                        <button
                                            onClick={endCall}
                                            className="p-3 rounded-full bg-red-500"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCall;
