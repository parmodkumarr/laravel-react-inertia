import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import AppLayout from '@/Layouts/AppLayout';

const ProjectsIndex = ({ projects, users, flash }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    user_ids: [],
  });

  const handleAssign = (projectId) => {
    setSelectedProject(projectId);
    setShowAssignModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/assign-project/${selectedProject}/users`, {
      onSuccess: () => {
        setShowAssignModal(false);
        setSelectedProject(null);
      },
    });
  };

  return (
    <AppLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {flash?.success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{flash.success}</span>
            </div>
          )}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <Link href="/projects/create" className="btn btn-primary">Create New Project</Link>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{project.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/projects/${project.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                        <button
                          onClick={() => handleAssign(project.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {showAssignModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Assign Project</h3>
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                              <InputLabel htmlFor="user_ids" value="Select Users" />
                              <SelectInput
                                id="user_ids"
                                name="user_ids"
                                value={data.user_ids}
                                onChange={e => setData('user_ids', e.target.value)}
                                options={users}
                                multiple={true}
                                placeholder="Select users to assign..."
                              />
                              {errors.user_ids && <div className="text-red-500 text-sm mt-1">{errors.user_ids}</div>}
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <PrimaryButton
                                type="submit"
                                className="w-full sm:w-auto sm:ml-3"
                                disabled={processing}
                              >
                                Assign
                              </PrimaryButton>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => setShowAssignModal(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectsIndex;
