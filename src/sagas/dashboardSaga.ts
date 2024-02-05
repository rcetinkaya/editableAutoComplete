"use client"
import {
  put,
  call,
  takeLatest,
  CallEffect,
  PutEffect,
  select,
  takeEvery,
} from "redux-saga/effects";
import { fetchDataFailure, fetchDataSuccess } from "../reducers/dataReducer";
import { fetchDashboardData } from "../services/dashboardServices";


type LoginActionType = {
  type: string;
  payload: {
    email: string;
    password: string;
    customerName: string;
    token: string;
    gdprAccept: boolean;
  };
};

// Bu örnek fonksiyon, gerçek API çağrınızı temsil eder.
function* fetchJourneyList(action:any): Generator<CallEffect | PutEffect, void, unknown> {
  try {
  
    console.log("action : ", action)
     const response: any = yield call(fetchDashboardData,action);
    // access_token kontrolü

    if (response) {
   
        yield put(fetchDataSuccess(response));
      
    }
    else {
      // access_token gelmezse logout işlemi gerçekleştirin.
      yield put(fetchDataFailure("Reason for failure")); 
    }
  } catch (error: any) {

    // Herhangi bir hatada logout işlemi gerçekleştirin.
    yield put(fetchDataFailure(error.message)); 
  }
}


export default function* watchDashboardSaga() {

  yield takeLatest("data/fetchDataRequest", fetchJourneyList);
 
  yield takeEvery('*', function*(action) {
    console.log(action);
});
}
