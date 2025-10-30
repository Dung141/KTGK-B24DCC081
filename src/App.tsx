import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PostsProvider } from './PostsContext';
import Navbar from './Navbar';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';

const App: React.FC = () => {
  return (
    <PostsProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Redirect từ / sang /posts */}
          <Route path="/" element={<Navigate to="/posts" replace />} />

          {/* Trang danh sách bài viết */}
          <Route path="/posts" element={<PostList />} />

          {/* Tạo bài viết mới */}
          <Route path="/posts/create" element={<PostForm mode="create" />} />

          {/* Chỉnh sửa bài viết */}
          <Route path="/posts/edit/:id" element={<PostForm mode="edit" />} />

          {/* Trang chi tiết bài viết */}
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </PostsProvider>
  );
};

export default App;
