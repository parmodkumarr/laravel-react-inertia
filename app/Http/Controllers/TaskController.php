<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with('project')->latest()->get();
        $users = User::all();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'users' => $users,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        $projects = Project::all();
        return Inertia::render('Tasks/Create', ['projects' => $projects]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'project_id' => 'required|exists:projects,id',
        ]);

        $task = Task::create($validated);

        return redirect()->route('tasks.index');
    }

    public function edit(Task $task)
    {
        $projects = Project::all();
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => $projects
        ]);
    }

    public function update(Request $request, Task $project)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'nullable'
        ]);
        $project->update($data);
        return redirect()->route('tasks.index');
    }

    public function destroy(Task $project)
    {
        $project->delete();
        return redirect()->route('tasks.index');
    }
}
