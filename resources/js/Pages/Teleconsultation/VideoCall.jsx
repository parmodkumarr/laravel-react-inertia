import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { connect, createLocalVideoTrack, createLocalAudioTrack, Room } from 'twilio-video';

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [room]);

    const connectToRoom = async () => {
        try {
            // Get token from server
            const response = await axios.post('/twilio/token', {
                roomName: roomId
            });

            const { token, identity } = response.data;

            // Create local tracks
            const localTracks = await Promise.all([
                createLocalVideoTrack(),
                createLocalAudioTrack()
            ]);

            // Connect to room
            const room = await connect(token, {
                name: roomId,
                tracks: localTracks
            });

            setRoom(room);

            // Attach local video
            if (localVideoRef.current) {
                localTracks[0].attach(localVideoRef.current);
            }

            // Handle participant connections
            room.on('participantConnected', participant => {
                setParticipants(prevParticipants => [...prevParticipants, participant]);

                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        if (remoteVideoRef.current) {
                            track.attach(remoteVideoRef.current);
                        }
                    }
                });

                participant.on('trackSubscribed', track => {
                    if (remoteVideoRef.current) {
                        track.attach(remoteVideoRef.current);
                    }
                });
            });

            // Handle participant disconnections
            room.on('participantDisconnected', participant => {
                setParticipants(prevParticipants =>
                    prevParticipants.filter(p => p !== participant)
                );
            });

            setIsCallActive(true);
        } catch (error) {
            console.error('Error connecting to room:', error);
            setError('Failed to connect to video call');
        }
    };

    const toggleMute = () => {
        if (room) {
            const audioTracks = Array.from(room.localParticipant.audioTracks.values());
            audioTracks.forEach(track => {
                track.track.enable(!isMuted);
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (room) {
            const videoTracks = Array.from(room.localParticipant.videoTracks.values());
            videoTracks.forEach(track => {
                track.track.enable(!isVideoOff);
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        if (room) {
            room.disconnect();
            setRoom(null);
            setParticipants([]);
            setIsCallActive(false);
        }
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
                                    {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                            {error}
                                        </div>
                                    )}
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
                                                onClick={connectToRoom}
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
