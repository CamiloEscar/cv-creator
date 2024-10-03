import './App.css';

import React from 'react';
import CvForm from './components/CvForm';

const App = () => {
    return (
        <div className="container mx-auto">
            <h1>Creador de CV</h1>
            <CvForm />
        </div>
    );
};

export default App;
