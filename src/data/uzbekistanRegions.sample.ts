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
  0: "karakalpakstan",
  1: "khorezm",
  2: "navoi",
  3: "bukhara",
  4: "samarkand",
  5: "jizzakh",
  6: "sirdarya",
  7: "tashkent",
  8: "tashkent-city",
  9: "fergana",
  10: "namangan",
  11: "andijan",
  12: "kashkadarya",
  13: "surkhandarya",
};

const SAMPLE_AVATAR_URL = "https://www.figma.com/api/mcp/asset/e00bed96-fa72-4ff4-a4d1-a6a176625169";

// Sample data (can be replaced by backend later)
export const UZBEKISTAN_REGIONS_SAMPLE: UzbekistanRegionInfo[] = [
  {
    id: "karakalpakstan",
    name: "Республика Каракалпакстан",
    managerName: "Тлеумуратов Данияр",
    phone: "+99861 223 11 11",
    city: "Нукус",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "khorezm",
    name: "Хорезмская область",
    managerName: "Рахимов Бахтиёр",
    phone: "+99862 226 22 22",
    city: "Ургенч",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "navoi",
    name: "Навоийская область",
    managerName: "Турсунов Шерзод",
    phone: "+99879 228 33 33",
    city: "Навои",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "bukhara",
    name: "Бухарская область",
    managerName: "Махмудов Азиз",
    phone: "+99865 230 44 44",
    city: "Бухара",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "samarkand",
    name: "Самаркандская область",
    managerName: "Юлдашев Акбар",
    phone: "+99866 232 55 55",
    city: "Самарканд",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "jizzakh",
    name: "Джизакская область",
    managerName: "Алимов Камол",
    phone: "+99872 234 66 66",
    city: "Джизак",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "sirdarya",
    name: "Сырдарьинская область",
    managerName: "Абдуллаев Шахзод",
    phone: "+99867 236 77 77",
    city: "Гулистан",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "tashkent",
    name: "Ташкентская область",
    managerName: "Насыров Бобур",
    phone: "+99870 238 88 88",
    city: "Нурафшан",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "tashkent-city",
    name: "г. Ташкент",
    managerName: "Артамонов Александр",
    phone: "+99871 231 09 09",
    city: "Ташкент",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "fergana",
    name: "Ферганская область",
    managerName: "Саидов Ислом",
    phone: "+99873 240 10 10",
    city: "Фергана",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "namangan",
    name: "Наманганская область",
    managerName: "Каримов Дилшод",
    phone: "+99869 242 20 20",
    city: "Наманган",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "andijan",
    name: "Андижанская область",
    managerName: "Рустамов Фарход",
    phone: "+99874 244 30 30",
    city: "Андижан",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "kashkadarya",
    name: "Кашкадарьинская область",
    managerName: "Назаров Элёр",
    phone: "+99875 246 40 40",
    city: "Карши",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
  {
    id: "surkhandarya",
    name: "Сурхандарьинская область",
    managerName: "Олимов Жавлон",
    phone: "+99876 248 50 50",
    city: "Термез",
    avatarUrl: SAMPLE_AVATAR_URL,
  },
];
