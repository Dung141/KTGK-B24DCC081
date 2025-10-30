import React from 'react';
import { Post } from './types';
import { useNavigate } from 'react-router-dom';

const PostCard: React.FC<{ post: Post; onDelete: () => void }> = ({ post, onDelete }) => {
  const navigate = useNavigate();
  return (
    <article className="card">
      <img src={post.thumbnail} alt={post.title} className="thumb" />
      <div className="card-body">
        <h3>{post.title}</h3>
        <div className="meta">{post.author} • {new Date(post.createdAt).toLocaleDateString()}</div>
        <p>{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        <div className="actions">
          <button className="btn" onClick={() => navigate(`/posts/${post.id}`)}>Đọc thêm</button>
          <button className="btn btn-danger" onClick={onDelete}>Xóa</button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
