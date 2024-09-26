import { useGetCurrentUserQuery } from '../features/api/authApi';
import { useEffect } from 'react';
import Title from '../Layout/Title';

export default function Profile() {
    const { data: user, error, isLoading } = useGetCurrentUserQuery(); // Fetch current user info

    useEffect(() => {
        if (error) {
            console.log('Error fetching user:', error);
        }
    }, [error]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show loading while fetching user data
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
                <Title title={"Profile Page"}/>
                <div className="bg-gray-100 text-gray-600 border border-gray-400 px-4 py-2 rounded-md">
                    No user data available
                </div>
            </div>
        );
    }

    // Display the single user's details with attractive styling
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h1>
                <ul className="space-y-4 text-left">
                    <li className="text-lg">
                        <strong>ID:</strong> {user._id}
                    </li>
                    <li className="text-lg">
                        <strong>Name:</strong> {user.name}
                    </li>
                    <li className="text-lg">
                        <strong>Email:</strong> {user.email}
                    </li>
                    <li className="text-lg">
                        <strong>Role:</strong> {user.role}
                    </li>
                </ul>
            </div>
        </div>
    );
}
