export type IPet = {
  id: number;
  name: string;
  description: string;
  type?: string;
  shelter_id?: number;
  pet_tag_ids?: number[];
  img_url: string;
};
