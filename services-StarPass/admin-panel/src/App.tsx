import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectGate from './screens/SelectGate';
import GateCodes from './screens/GateCodes';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SelectGate />} />
                <Route path="/codes/:gate" element={<GateCodes />} />
            </Routes>
        </Router>
    );
};

export default App;
