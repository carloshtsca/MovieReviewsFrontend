import React from 'react';
import Navbar from './components/user/Navbar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';

export default function App() {
    return (
        <div>
            <Navbar />
            <Signup />
        </div>
    );
};
