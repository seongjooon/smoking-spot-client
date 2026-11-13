import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { APIProvider } from '@vis.gl/react-google-maps';

import './components/App.scss';
import './components/Map.scss';
import Map from './components/Map';
import New from './components/New';
import Detail from './components/Detail';
import { auth, googleProvider } from './lib/firebase';
import useAuth from './lib/useAuth';

const Logo = () => (
  <div className='main-logo'>
    <div className='logo-smoking'>SMOKING</div>
    <div className='logo-spot'>SPOT</div>
  </div>
);

const Home = ({ user }) => (
  <>
    <Logo />
    {user ? (
      <div className='home'>
        <div className='home-buttons'>
          <Link to='/spots' className='route map-button'>
            Map
          </Link>
          <Link to='/spots/new' className='route new-button'>
            New
          </Link>
          <button className='route signout-button' onClick={() => signOut(auth)}>
            Sign out!
          </button>
        </div>
      </div>
    ) : (
      <button
        className='signin-button'
        onClick={() => signInWithPopup(auth, googleProvider).catch(console.error)}
      >
        Google로 로그인
      </button>
    )}
  </>
);

const App = () => {
  const user = useAuth();

  if (user === undefined) return <Logo />;

  const guard = element => (user ? element : <Navigate to='/home' replace />);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY} libraries={['places']}>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home user={user} />} />
        <Route path='/spots' element={guard(<Map />)} />
        <Route path='/spots/new' element={guard(<New />)} />
        <Route path='/spots/:id' element={guard(<Detail />)} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </APIProvider>
  );
};

export default App;
