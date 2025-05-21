import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';

const ProjectsEdit = ({ project }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: project.name,
    description: project.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/projects/${project.id}`);
  };

  return (
    <AppLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-semibold mb-6">Edit Project</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <InputLabel htmlFor="name" value="Project Name" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                  <InputLabel htmlFor="description" value="Description" />
                  <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    onChange={(e) => setData('description', e.target.value)}
                    rows="4"
                  />
                  {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>

                <div className="flex items-center justify-end">
                  <PrimaryButton className="ml-4" disabled={processing}>
                    Update Project
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectsEdit;
