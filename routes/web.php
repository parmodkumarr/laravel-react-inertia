<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectAssignmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::resource('projects', ProjectController::class);
Route::resource('tasks', TaskController::class);

Route::post('/assign-project/{project_id}/users', [ProjectAssignmentController::class, 'assignProjectsToUser']);
Route::post('/unassign-project/{project_id}/users', [ProjectAssignmentController::class, 'unassignProjectsFromUser']);

Route::post('/assign-task/{task_id}/users', [ProjectAssignmentController::class, 'assignTasksToUser']);
Route::post('/unassign-task/{task_id}/users', [ProjectAssignmentController::class, 'unassignProjectsFromUser']);