import React, { useMemo, useState } from 'react';
import { usePostsState, usePostsDispatch } from './PostsContext';
import { Post } from './types';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
  const { posts } = usePostsState();
  const dispatch = usePostsDispatch();
  const [filter, setFilter] = useState<string>('');

  const filtered = useMemo<Post[]>(() => {
    if (!filter) return posts;
    return posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  }, [posts, filter]);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Danh sách bài viết ({posts.length})</h1>
        <div>
          <Link to="/posts/create" className="btn">Viết bài mới</Link>
        </div>
      </header>

      <div className="filter">
        <input
          placeholder="Tìm theo tiêu đề..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map(p => (
          <PostCard
            key={p.id}
            post={p}
            onDelete={() => {
              if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
                dispatch({ type: 'DELETE', payload: p.id });
              }
            }}
          />
        ))}
        {filtered.length === 0 && <div>Không có bài viết phù hợp.</div>}
      </div>
    </div>
  );
};

export default PostList;
