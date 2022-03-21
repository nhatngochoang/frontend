import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
   dashboardActions,
   selectDashboardLoading,
   selectDashboardStatistics,
   selectHighestStudentList,
   selectLowestStudentList,
   selectRankingByCityList,
} from './dashboardSlice';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
   const dispatch = useAppDispatch();
   const loading = useAppSelector(selectDashboardLoading);
   const statistics = useAppSelector(selectDashboardStatistics);
   const highestStudentList = useAppSelector(selectHighestStudentList);
   const lowestStudentList = useAppSelector(selectLowestStudentList);
   const rankingByCityList = useAppSelector(selectRankingByCityList);

   console.log({
      loading,
      statistics,
      highestStudentList,
      lowestStudentList,
      rankingByCityList,
   });

   React.useEffect(() => {
      dispatch(dashboardActions.fetchData());
   }, [dispatch]);

   return <div>Dashboard</div>;
}
