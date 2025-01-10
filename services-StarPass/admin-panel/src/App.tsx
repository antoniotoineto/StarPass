import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectGate from './screens/SelectGate';
import GateCodes from './screens/GateCodes';
import AdminPanel from './screens/Home';
import ActiveUsers from './screens/ActiveUsers';
import AttractionQueue from './screens/AtractionsQueues';
import SelectAttraction from './screens/SelectAttraction';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/codes" element={<SelectGate />} />
                <Route path="/codes/:gate" element={<GateCodes />} />
                <Route path="/active-users" element={<ActiveUsers />} />
                <Route path="/queues" element={<SelectAttraction />} />
                <Route path="/queues/:id" element={<AttractionQueue />} />


            </Routes>
        </Router>
    );
};

export default App;
