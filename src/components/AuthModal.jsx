import React, { useState } from 'react';
import { useLoginUserMutation, useRegisterUserMutation } from '../state/arcadeApi';

export default function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerUser] = useRegisterUserMutation();
    const [loginUser] = useLoginUserMutation();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = { username, email, password };

        try {
            const result = await registerUser(userData).unwrap();
            console.log('Registration successful:', result);
            onClose();
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = { username, password };

        try {
            const result = await loginUser(credentials).unwrap();
            // console.log('Login successful:', result);
            if (result.token) {
                localStorage.setItem('token', result.token);
                // Trigger a refetch by updating the token in local storage
                window.location.reload(); 
            }
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleFormSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4">X</button>

                {isLogin ? (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        {/* Login Form */}
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder='write username here'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder='write password here'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md">
                                Login
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Register</h2>
                        {/* Registration Form */}
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder='write username here'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder='write e-mail here'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder='write password here'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-md">
                                Register
                            </button>
                        </form>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <button onClick={handleFormSwitch} className="text-blue-500 underline">
                        {isLogin ? 'Create an account' : 'Already have an account? Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}
