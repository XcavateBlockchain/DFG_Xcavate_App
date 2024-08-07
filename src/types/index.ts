export type TabNavItem = {
  title: string;
  href: string;
  icon: string;
};

export interface FetchedProperty {
  realEstateDeveloper: string;
  tokenPrice: string;
  collectedFunds: string;
  assetId: string;
  itemId: string;
  collectionId: string;
  tokenAmount: string;
  remainingTokens: string;
}

export type Property = {
  property_name: string;
  id: string;
  address_street: string;
  address_town_city: string;
  post_code: string;
  description: string;
  area: string;
  quality: string;
  property_type: string;
  no_of_Bedrooms: number;
  outdoor_space: string;
  construction_date: string;
  number_of_bathrooms: number;
  Off_street_parking: string;
  floor_Plan: string;
  sales_agreement: string;
  property_image: string;
  images: string[];
  property_price: number;
  estimated_rental_income: number;
  property_development_Code: string;
  planning_permission_Code: string;
  local_authority: string;
  title_deed_number: string;
  map: string;
};
