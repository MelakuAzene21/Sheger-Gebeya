import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateProfileByAdminMutation } from '../features/api/authApi';
import { useEffect, useState } from 'react';
import Title from '../Layout/Title';

export default function GetAllUser() {
    const { data: users, error, isLoading } = useGetAllUsersQuery(); // Fetch all users
    const [deleteUser] = useDeleteUserMutation();
    const [updateProfile] = useUpdateProfileByAdminMutation(); // Mutation to update profile

    const [editingUser, setEditingUser] = useState(null); // Holds the user being edited
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');

    useEffect(() => {
        if (error) {
            console.log('Error fetching users:', error);
        }
    }, [error]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show loading
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 text-red-600 border border-red-400 px-4 py-2 rounded-md">
                    Error: {error.message}
                </div>
            </div>
        );
    }

    // Ensure users are always in array format
    const userArray = Array.isArray(users) ? users : [users];

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);  // Call the mutation to delete the user
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    const handleUpdate = (user) => {
        setEditingUser(user);  // Set the user being edited
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        if (editingUser) {
            try {
                // Update the user profile using the mutation
                await updateProfile({
                    _id: editingUser._id,
                    name: updatedName,
                    email: updatedEmail,
                }).unwrap(); // Unwrap to handle promise properly

                // Clear the form and reset editing state
                setEditingUser(null);
                setUpdatedName('');
                setUpdatedEmail('');
            } catch (error) {
                console.log('Error updating user:', error);
            }
        }
    };


    return (
        <div className="flex justify-center items-center flex-col h-screen">
           <Title title={"All User"}/>
            <div className="w-full max-w-5xl mt-16"> {/* Added margin-top to avoid navbar overlap */}
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userArray.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="px-6 py-4 text-sm text-gray-700">{user._id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        onClick={() => handleUpdate(user)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Form */}
            {editingUser && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                    <form onSubmit={handleSubmitUpdate} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Update User</h3>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
