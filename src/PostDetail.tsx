import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from './types';
import { usePostsState, usePostsDispatch } from './PostsContext';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = usePostsState();
  const dispatch = usePostsDispatch();
  const navigate = useNavigate();

  if (!id) return <div style={{ padding: 20 }}>Bài viết không tồn tại</div>;

  const post = posts?.find((p: Post) => p.id === id);
  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại</div>;

  const { title, author, createdAt, category, thumbnail, content, id: postId } = post;

  return (
    <div className="detail-page">
      <h1>{title}</h1>
      <div className="meta">{author} • {new Date(createdAt).toLocaleDateString()} • {category}</div>
      <img src={thumbnail ?? ''} alt={title} className="detail-thumb" />
      <div className="content">{content}</div>
      <div className="detail-actions">
        <button className="btn" onClick={() => navigate('/posts')}>Quay lại</button>
        <button className="btn" onClick={() => navigate(`/posts/edit/${postId}`)}>Chỉnh sửa</button>
        <button className="btn btn-danger" onClick={() => {
          if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            dispatch({ type: 'DELETE', payload: postId });
            navigate('/posts');
          }
        }}>Xóa</button>
      </div>
    </div>
  );
};

export default PostDetail;
