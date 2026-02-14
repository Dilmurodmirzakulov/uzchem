export type UzbekistanRegionId =
  | "karakalpakstan"
  | "khorezm"
  | "navoi"
  | "bukhara"
  | "samarkand"
  | "jizzakh"
  | "sirdarya"
  | "tashkent"
  | "tashkent-city"
  | "fergana"
  | "namangan"
  | "andijan"
  | "kashkadarya"
  | "surkhandarya";

export type UzbekistanRegionInfo = {
  id: UzbekistanRegionId;
  name: string;
  managerName: string;
  phone: string;
  city: string;
  avatarUrl?: string;
};

// Your exported Figma SVG doesn't include per-region ids. We therefore assign
// clickability by `path[stroke]` order (0..N) at runtime and map those indices
// to region ids here.
//
// To configure: click a region in the browser and look for
// `[UzbekistanMap] clicked regionIndex: X` in the dev console, then map X.
export const UZBEKISTAN_MAP_PATH_INDEX_TO_REGION_ID: Partial<
  Record<number, UzbekistanRegionId>
> = {
  // Example (replace with real indices from your SVG):
  // 12: "tashkent-city",
};

// Sample data (can be replaced by backend later)
export const UZBEKISTAN_REGIONS_SAMPLE: UzbekistanRegionInfo[] = [
  {
    id: "tashkent-city",
    name: "Ташкент",
    managerName: "Артамонов Александр",
    phone: "+99871 231 09 09",
    city: "Ташкент",
    avatarUrl: "/images/manager-sample.png",
  },
  {
    id: "tashkent",
    name: "Ташкентская область",
    managerName: "—",
    phone: "—",
    city: "—",
  },
  { id: "sirdarya", name: "Сырдарьинская область", managerName: "—", phone: "—", city: "—" },
  { id: "jizzakh", name: "Джизакская область", managerName: "—", phone: "—", city: "—" },
  { id: "samarkand", name: "Самаркандская область", managerName: "—", phone: "—", city: "—" },
  { id: "bukhara", name: "Бухарская область", managerName: "—", phone: "—", city: "—" },
  { id: "navoi", name: "Навоийская область", managerName: "—", phone: "—", city: "—" },
  { id: "khorezm", name: "Хорезмская область", managerName: "—", phone: "—", city: "—" },
  { id: "karakalpakstan", name: "Республика Каракалпакстан", managerName: "—", phone: "—", city: "—" },
  { id: "fergana", name: "Ферганская область", managerName: "—", phone: "—", city: "—" },
  { id: "namangan", name: "Наманганская область", managerName: "—", phone: "—", city: "—" },
  { id: "andijan", name: "Андижанская область", managerName: "—", phone: "—", city: "—" },
  { id: "kashkadarya", name: "Кашкадарьинская область", managerName: "—", phone: "—", city: "—" },
  { id: "surkhandarya", name: "Сурхандарьинская область", managerName: "—", phone: "—", city: "—" },
];
