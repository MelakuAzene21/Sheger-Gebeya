import { useGetCurrentUserQuery, useUpdateProfileMutation } from '../features/api/authApi';
import { useEffect, useState } from 'react';
import Title from '../Layout/Title';

export default function UpdateProfile() {
    const { data: user, error, isLoading } = useGetCurrentUserQuery(); // Fetch current user info
    const [updateProfile] = useUpdateProfileMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (error) {
            console.log('Error fetching user:', error);
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({
                _id: user._id,
                name,
                email,
            }).unwrap();
            setIsEditing(false); // Exit editing mode after successful update
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
               <Title title={"Update profile"}/>
                <div className="bg-gray-100 text-gray-600 border border-gray-400 px-4 py-2 rounded-md">
                    No user data available
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h1>

                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4 text-left">
                        <p className="text-lg">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-lg">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
