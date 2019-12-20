export interface User {
  fname: string;
  lname: string;
  age: string;
  realm?: string;
  username?: string;
  email: string;
  emailVerified?: boolean;
  password: string;
  id?: string;
  role?: string;
  mBusinessId?: string;
  profile_pic?: string;
  nb_reviews?: number;
}
