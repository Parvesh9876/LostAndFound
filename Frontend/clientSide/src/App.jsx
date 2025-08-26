import NavBar1 from './components/Navbar.jsx';
import Slider from './components/Slider.jsx';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login.jsx';
import CreatePost from './pages/createpost.jsx';
import Posts from './pages/post.jsx';
import UpdatePosts from './pages/updatepost.jsx';
import DetailPosts from './pages/postdetails.jsx';
import Mylist from './pages/mylist.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/profile.jsx';
import Home from './pages/home.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Chat from './components/chat.jsx';
import ChatRoom from './components/chatbox.jsx';
function App() {
  return (
    <>
      <NavBar1 />
      {/* <Slider />
      <Footer /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/post/:id" element={<DetailPosts/>} />
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/update-post/:id" element={<UpdatePosts/>} />
        <Route path="/mylist" element={<Mylist/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/contact" element={<ContactUs/>} />
         {/* <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:otherUserId" element={<ChatRoom />} /> */}
    {/* <Route path="/chat/:contactId" element={<ChatBox userId={currentUserId} />} /> */}



        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
