
export type Category = 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';

export interface Post {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  content: string;
  category: Category;
  createdAt: string;
}
