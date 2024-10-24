export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Asset {
  id: number;
  name: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  downloads: number;
  views: number;
  username: string;
}
