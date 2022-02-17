import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from "react"
import { initializeApp } from "firebase/app";
import { doc, addDoc , onSnapshot, orderBy , collection,serverTimestamp, query, getFirestore, setDoc  } from "firebase/firestore";
import { getAuth ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import ChatMessage  from './ChatMessage';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4DLFw2rlq4QuELpdB64FCdIWsTyHAWms",
  authDomain: "superchat-8dbfd.firebaseapp.com",
  projectId: "superchat-8dbfd",
  storageBucket: "superchat-8dbfd.appspot.com",
  messagingSenderId: "346626395621",
  appId: "1:346626395621:web:64ae0b458cc4f6572a330c",
  measurementId: "G-MZ2DG5QBLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

const db = getFirestore()// documents  from firestore
// const firestore = 

function App() {
  const [user] = useAuthState(auth)
  console.log("User " ,user)
  console.log("Auth ", auth)
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>
    </div>
  );
}

function Chatroom(){
  const [messages,setMessages] = useState([])
  const [formValue,setFormValue] = useState('')
  console.log(messages)
  useEffect(()=>{
    const q = query(collection(db,"messages"),orderBy("createdAt","asc"))
    const unsub = onSnapshot( q , (doc) => {
      const mes = doc.docs.map(message=>(Object.assign({},{id:message.id},message.data() ) ) )
      // console.log( "data: ", doc.docs[0].data());
      setMessages(mes)
      console.log("setMessage" , mes)
    });
    return unsub;
  },[])

  const sendMessage = async(e)=>{
    e.preventDefault()
    if(formValue==="")return 
    const {uid,photoURL} = auth.currentUser ; 
    const docRef = await addDoc(collection(db,"messages"),{
      text:formValue , 
      createdAt:serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('')
  }
  return (
    <>
    <main>
    <div>
      { messages && messages.map(msg=><ChatMessage key={msg.id} message={msg} auth={auth} />)}
    </div>
    <div></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e)=>setFormValue(e.target.value )}/>
      <button type="submit">🕊️</button>
    </form>
    </>
  )
}

function SignIn(){
  const signInWithGoogle = () =>{
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth , provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("Token =>", token,"User =>",user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error received => ",error ,"Credential used ", credential)
      // ...
    });
  
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google </button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>auth.signOut()}>Sign Out</button>
  )
}



export default App;
