import type { FC } from 'react';
import { useEffect, useState } from 'react';
import LinkCategoryManage from './linkcategorymanage';

const LinkCategoryPage: FC = () => {
  const [loading, setLoading] = useState(true);
  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <LinkCategoryManage loading={loading} />
    </div>
  );
};

export default LinkCategoryPage;
