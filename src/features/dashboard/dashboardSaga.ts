import studentApi from '../../api/student';
import { City, ListResponse, Student } from '../../models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from './dashboardSlice';
import cityApi from '../../api/cityApi';

// call ➤ Blocking
function* fetchStatistics() {
   // fetch all Data
   const responseList: Array<ListResponse<Student>> = yield all([
      call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
      call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
      call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
      call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
   ]);
   // console.log(responseList);
   const statisticList = responseList.map((item) => item.pagination._totalRows); // [ 22, 29, 13, 16 ] ➤ total results each responseList
   const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
   yield put(
      dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
   ); // set Statistics data
}

function* fetchHighestStudentList() {
   // fetch by call()
   const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
   });
   // set by put()
   yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
   const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
   });

   yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
   // Fetch city list
   const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

   // Fetch students ranking by mark per city
   const callList = cityList.map((city) =>
      call(studentApi.getAll, {
         _page: 1,
         _limit: 5,
         _sort: 'mark',
         _order: 'desc',
         city: city.code,
      })
   );

   const responseList: Array<ListResponse<Student>> = yield all(callList);

   const rankingByCityList: Array<RankingByCity> = responseList.map((resList, idx) => ({
      cityId: cityList[idx].code,
      rankingList: resList.data, // students ranking by mark per city data
   }));

   // Update state rankingByCityList
   yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}
function* fetchDashboardData() {
   try {
      yield all([
         call(fetchStatistics),
         call(fetchHighestStudentList),
         call(fetchLowestStudentList),
         call(fetchRankingByCityList),
      ]);
   } catch (error) {
      console.log('Failed to fetch dashboard data', error);
      yield put(dashboardActions.fetchDataFailed());
   }
}

export default function* dashboardSaga() {
   yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
