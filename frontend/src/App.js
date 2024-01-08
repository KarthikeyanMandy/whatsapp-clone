import React, { useEffect } from 'react';
import Login from "./Components/Login";
import Home from './Components/Home';
import { useStateValue } from './Components/StateProvider';

function App() {

  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'set_user', user: JSON.parse(storedUser) })
    }
  }, [dispatch])

  return (
    <div className='app-container'>
      {!state.user ? <Login /> : <Home />}
    </div>
  );
}

export default App;
