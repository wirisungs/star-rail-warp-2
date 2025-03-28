import { useEffect, useState } from 'react';
import bannerObserver from '../observer/BannerObserver';

const useBannerObserver = (bannerType) => {
  const [bannerState, setBannerState] = useState(null);

  useEffect(() => {
    const handleBannerUpdate = (data) => {
      if (data.type === bannerType) {
        setBannerState(data);
      }
    };

    // Subscribe to banner updates
    const unsubscribe = bannerObserver.subscribe(handleBannerUpdate);

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [bannerType]);

  return bannerState;
};

export default useBannerObserver;
