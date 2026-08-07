export type MehdiImageId =
  | "portraitHero"
  | "formalSuitEvent"
  | "suitLuxuryCar"
  | "outdoorNight"
  | "travelLounge"
  | "casualLifestyle";

export type MehdiImageRecord = {
  id: MehdiImageId;
  src: `/images/mehdi/${string}`;
  width: number;
  height: number;
  altKey: MehdiImageId;
};

/** Verified personal photos — paths under /public/images/mehdi/ */
export const mehdiImages: Record<MehdiImageId, MehdiImageRecord> = {
  portraitHero: {
    id: "portraitHero",
    src: "/images/mehdi/mehdi-ceo-portrait-hero.jpg",
    width: 1200,
    height: 1600,
    altKey: "portraitHero",
  },
  formalSuitEvent: {
    id: "formalSuitEvent",
    src: "/images/mehdi/mehdi-ceo-formal-suit-event.jpg",
    width: 1200,
    height: 1600,
    altKey: "formalSuitEvent",
  },
  suitLuxuryCar: {
    id: "suitLuxuryCar",
    src: "/images/mehdi/mehdi-ceo-suit-luxury-car.jpg",
    width: 1200,
    height: 1600,
    altKey: "suitLuxuryCar",
  },
  outdoorNight: {
    id: "outdoorNight",
    src: "/images/mehdi/mehdi-ceo-outdoor-night.jpg",
    width: 1200,
    height: 1600,
    altKey: "outdoorNight",
  },
  travelLounge: {
    id: "travelLounge",
    src: "/images/mehdi/mehdi-ceo-travel-lounge.jpg",
    width: 1200,
    height: 1600,
    altKey: "travelLounge",
  },
  casualLifestyle: {
    id: "casualLifestyle",
    src: "/images/mehdi/mehdi-ceo-casual-lifestyle.jpg",
    width: 1200,
    height: 1600,
    altKey: "casualLifestyle",
  },
};

export function getMehdiImage(id: MehdiImageId): MehdiImageRecord {
  return mehdiImages[id];
}
