import React, { useState } from 'react';
import { useUpdatePasswordMutation } from '../features/api/authApi'; // Adjust import path as needed

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePassword({ currentPassword, newPassword }).unwrap();
        } catch (err) {
            console.error('Error updating password:', err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Update Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-gray-700">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                            required
                        />
                    </div>
                    {error && <div className="text-red-600">{error.message}</div>}
                    {isSuccess && <div className="text-green-600">Password updated successfully</div>}
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}
