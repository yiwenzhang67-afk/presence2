export interface GuideStep {
  id: number;
  title: string;
  content: string[];
  instruction?: string;
}

export interface Ingredient {
  name: string;
  enName: string;
}