// Updated types.ts
export interface Restaurant {
  name: string;
  location: string;
  open_time: string;
  close_time: string;
  min_price: number;
  delivery_fee: string;
  image_url: string;
  categories: MenuSectionCategory[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  popular?: boolean;
  deal?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurant: Restaurant;
  categories: MenuCategory[];
}

// For CategoryNav component
export interface CategoryNavItem {
  id: string;
  name: string;
}

// For MenuSection component
export interface MenuSectionCategory {
  id: string;
  name: string;
  description?: string;
  popular?: boolean;
  items?: MenuItem[];
}
