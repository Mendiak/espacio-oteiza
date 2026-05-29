export interface Artwork {
  id: string;
  title_es: string;
  title_en: string;
  title_eu: string;
  year: string;
  city_es: string;
  city_en: string;
  city_eu: string;
  country_es: string;
  country_en: string;
  country_eu: string;
  latitude: number;
  longitude: number;
  image: string;
  materials_es: string;
  materials_en: string;
  materials_eu: string;
  material: string[];
  category: 'built' | 'intervention' | 'unbuilt';
  subtype?: string;
  description_es: string;
  description_en: string;
  description_eu: string;
  reference?: string;
}
