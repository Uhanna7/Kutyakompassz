export interface Post {
    id?: string;
    title: string;
    date?: string;
    description: string;
    location: string;
    images: string[];
    type: string;
    userId?: string;
}