'use client';

import { useState } from 'react';

interface User {
  id: number;
  username: string;
}

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search-users?q=${value}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error('Failed to fetch:', res.status);
        return;
      }

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching or parsing JSON:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by username..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-4 space-y-2">
        {results.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-white rounded-md shadow hover:bg-gray-100"
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
