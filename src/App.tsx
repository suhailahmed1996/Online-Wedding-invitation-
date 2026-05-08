/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InvitationPage } from './components/InvitationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invite/:guestSlug" element={<InvitationPage />} />
        {/* Default route for demonstration or generic access */}
        <Route path="/" element={<Navigate to="/invite/Guest" />} />
      </Routes>
    </Router>
  );
}
