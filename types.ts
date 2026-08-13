export interface User {  id: number;  name: string;  email: string;  isActive: boolean;}

export interface Post {  id: number;  title: string;  content: string;  authorId: number;}

export interface Comment {  id: number;  postId: number;  content: string;  authorId: number;}

export type ApiResponse<T> = {  success: boolean;  data?: T;  error?: string;};

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface PaginatedResponse<T> {  items: T[];  totalCount: number;  page: number;  pageSize: number;}