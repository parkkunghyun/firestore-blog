import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import Navbar from './components/Navbar';
import AddPostPage from './pages/AddPostPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='min-h-screen bg-[#FFFAFA]'>
      <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/add-post' element={<AddPostPage/>} />
            <Route path='/posts' element={<PostListPage />} />
            <Route path='/posts/:id' element={<PostDetailPage/>} />
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </div>
  );
}

export default App;
