Place exported SVG here as: public/images/uzbekistan-map.svg

IMPORTANT:
- The current implementation supports your exported Figma SVG as-is by treating each `path[stroke]`
	as a clickable region.
- To show correct region/manager info, map the clicked `regionIndex` to a region id in:
	src/data/uzbekistanRegions.sample.ts (UZBEKISTAN_MAP_PATH_INDEX_TO_REGION_ID)
- You can get the regionIndex by clicking a region and checking the browser dev console:
	[UzbekistanMap] clicked regionIndex: X

Alternative (recommended long-term):
- Add `data-region="tashkent-city"` (etc.) directly to each region path/group in the SVG.
	Then we can remove the fragile index mapping.
 Region ids:
karakalpakstan, khorezm, navoi, bukhara, samarkand, jizzakh, sirdarya, tashkent, tashkent-city, fergana, namangan, andijan, kashkadarya, surkhandarya
