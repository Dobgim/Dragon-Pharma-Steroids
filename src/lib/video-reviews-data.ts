import { supabase } from './supabase-client';

export interface VideoReview {
  id: string;
  title: string;
  author: string;
  rating: number;
  date: string;
  description: string;
  videoType: 'file' | 'url';
  videoUrl?: string;
  fileId?: string;
}

export const initialVideoReviews: VideoReview[] = [
  {
    id: 'vid-mock-1',
    title: '3-Month Cypionat 250 Transformation & Bloodwork Review',
    author: 'Marcus K.',
    rating: 5,
    date: 'June 12, 2026',
    description: 'Phenomenal gains in lean mass and strength. Blood panels came back clean. Highly recommend the US domestic warehouse.',
    videoType: 'url',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gym-member-holding-a-heavy-dumbbell-40544-large.mp4',
  },
  {
    id: 'vid-mock-2',
    title: 'Anavar 10 Cutting Cycle & Lab Test Authenticity Report',
    author: 'Derek S.',
    rating: 5,
    date: 'June 05, 2026',
    description: 'Verified purity levels. Vascularity and core hardness increased noticeably within two weeks. Zero side effects experienced.',
    videoType: 'url',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-his-biceps-with-dumbbells-41618-large.mp4',
  },
  {
    id: 'vid-mock-3',
    title: 'BPC 157 & TB 500 Shoulder Injury Recovery Process',
    author: 'Sarah M.',
    rating: 5,
    date: 'May 24, 2026',
    description: 'After a severe rotator cuff tear, BPC 157 has accelerated my healing. Back to benching 85% of my max in only 6 weeks.',
    videoType: 'url',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bodybuilder-training-in-the-gym-41615-large.mp4',
  }
];

// ─── Column Mapping Helpers ──────────────────────────────────────────────────
// PostgreSQL lowercases all unquoted column names. Our DB columns are:
//   videotype, videourl, fileid  (all lowercase)
// But our TypeScript interface uses camelCase: videoType, videoUrl, fileId
// These helpers convert between the two.

function dbRowToReview(row: Record<string, unknown>): VideoReview {
  return {
    id: row.id as string,
    title: row.title as string,
    author: row.author as string,
    rating: row.rating as number,
    date: row.date as string,
    description: row.description as string,
    videoType: (row.videotype as string) as 'file' | 'url',
    videoUrl: row.videourl as string | undefined,
    fileId: row.fileid as string | undefined,
  };
}

function reviewToDbRow(review: VideoReview): Record<string, unknown> {
  const row: Record<string, unknown> = {
    id: review.id,
    title: review.title,
    author: review.author,
    rating: review.rating,
    date: review.date,
    description: review.description,
    videotype: review.videoType,
  };
  if (review.videoUrl !== undefined) row.videourl = review.videoUrl;
  if (review.fileId !== undefined) row.fileid = review.fileId;
  return row;
}

// ─── Supabase Sync ───────────────────────────────────────────────────────────

let lastFetchTime = 0;
const FETCH_COOLDOWN = 10000;

export function fetchVideoReviewsFromSupabase() {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  if (now - lastFetchTime < FETCH_COOLDOWN) return;
  lastFetchTime = now;

  supabase
    .from('video_reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.error('Failed to sync video reviews from Supabase:', error.message);
        return;
      }
      if (data) {
        // Map DB lowercase columns to camelCase interface
        const mapped = data.map(dbRowToReview);
        localStorage.setItem('dp_video_reviews', JSON.stringify(mapped));
        window.dispatchEvent(new Event('dp_video_reviews_updated'));
      }
    });
}

export function getVideoReviews(): VideoReview[] {
  if (typeof window === 'undefined') return initialVideoReviews;
  const stored = localStorage.getItem('dp_video_reviews');
  
  // Trigger background fetch
  fetchVideoReviewsFromSupabase();

  if (!stored) {
    localStorage.setItem('dp_video_reviews', JSON.stringify(initialVideoReviews));
    return initialVideoReviews;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse video reviews', e);
    return initialVideoReviews;
  }
}

export function saveVideoReviews(list: VideoReview[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dp_video_reviews', JSON.stringify(list));
    window.dispatchEvent(new Event('dp_video_reviews_updated'));
  }
}

// Upload file to Supabase Storage and returns the public url
export async function uploadReviewVideo(fileId: string, file: File | Blob): Promise<string> {
  const fileExt = (file instanceof File ? file.name.split('.').pop() : null) || 'mp4';
  const filePath = `${fileId}.${fileExt}`;

  const { error } = await supabase.storage
    .from('video-reviews')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Supabase video upload error:', error.message);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('video-reviews')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete file from Supabase Storage
export async function deleteReviewVideo(fileId: string) {
  const extensions = ['mp4', 'webm', 'mov', 'avi'];
  const paths = extensions.map(ext => `${fileId}.${ext}`);
  
  const { error } = await supabase.storage
    .from('video-reviews')
    .remove(paths);

  if (error) {
    console.error('Supabase video delete error:', error.message);
  }
}

export async function addVideoReview(review: VideoReview): Promise<void> {
  // Convert camelCase interface to lowercase DB columns
  const row = reviewToDbRow(review);

  const { error } = await supabase
    .from('video_reviews')
    .insert([row]);

  if (error) {
    console.error('Supabase add video review error:', error.message, error.details, error.hint);
    throw error;
  }

  const list = getVideoReviews();
  saveVideoReviews([review, ...list]);
  // Reset fetch cooldown so the next getVideoReviews call re-fetches fresh data
  lastFetchTime = 0;
}

export async function deleteVideoReview(id: string): Promise<void> {
  const review = getVideoReviews().find(r => r.id === id);
  if (review && review.videoType === 'file' && review.fileId) {
    await deleteReviewVideo(review.fileId);
  }

  const { error } = await supabase
    .from('video_reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase delete video review error:', error.message);
    throw error;
  }

  const list = getVideoReviews().filter(r => r.id !== id);
  saveVideoReviews(list);
}
