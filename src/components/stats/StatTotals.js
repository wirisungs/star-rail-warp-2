import { useEffect, useState } from 'react';
import ResourceTotal from "./ResourceTotal";
import { warpService } from '../../services/warpService';

export default function StatTotals() {
  const [totals, setTotals] = useState({
    beginner: { total: 0, single: 0, ten: 0, jades: 0 },
    char: { total: 0, single: 0, ten: 0, jades: 0 },
    weap: { total: 0, single: 0, ten: 0, jades: 0 },
    standard: { total: 0, single: 0, ten: 0, jades: 0 }
  });

  const loadStats = async () => {
    try {
      const stats = await warpService.getWarpStats();
      const newTotals = {
        beginner: { total: 0, single: 0, ten: 0, jades: 0 },
        char: { total: 0, single: 0, ten: 0, jades: 0 },
        weap: { total: 0, single: 0, ten: 0, jades: 0 },
        standard: { total: 0, single: 0, ten: 0, jades: 0 }
      };

      stats.forEach(stat => {
        const bannerKey = stat.bannerType === 'character' ? 'char' :
                         stat.bannerType === 'weapon' ? 'weap' :
                         stat.bannerType;
        if (newTotals[bannerKey]) {
          newTotals[bannerKey] = {
            total: stat.totalPulls || 0,
            single: stat.singlePulls || 0,
            ten: stat.tenPulls || 0,
            jades: stat.totalJades || 0
          };
        }
      });

      setTotals(newTotals);
    } catch (error) {
      console.error('Error loading warp stats:', error);
    }
  };

  // Load stats khi component mount
  useEffect(() => {
    loadStats();
  }, []);

  // Cập nhật stats mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Tính tổng số roll và ngọc
  const totalSinglePulls = totals.beginner.single + totals.char.single + totals.weap.single + totals.standard.single;
  const totalTenPulls = totals.beginner.ten + totals.char.ten + totals.weap.ten + totals.standard.ten;
  const totalJades = totals.beginner.jades + totals.char.jades + totals.weap.jades + totals.standard.jades;

  return (
    <div className="stat-totals">
      {/* <div className="d-flex align-content-center justify-content-evenly mb-3">
        <ResourceTotal type="single-pull" amount={totalSinglePulls} label="Single Pulls" />
        <ResourceTotal type="ten-pull" amount={totalTenPulls} label="10x Pulls" />
      </div> */}
      <div className="d-flex align-content-center justify-content-evenly">
        <ResourceTotal type="sr-pass" amount={Math.floor(totals.beginner.total + totals.standard.total)} label="Regular Passes" />
        <ResourceTotal type="srs-pass" amount={totals.char.total + totals.weap.total} label="Special Passes" />
        <ResourceTotal type="stellar-jade" amount={totalJades} label="Total Jades" />
      </div>
    </div>
  );
}
