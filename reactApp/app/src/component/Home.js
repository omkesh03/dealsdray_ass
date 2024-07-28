import React,{useState,useEffect} from 'react';
//import Dashboard from './component/Dashboard';
import '../App.css';
import Dashboard from './Dashboard';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if credentials are stored in localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ f_userName: username, f_Pwd: password })
      });

      if (response.ok) {
        localStorage.setItem('username', username); // Storing username
        localStorage.setItem('password', password); // Storing password
        setIsLoggedIn(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal Server Error');
    }
  };

  if (isLoggedIn) {
    return <Dashboard></Dashboard>;
  }
  return (
    <div>
      <h1>Logo</h1>
      <p className="yellow-strip">login page</p>
      <div className='container'>
        <input placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}>
        </input>
      </div>
      
      <div className='container'>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="container">
        <button onClick={handleLogin}>Login</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Home;
