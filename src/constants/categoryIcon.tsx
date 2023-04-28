import React from "react"
import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import BoardGameIcon from "@components/icons/BoardGameIcon"
import CardGameIcon from "@components/icons/CardGameIcon"
import CasinoGameIcon from "@components/icons/CasinoGameIcon"
import DiceIcon from "@components/icons/DiceIcon"
import EducationalGameIcon from "@components/icons/EducationalGameIcon"
import FamilyGameIcon from "@components/icons/FamilyGameIcon"
import MusicGameIcon from "@components/icons/MusicGameIcon"
import RacingGameIcon from "@components/icons/RacingGameIcon"
import RolePlayingIcon from "@components/icons/RolePlayingIcon"
import SimulativeGameIcon from "@components/icons/SimulativeGameIcon"
import StrategyGameIcon from "@components/icons/StrategyGameIcon"
import WordGameIcon from "@components/icons/WordGameIcon"
import TraviaGameIcon from "@components/icons/TraviaGameIcon"
import PuzzleGameIcon from "@components/icons/PuzzleGameIcon"
import CasualGameIcon from "@components/icons/CasualGameIcon"
import FightingGameIcon from "@components/icons/FightingGameIcon"
import JoinStickIcon from "@components/icons/JoinStickIcon"
import ShootingGameIcon from "@components/icons/ShootingGameIcon"
import SportGameIcon from "@components/icons/SportGameIcon"
import Diamond from "@components/icons/Diamond"

export interface ICategoryIcon {
  id: string
  icon: string | React.ReactElement
}

/**
 * "id" must be the same as the "slug" in database
 */
export const CATEGORY_ICON: ICategoryIcon[] = [
  {
    id: "adventure",
    icon: <YourMissionIcon />
  },
  {
    id: "action",
    icon: <YourMissionIcon />
  },
  {
    id: "boardgames",
    icon: <BoardGameIcon />
  },
  {
    id: "card",
    icon: <CardGameIcon />
  },
  {
    id: "casino",
    icon: <CasinoGameIcon />
  },
  {
    id: "dice",
    icon: <DiceIcon />
  },
  {
    id: "educational",
    icon: <EducationalGameIcon />
  },
  {
    id: "family",
    icon: <FamilyGameIcon />
  },
  {
    id: "music",
    icon: <MusicGameIcon />
  },
  {
    id: "racing",
    icon: <RacingGameIcon />
  },
  {
    id: "role-playing",
    icon: <RolePlayingIcon />
  },
  {
    id: "simulation",
    icon: <SimulativeGameIcon />
  },
  {
    id: "strategy",
    icon: <StrategyGameIcon />
  },
  {
    id: "strategy",
    icon: <StrategyGameIcon />
  },
  {
    id: "word",
    icon: <WordGameIcon />
  },
  {
    id: "trivia",
    icon: <TraviaGameIcon />
  },
  {
    id: "puzzle",
    icon: <PuzzleGameIcon />
  },
  {
    id: "casual",
    icon: <CasualGameIcon />
  },
  {
    id: "fighting",
    icon: <FightingGameIcon />
  },
  {
    id: "others",
    icon: <JoinStickIcon stroke="#E1E2E2" />
  },
  {
    id: "shooting",
    icon: <ShootingGameIcon />
  },
  {
    id: "sport",
    icon: <SportGameIcon />
  },
  {
    id: "nft",
    icon: <Diamond stroke="#E1E2E2" />
  }
]
