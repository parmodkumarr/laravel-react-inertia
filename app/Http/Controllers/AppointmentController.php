<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Services\ZoomService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    protected $zoomService;

    public function __construct(ZoomService $zoomService)
    {
        $this->zoomService = $zoomService;
    }

    public function index()
    {
        $appointments = auth()->user()->appointments()
            ->with('doctor')
            ->latest()
            ->get();

        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    public function create()
    {
        $doctors = \App\Models\User::where('role', 'doctor')->get();

        return Inertia::render('Appointments/Create', [
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:users,id',
            'appointment_date' => 'required|date|after:now',
            'notes' => 'nullable|string'
        ]);

        // Create Zoom meeting Old
        // $zoomMeeting = $this->zoomService->createMeeting(
        //     'Medical Consultation',
        //     $validated['appointment_date']
        // );

        $zoomMeeting = $this->zoomService->createMeeting([
                'topic' => $request->notes,
                'start_time' => $request->appointment_date,
                'duration' => 30,
            ]);

        $appointment = Appointment::create([
            'user_id' => auth()->id(),
            'doctor_id' => $validated['doctor_id'],
            'appointment_date' => $validated['appointment_date'],
            'notes' => $validated['notes'],
            'zoom_meeting_id' => $zoomMeeting['id'],
            'zoom_join_url' => $zoomMeeting['join_url'],
            'zoom_start_url' => $zoomMeeting['start_url'],
        ]);

        return redirect()->route('appointments.show', $appointment)
            ->with('success', 'Appointment scheduled successfully.');
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['doctor', 'user']);

        return Inertia::render('Appointments/Show', [
            'appointment' => $appointment
        ]);
    }

    public function join(Appointment $appointment)
    {
        if ($appointment->user_id !== auth()->id() && $appointment->doctor_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Appointments/Video', [
            'appointment' => $appointment,
            'isHost' => $appointment->doctor_id === auth()->id()
        ]);
    }
}
