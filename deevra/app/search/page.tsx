'use client';

import UserSearch from '@/components/ui/UserSearch';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Search Users</h1>
      <UserSearch />
    </div>
  );
}
