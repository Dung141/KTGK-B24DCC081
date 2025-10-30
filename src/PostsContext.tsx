import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Post } from './types';
import { v4 as uuidv4 } from 'uuid';

type Action =
  | { type: 'CREATE'; payload: Post }
  | { type: 'UPDATE'; payload: Post }
  | { type: 'DELETE'; payload: string };

const initialPosts: Post[] = [
  {
    id: uuidv4(),
    title: 'Giới thiệu về React',
    author: 'Nguyễn Văn A',
    thumbnail: 'https://picsum.photos/600/400?1',
    content: 'React là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng, được Facebook phát triển. Nó giúp tạo các component tái sử dụng được và quản lý state hiệu quả.',
    category: 'Công nghệ',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Hành trình khám phá Đà Nẵng',
    author: 'Trần Thị B',
    thumbnail: 'https://picsum.photos/600/400?2',
    content: 'Đà Nẵng là thành phố xinh đẹp với bãi biển dài, cầu Rồng nổi tiếng và nhiều địa điểm du lịch hấp dẫn. Đây là điểm đến lý tưởng cho du khách yêu biển và thiên nhiên.',
    category: 'Du lịch',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Khám phá ẩm thực Việt Nam',
    author: 'Lê C',
    thumbnail: 'https://picsum.photos/600/400?3',
    content: 'Ẩm thực Việt Nam phong phú với nhiều món ăn đặc trưng từng vùng miền. Từ phở, bún chả Hà Nội, đến hủ tiếu Nam Bộ, mỗi món đều mang hương vị riêng biệt và hấp dẫn.',
    category: 'Ẩm thực',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Lối sống hiện đại',
    author: 'Phạm D',
    thumbnail: 'https://picsum.photos/600/400?4',
    content: 'Cuộc sống hiện đại mang lại nhiều tiện ích nhưng cũng tạo ra áp lực. Việc cân bằng giữa công việc, học tập và cuộc sống cá nhân là yếu tố quan trọng để giữ sức khỏe tinh thần.',
    category: 'Đời sống',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Khám phá thiên nhiên quanh ta',
    author: 'Nguyễn E',
    thumbnail: 'https://picsum.photos/600/400?5',
    content: 'Thiên nhiên xung quanh chúng ta đầy màu sắc và kỳ diệu. Những chuyến đi dã ngoại, leo núi hay cắm trại giúp chúng ta gần gũi hơn với thiên nhiên và giảm căng thẳng.',
    category: 'Khác',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Cách học lập trình hiệu quả',
    author: 'Trần F',
    thumbnail: 'https://picsum.photos/600/400?6',
    content: 'Để học lập trình hiệu quả, bạn cần bắt đầu từ những kiến thức cơ bản, thực hành liên tục và giải quyết các bài tập thực tế. Việc tham khảo tài liệu và học từ dự án mẫu cũng rất hữu ích.',
    category: 'Công nghệ',
    createdAt: new Date().toISOString()
  }
];

const PostsStateContext = createContext<{ posts: Post[] }>({ posts: [] });
const PostsDispatchContext = createContext<React.Dispatch<Action>>(() => {});

function postsReducer(state: Post[], action: Action): Post[] {
  switch (action.type) {
    case 'CREATE':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map(p => (p.id === action.payload.id ? action.payload : p));
    case 'DELETE':
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
}

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);
  return (
    <PostsStateContext.Provider value={{ posts }}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsStateContext.Provider>
  );
};

export function usePostsState() {
  return useContext(PostsStateContext);
}

export function usePostsDispatch() {
  return useContext(PostsDispatchContext);
}
