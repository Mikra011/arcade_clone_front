import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation, useRegisterUserMutation } from '../state/arcadeApi';

export default function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)  // State to hold backend errors
    const [successMessage, setSuccessMessage] = useState(null)  // State to hold success message

    const [registerUser] = useRegisterUserMutation()
    const [loginUser] = useLoginUserMutation()

    const loginSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(10, 'Username must be 10 characters or less')
            .required('Username is required'),
        password: Yup.string()
            .min(3, 'Password must be at least 3 characters')
            .max(10, 'Password must be 10 characters or less')
            .required('Password is required'),
    });

    const registerSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(10, 'Username must be 10 characters or less')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(3, 'Password must be at least 3 characters')
            .max(10, 'Password must be 10 characters or less')
            .required('Password is required'),
    })

    const handleRegister = async (values) => {
        try {
            setError(null);  // Clear previous errors
            const result = await registerUser(values).unwrap()
            setSuccessMessage(result.message)  // Set success message
        } catch (error) {
            setError(error?.data?.message || 'Registration failed')  // Set backend error message
        }
    }

    const handleLogin = async (values) => {
        try {
            setError(null)  // Clear previous errors
            const result = await loginUser(values).unwrap()
            if (result.token) {
                localStorage.setItem('token', result.token)
                setSuccessMessage(result.message)  // Set success message
            }
        } catch (error) {
            setError(error?.data?.message || 'Login failed')  // Set backend error message
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: isLogin ? loginSchema : registerSchema,
        onSubmit: isLogin ? handleLogin : handleRegister,
    })

    const handleFormSwitch = () => {
        setIsLogin(!isLogin)
        formik.resetForm()  // Reset form when switching between login/register
        setError(null) // Clear errors when switching forms
        setSuccessMessage(null)  // Clear success message when switching forms
    }

    const handleContinue = () => {
        if (isLogin) {
            onClose()  // Close the modal and reload the page for login success
            window.location.reload()
        } else {
            setIsLogin(true)  // Switch to the login form for registration success
            setSuccessMessage(null)  // Clear the success message
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full relative">
                {/* Conditionally render the close button only if there's no success message */}
                {!successMessage && (
                    <button onClick={onClose} className="absolute top-4 right-4">X</button>
                )}
                
                {/* Display success message when registration or login is successful */}
                {successMessage ? (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">{successMessage}</h2>
                        <button
                            onClick={handleContinue}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Display backend error messages */}
                        {error && (
                            <div className="mb-4 text-red-500 text-center">
                                {error}
                            </div>
                        )}

                        {isLogin ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Login</h2>
                                {/* Login Form */}
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                            placeholder='write username here'
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                            placeholder='write password here'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Register</h2>
                                {/* Registration Form */}
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                            placeholder='write username here'
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                            placeholder='write email here'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="mt-1 p-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                            placeholder='write password here'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white py-2 rounded-md"
                                    >
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
                )}
            </div>
        </div>
    )
}
