import { ProductCategories } from "../../../utils/productCategories";

export interface NavLinkData {
  label: string;
  to: string;
  withArrow?: boolean;
  analyticsKey: string;
  dataCy?: string;
}

export interface ExternalNavLinkData {
  label: string;
  href: string;
  withArrow?: boolean;
  analyticsKey: string;
  dataCy?: string;
}

export const PRODUCT_CATEGORIES: NavLinkData[] = [
  {
    label: ProductCategories.LivingRoom,
    to: "/products/living-room",
    analyticsKey: "living room dropdown",
  },
  {
    label: ProductCategories.Bedroom,
    to: "/products/bedroom",
    analyticsKey: "bedroom dropdown",
  },
  {
    label: ProductCategories.Dining,
    to: "/products/dining-room",
    analyticsKey: "dining room dropdown",
  },
  {
    label: ProductCategories.HomeOffice,
    to: "/products/home-office",
    analyticsKey: "home office dropdown",
  },
  {
    label: ProductCategories.Decor,
    to: "/products/decor",
    analyticsKey: "decor dropdown",
  },
  {
    label: ProductCategories.Lighting,
    to: "/products/lighting",
    analyticsKey: "lighting dropdown",
  },
  {
    label: ProductCategories.Outdoor,
    to: "/products/outdoor",
    analyticsKey: "outdoor dropdown",
  },
];

export const ITEM_TYPE: NavLinkData[] = [
  {
    to: "/products/sofas",
    label: "Sofas, Sectionals, & Sleepers",
    analyticsKey: "sofas sectionals sleepers dropdown",
  },
  { to: "/products/chairs", label: "Chairs", analyticsKey: "chairs dropdown" },
  {
    to: "/products/coffee-tables",
    label: "Coffee Tables",
    analyticsKey: "coffee tables dropdown",
  },
  {
    to: "/products/side-tables",
    label: "Side Tables",
    analyticsKey: "side tables dropdown",
  },
  {
    to: "/products/ottomans-stools-benches",
    label: "Ottomans, Stools, & Benches",
    analyticsKey: "ottomans stools benches dropdown",
  },
  {
    to: "/products/beds-mattresses",
    label: "Beds & Mattresses",
    analyticsKey: "beds mattresses dropdown",
  },
  {
    to: "/products/dressers",
    label: "Nightstands & Dressers",
    analyticsKey: "nightstands dressers dropdown",
  },
  {
    to: "/products/dining-tables",
    label: "Dining Tables",
    analyticsKey: "dining tables dropdown",
  },
  {
    to: "/products/dining-chairs-stools",
    label: "Dining Chairs & Counter Stools",
    analyticsKey: "dining chairs counter stools dropdown",
  },
  {
    to: "/products/storage",
    label: "Cabinets & Consoles",
    analyticsKey: "cabinets consoles dropdown",
  },
  {
    to: "/products/desks-chairs-shelves",
    label: "Desks, Desk Chairs, & Bookshelves",
    analyticsKey: "desks desk chairs bookshelves dropdown",
  },
  {
    to: "/products/rugs-artwork",
    label: "Rugs & Artwork",
    analyticsKey: "rugs artwork dropdown",
  },
  {
    label: "All Furniture",
    to: "/products",
    analyticsKey: "all furniture dropdown",
    withArrow: true,
  },
];

export const PACKAGES: NavLinkData[] = [
  {
    label: "Living Room Packages",
    to: "/packages#LivingRoom",
    analyticsKey: "living room packages dropdown",
  },
  {
    label: "Bedroom Packages",
    to: "/packages#Bedroom",
    analyticsKey: "bedroom packages dropdown",
  },
  {
    label: "Dining Room Packages",
    to: "/packages#DiningRoom",
    analyticsKey: "dining room packages dropdown",
  },
  {
    label: "Home Office Packages",
    to: "/packages#HomeOffice",
    analyticsKey: "home office packages dropdown",
  },
  {
    label: "Studio Apartment Packages",
    to: "/packages#StudioApartment",
    analyticsKey: "studio apartment packages dropdown",
  },
  {
    label: "One-Bedroom Apartment Packages",
    to: "/packages#One-BedroomApartment",
    analyticsKey: "one bedroom apartment packages dropdown",
  },
  {
    label: "All Packages",
    to: "/packages",
    analyticsKey: "see all packages text link dropdown",
    withArrow: true,
  },
];

export const UPCOMING_DELIVERY: NavLinkData = {
  label: "Your Upcoming Delivery",
  to: "/account/delivery",
  analyticsKey: "account delivery details",
};

export const ACCOUNT: NavLinkData[] = [
  {
    label: "Current Furniture",
    to: "/account/furniture",
    analyticsKey: "account current furniture",
  },
  {
    label: "Plan and Billing",
    to: "/account/billing",
    analyticsKey: "account plan billing",
  },
  {
    label: "Customer FAQ",
    to: "/account/membership",
    analyticsKey: "account customer faq",
  },
  {
    label: "Change Password",
    to: "/account/change-password",
    analyticsKey: "account change password",
  },
];

type TypeformLinks = "shareFeedback" | "contactUs" | "buildingQuestionnaire";

export const constructTypeformLinkData = ({
  email,
  orderNumber,
}: {
  email: string;
  orderNumber: number;
}): Record<TypeformLinks, ExternalNavLinkData> => ({
  shareFeedback: {
    label: "Share Feedback",
    href: `https://livefeather.typeform.com/to/B8elUz#email=${email}&subscription_id=${orderNumber}`,
    analyticsKey: "account share feedback",
  },
  contactUs: {
    label: "Contact Your Account Manager",
    href: `https://livefeather.typeform.com/to/v4Wsz6wT#email=${email}&subscription_id=${orderNumber}`,
    analyticsKey: "account contact us",
  },
  buildingQuestionnaire: {
    label: "questions about your building",
    href: `https://livefeather.typeform.com/to/MFV7Jj#email=${email}&subscription_id=${orderNumber}`,
    analyticsKey: "account building questionnaire",
  },
});
