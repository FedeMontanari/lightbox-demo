export type UnsplashResponse = {
  id: string;
  slug: string;
  created_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  alt_description: string;
  urls: {
    full: string; // Max dimensions jpg
    regular: string; // 1080 px wide
    small: string; // 400 px wide
    thumb: string; // 200 px wide
  };
  likes: number;
  user: UnsplashUser;
};

interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string; // 32x32
    medium: string; // 64x64
    large: string; // 128x128
  };
}
