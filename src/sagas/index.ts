import { all } from 'redux-saga/effects';
import watchDashboardSaga from './dashboardSaga';


export default function* rootSaga() {
  yield all([
    watchDashboardSaga()
  
    // Diğer saga'ları buraya ekleyebilirsiniz.
  ]);
}