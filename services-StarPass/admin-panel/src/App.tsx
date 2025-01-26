import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectGate from './screens/SelectGate';
import GateCodes from './screens/GateCodes';
import AdminPanel from './screens/Home';
import ActiveUsers from './screens/ActiveUsers';
import SelectAttraction from './screens/SelectAttraction';
import AttractionStatus from './screens/AttractionStatus';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/codes" element={<SelectGate />} />
                <Route path="/codes/:gate" element={<GateCodes />} />
                <Route path="/active-users" element={<ActiveUsers />} />
                <Route path="/attractions" element={<SelectAttraction />} />
                <Route path="/attractions/:id" element={<AttractionStatus />} />


            </Routes>
        </Router>
    );
};

export default App;
