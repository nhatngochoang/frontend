# Init 
```bash
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

npm install react-hook-form
npm i react-select

npm i formik

npm i @material-ui/core @material-ui/icons
npm i styled-components @types/styled-components
npm i react-query
```
# add  "baseUrl": "./src" in tsconfig

# .prettierrc

# useDispatch ➤ useAppDispatch
# useSelector ➤ useAppSelector

yield takeEvery('*', log)
yield takeEvery('counter/increment', log)
yield takeEvery(increment().type, log)  {increment} ➤ export from counterSlice.actions


----
### Different ways to handle navigation in Redux Saga
1. Watch redux store and make redirect on component
```jsx
const function App() {
  const loginSuccess = useAppSelector(state => state.auth.loginSuccess)
  
  useEffect(() => {
    if (loginSuccess) {
      // redirect to admin page
    }
  }, [loginSuccess])
  // ...
}
```
--> Flow is fragmented, hard to control when you have more and more state.
2. Using callbacks
- This approach using non-serializable (callback) in action and dispatch to redux store which is **NOT RECOMMENDED** BY Redux Toolkit.
```jsx
const function App() {
  const dispatch = useAppDispatch();
  
  const handleLoginSubmit = (values) => {
    dispatch(authActions.login({
      ...values,
      onSuccess: () => history.push('/admin'),
      onError: () => console.log('Notify error to user'),
    }))
  }
  // ...
}
```
3. Using connected-react-router
- Sync routings to redux.
- Navigate by dispatching an action to redux store.
- One thing to make sure, when route changes, it doesn't cause re-render our components.
--> We'll go with this solution for now.
Lib: connected-react-router + custom history


student slice state:
- loading
- list
- pagination
- filter { page: 1, limit: 10, ... }

# Bug
https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/