export interface User {
  image: string;
  name: string;
  username: string;
}

export class Feedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: 'suggestion' | 'planned' | 'in-progress' | 'live';
  description?: string;
  comments?: Comment[];

  constructor(id: number) {
    this.id = id;
    this.title = '';
    this.category = '';
    this.upvotes = 0;
    this.status = 'suggestion';
    this.description = '';
    this.comments = [];
  }
}

export class Comment {
  id: number;
  content: string;
  user!: User;
  replies?: Reply[];

  constructor(id: number) {
    this.id = id;
    this.content = '';
  }
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export type SuggestionSortOption =
  | 'most upvotes'
  | 'least upvotes'
  | 'most comments'
  | 'least comments';
