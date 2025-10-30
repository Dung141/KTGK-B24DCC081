import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostsState, usePostsDispatch } from './PostsContext';
import { Post, Category } from './types';
import { v4 as uuidv4 } from 'uuid';

const categories: Category[] = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

const PostForm: React.FC<{ mode?: 'create' | 'edit' }> = ({ mode = 'create' }) => {
  const { id } = useParams<{ id: string }>();
  const { posts } = usePostsState();
  const dispatch = usePostsDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    title: string;
    author: string;
    thumbnail: string;
    content: string;
    category: Category;
  }>({
    title: '',
    author: '',
    thumbnail: '',
    content: '',
    category: 'Công nghệ'
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const found = posts.find((p: Post) => p.id === id);
      if (found) setForm({ title: found.title, author: found.author, thumbnail: found.thumbnail, content: found.content, category: found.category });
    }
  }, [mode, id, posts]);

  function validate() {
    if (!form.title || form.title.trim().length < 10) { alert('Tiêu đề ít nhất 10 ký tự'); return false; }
    if (!form.author || form.author.trim().length < 3) { alert('Tác giả ít nhất 3 ký tự'); return false; }
    if (!form.content || form.content.trim().length < 50) { alert('Nội dung ít nhất 50 ký tự'); return false; }
    return true;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'create') {
      const newPost: Post = {
        id: uuidv4(),
        title: form.title.trim(),
        author: form.author.trim(),
        thumbnail: form.thumbnail.trim() || 'https://picsum.photos/600/400',
        content: form.content.trim(),
        category: form.category,
        createdAt: new Date().toISOString()
      };
    dispatch({ type: 'CREATE', payload: newPost });
      alert('Đăng bài thành công!');
      navigate('/posts');
    } else if (id) {
      const oldPost = posts.find((p: Post) => p.id === id);
      const updated: Post = {
        id,
        title: form.title.trim(),
        author: form.author.trim(),
        thumbnail: form.thumbnail.trim() || 'https://picsum.photos/600/400',
        content: form.content.trim(),
        category: form.category,
        createdAt: oldPost ? oldPost.createdAt : new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE', payload: updated });
      alert('Cập nhật thành công!');
      navigate(`/posts/${id}`);
    }
  };

  return (
    <div className="form-page">
      <h2>{mode === 'create' ? 'Tạo bài viết mới' : 'Chỉnh sửa bài viết'}</h2>
      <form onSubmit={onSubmit} className="post-form">
        <label>Tiêu đề
          <input value={form.title} onChange={e => setForm(s => ({ ...s, title: e.target.value }))} />
        </label>
        <label>Tác giả
          <input value={form.author} onChange={e => setForm(s => ({ ...s, author: e.target.value }))} />
        </label>
        <label>URL ảnh thumbnail
          <input value={form.thumbnail} onChange={e => setForm(s => ({ ...s, thumbnail: e.target.value }))} />
        </label>
        <label>Thể loại
          <select
            value={form.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(s => ({ ...s, category: e.target.value as Category }))}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>Nội dung
          <textarea rows={12} value={form.content} onChange={e => setForm(s => ({ ...s, content: e.target.value }))} />
        </label>
        <div className="form-actions">
          <button className="btn" type="submit">{mode === 'create' ? 'Đăng bài' : 'Cập nhật'}</button>
          <button type="button" className="btn btn-ghost" onClick={() => { if (mode === 'create') navigate('/posts'); else navigate(`/posts/${id}`) }}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
