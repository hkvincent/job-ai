'use client';
import { useQuery } from '@tanstack/react-query';
import { getStatsAction } from '@/utils/actions';
import StatsCard from './StatsCard';

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className='grid md:grid-cols-4 gap-4 lg:grid-cols-4'>
      <StatsCard title='pending jobs' value={data?.pending || 0} searchStatus='pending' />
      <StatsCard title='interviews set' value={data?.interview || 0} searchStatus='interview' />
      <StatsCard title='jobs declined' value={data?.declined || 0} searchStatus='declined' />
      <StatsCard title='jobs cancelled' value={data?.cancelled || 0} searchStatus='cancelled' />
    </div>
  );
}
export default StatsContainer;
