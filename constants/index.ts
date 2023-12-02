import { IconType } from "react-icons";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { PiPark } from "react-icons/pi";
import { IoKeySharp } from "react-icons/io5";
import { LuSofa } from "react-icons/lu";
import { IoSparklesSharp } from "react-icons/io5";
import { GiFarmTractor } from "react-icons/gi";

interface Category {
  label: string;
  icon: IconType;
  description: string;
}

export const categories: Category[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Parks",
    icon: PiPark,
    description: "This property is close to a park!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Farm",
    icon: GiFarmTractor,
    description: "This property is on a farm!",
  },
  {
    label: "Amazing Views",
    icon: IoSparklesSharp,
    description: "This property has amazing views!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "New",
    icon: IoKeySharp,
    description: "This property is brand new!",
  },
  {
    label: "Cozy",
    icon: LuSofa,
    description: "This property is cozy and warm!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];
