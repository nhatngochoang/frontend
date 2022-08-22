
# useDispatch ➤ useAppDispatch
# useSelector ➤ useAppSelector

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
