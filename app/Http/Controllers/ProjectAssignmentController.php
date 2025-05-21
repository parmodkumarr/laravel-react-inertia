<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectAssignment;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Notifications\ProjectAssigned;
use App\Notifications\ProjectUnassigned;
use App\Notifications\TaskAssigned;
use App\Notifications\TaskUnassigned;
use Inertia\Inertia;

class ProjectAssignmentController extends Controller
{
    public function assignProjectsToUser(Request $request, $projectId)
    {
        $request->validate([
            'user_ids' => 'array|required',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project = Project::findOrFail($projectId);

        $project->users()->syncWithoutDetaching($request->user_ids);

        // Notify each user
        $users = User::whereIn('id', $request->user_ids)->get();
        foreach ($users as $user) {
            $user->notify(new ProjectAssigned($project));
        }

        return redirect()->back()->with('success', 'Project assigned successfully!');
    }

    public function unassignProjectsFromUser(Request $request, $projectId)
    {
        $request->validate([
            'user_ids' => 'array|required',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project = Project::findOrFail($projectId);
        $users = User::whereIn('id', $request->user_ids)->get();

        $project->users()->detach($request->user_ids);

        // Notify users
        foreach ($users as $user) {
            $user->notify(new ProjectUnassigned($project));
        }

        return redirect()->back()->with('success', 'Project unassigned successfully!');
    }

    public function assignTasksToUser(Request $request, $taskId)
    {
        $request->validate([
            'user_ids' => 'array|required',
            'user_ids.*' => 'exists:users,id',
        ]);

        $task = Task::findOrFail($taskId);

        $task->users()->syncWithoutDetaching($request->user_ids);

        // Notify each user
        $users = User::whereIn('id', $request->user_ids)->get();
        foreach ($users as $user) {
            $user->notify(new TaskAssigned($task));
        }

        return redirect()->back()->with('success', 'Task assigned successfully!');
    }

    public function unassignTasksFromUser(Request $request, $taskId)
    {
        $request->validate([
            'user_ids' => 'array|required',
            'user_ids.*' => 'exists:users,id',
        ]);

        $task = Task::findOrFail($taskId);
        $users = User::whereIn('id', $request->user_ids)->get();

        $task->users()->detach($request->user_ids);

        // Notify users
        foreach ($users as $user) {
            $user->notify(new TaskUnassigned($task));
        }

        return redirect()->back()->with('success', 'Task unassigned successfully!');
    }

    // public function index()
    // {
    //     $assignments = ProjectAssignment::with(['user', 'project'])->get();
    //     return view('assignments.index', compact('assignments'));
    // }

    // public function create()
    // {
    //     $users = User::all();
    //     $projects = Project::all();
    //     return view('assignments.create', compact('users', 'projects'));
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'project_id' => 'required|exists:projects,id',
    //     ]);

    //     $assignment = ProjectAssignment::create([
    //         'user_id' => $request->user_id,
    //         'project_id' => $request->project_id,
    //     ]);

    //     $user = User::find($request->user_id);
    //     $project = Project::find($request->project_id);

    //     $user->notify(new ProjectAssigned($project));

    //     return redirect()->route('assignments.index')->with('success', 'Project assigned successfully.');
    // }
}
