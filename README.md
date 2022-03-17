# Init 
yarn create react-app my-app --template redux-typescript
yarn add redux-saga
yarn add tape

yarn add react-router-dom
yarn add @types/react-router-dom
# add  "baseUrl": "./src" in tsconfig

# .prettierrc

# useDispatch ➤ useAppDispatch
# useSelector ➤ useAppSelector

yield takeEvery('*', log)
yield takeEvery('counter/increment', log)
yield takeEvery(increment().type, log)  {increment} ➤ export from counterSlice.actions

