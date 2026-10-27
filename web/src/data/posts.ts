// Reviewed seed snapshot for local development only. Production reads Supabase.
import posts from './blog-posts.json';
import type { BlogPost } from '@/lib/types';
export const STATIC_POSTS = posts as BlogPost[];
