'use client';
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getChartsDataAction } from '@/utils/actions';

function ChartsContainer() {
  const [period, setPeriod] = useState('monthly'); // State to store the period choice

  const { data, refetch } = useQuery({
    queryKey: ['charts', period], // Include period in the query key for proper caching
    queryFn: () => getChartsDataAction(period === 'weekly'),
  });

  // Handle period change
  const handlePeriodChange = (event: any) => {
    setPeriod(event.target.value);
    refetch(); // Refetch the data when period changes
  };

  if (!data || data.length < 1) return null;
  console.log(data);
  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        {period.charAt(0).toUpperCase() + period.slice(1)} Applications
      </h1>
      <div className="flex justify-center my-4">
        <select value={period} onChange={handlePeriodChange} className="text-center px-4 py-2 border rounded-md">
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2563eb' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default ChartsContainer;

