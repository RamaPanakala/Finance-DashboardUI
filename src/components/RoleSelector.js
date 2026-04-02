import React from 'react';
import { useAppContext } from '../AppContext';

const RoleSelector = () => {
  const { role, setRole } = useAppContext();

  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-700">Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded"
      >
        <option value="Viewer">Viewer</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSelector;