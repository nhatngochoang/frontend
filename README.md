# Init 
yarn create react-app my-app --template redux-typescript
yarn add redux-saga
yarn add tape

yarn add react-router-dom
yarn add @types/react-router-dom

yarn add @mui/material @mui/styled-engine-sc styled-components
yarn add @mui/icons-material 
yarn add @mui/styles
yarn add @emotion/react
yarn add @emotion/styled

npm install --save connected-react-router
yarn add history@4.10.1
# add  "baseUrl": "./src" in tsconfig

# .prettierrc

# useDispatch ➤ useAppDispatch
# useSelector ➤ useAppSelector

yield takeEvery('*', log)
yield takeEvery('counter/increment', log)
yield takeEvery(increment().type, log)  {increment} ➤ export from counterSlice.actions

# Handle Loading and Error
- Loading: store in redu
- Error: 
  + Trigger Toast
  + Call API directly in Component not through Saga (only when need Saga Effect)