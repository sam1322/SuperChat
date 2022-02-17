import logo from './logo.svg';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import SignIn , {SignOut} from './Authentication';
import { auth } from './firebase'
import ChatRoom from './ChatRoom' 

function App() {
  const [user] = useAuthState(auth)
  // console.log("User " ,user)
  // console.log("Auth ", auth)
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
