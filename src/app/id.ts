export interface Id {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  screenshots: [
    {
      id: number;
      image: string;
    },
    {
      id: number;
      image: string;
    },
    {
      id: number;
      image: string;
    }
  ];
}
