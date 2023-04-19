import { useRouter } from "next/router"
import CONFIGS from "@configs/index"

interface PageMeta {
  title: string
  description: string
  image: string
}

export const metaData = {
  meta_description:
    "Get started in minutes with our free-to-play games. The best collection of play-to-earn crypto games featuring action, arcade, and more. Powered by $NAKA.",
  meta_keyword:
    "nakamoto games, play2earn, game crypto platform, Blockchain games, Free to play, NFT game, Crypto games, P2E, Gamefi, Browser Games, Cryptocurrency, Play to Earn, Blockchain Games, Gamefi,  Web3 games, Digital platform, 3D games, Polygon, Games platform, Free nft games, Top NFT Games, best NFT games, top cryoto game, top tier games 2022, the best 2022 games, y8, Free online games, unity, unreal engine, games coin crypto, where to play crypto games, play to earn games crypto, play to earn games crypto list,make money,free time,passive income,bullish project, bullish",
  meta_title:
    "Nakamoto Games - Get Started with the Best Play and Earn Crypto Platform",
  image: "https://files.naka.im/seo/homepage.png",
  url: CONFIGS.BASE_URL.FRONTEND
}

export const DEFAULT_META: PageMeta = {
  title:
    "Nakamoto Games | Experience the biggest play-to-earn crypto gaming selection.",
  description:
    "Nakamoto Games offers gamers worldwide the opportunity to participate in countless blockchain-based games and generate a sustainable and sizable income",
  image: "/ng.png"
}

export const GetCustomMeta = (): PageMeta => {
  const router = useRouter()
  const pathname = router.pathname.split("/")[1]
  switch (pathname) {
    case "/":
      return {
        title: "Get Started with the Best Play and Earn Crypto Platform",
        description:
          "Get started in minutes with our free-to-play games. The best collection of play-to-earn crypto games featuring action, arcade, and more. Powered by $NAKA.",
        image: "/ng.png"
      }

    case "/login":
      return {
        title: "Get Started with the Best Play and Earn Crypto Platform",
        description:
          "Unlock access to our awesome collection of blockchain games. Your journey to profitable P2E gaming begins here. Get started on Nakamoto Games.",
        image: "/ng.png"
      }

    case "/register":
      return {
        title: "Register to Access The Best Play to Earn Games",
        description:
          "Register on Nakamoto Games to get started. We offer an exciting list of P2E games for everyone.",
        image: "/ng.png"
      }

    case "tournament":
      return {
        title: "Tournaments - Play to Earn Crypto Games Contests.",
        description:
          "Get lucrative rewards for taking part in play-to-earn crypto tournaments. Nakamoto Games hosts exciting events with $NAKA and NFT rewards. Get in!",
        image: "/ng.png"
      }

    case "play-to-earn-games":
      return {
        title: "Nakamoto Games - Full List of Play to Earn Games",
        description:
          "Find free-to-play and play-to-earn games with massive rewards! Browse the full collection of blockchain games on our platform.",
        image: ""
      }

    case "staking":
      return {
        title: "NAKA Staking Portal - Nakamoto Games",
        description:
          "Stake $NAKA tokens to earn rewards. NAKA coin is one of the top-rated crypto games coins. Available to stake on our official portal.",
        image: ""
      }

    case "referrals":
      return {
        title: "P2E Game Referral Program - Nakamoto Games",
        description:
          "Earn 3% on every game your friends play. Enjoy lifetime passive income. The biggest referral campaign for play-to-earn crypto games. Start earning!",
        image: ""
      }

    case "duckhunter":
      return {
        title: "Duck Hunter P2E Game - Nakamoto Games",
        description:
          "Shoot and hunt for ducks to earn crypto tokens in Duck hunter - a twist on a favorite retro game. Only on Nakamoto Games.",
        image: ""
      }

    case "nakarunner":
      return {
        title: "NAKA Runner Play and Earn - Nakamoto Games",
        description:
          "Compete in P2E game rooms, collect gems, and win fantastic rewards. One of the most exciting multiplayer play-to-earn games on Nakamoto Games.",
        image: ""
      }

    case "nakadui":
      return {
        title: "NAKA DUI P2E Game - Nakamoto Games",
        description:
          "Collect $NAKA coins while flexing your swerving skills in NAKA DUI. Play now. A fun-filled 3D arcade play-to-earn driving game on Nakamoto Games. ",
        image: ""
      }

    case "alien":
      return {
        title: "Alien Apocalypse - Nakamoto Games",
        description:
          "Destroy aliens to earn crypto game tokens in Alien Apocalypse - a first-person shooter game. Get started and earn rewards now.",
        image: ""
      }

    case "cat-planet":
      return {
        title: "Cat Planet Blockchain Game - Nakamoto Games",
        description:
          "Ready to enter the Cat Planet? Cat planet is a play and earn game where players overcome obstacles to take their cat to space. Simple and fun.",
        image: ""
      }

    case "popcorn-popper":
      return {
        title: "Popcorn Popper NFT Game - Nakamoto Games",
        description:
          "Popcorn Popper is a classic puzzle P2E game suitable for players of all ages. Try it today.",
        image: ""
      }

    case "naka-heist":
      return {
        title: "NAKA Heist Play and Earn Game - Nakamoto Games",
        description:
          "Catch me if you can! Enjoy this thrilling action game with play to earn incentives on Nakamoto Games. Get ready for a rough ride!",
        image: ""
      }

    case "naka-galactic":
      return {
        title: "NAKA Galactic NFT Game - Nakamoto Games",
        description:
          "Embark on a thrilling fighting journey to conquer enemies and collect powerups. Play and earn $NAKA and other rewards on Nakamoto Games.",
        image: ""
      }

    case "naka-blaster":
      return {
        title: "NAKA Blaster Play and Earn - Nakamoto Games",
        description:
          "Blast enemies with missiles to collect huge NFT game rewards. The first Nakamoto Games multiplayer play- to-earn crypto game.",
        image: ""
      }

    case "naka-strike":
      return {
        title: "NAKA Strike Multi Player P2E Game - Nakamoto Games",
        description:
          "Shoot your way through NAKA Strike - the first FPS blockchain game. Enjoy the action and amass play to earn crypto rewards. Get started now!",
        image: "https://files.naka.im/images/metaImages/3.png"
      }

    case "naka-racing":
      return {
        title: "NAKA Racing - Nakamoto Games",
        description:
          "Enjoy this thrilling racing adventure set in an explosive environment. Win $NAKA and NFT rewards in this play-to-earn racing game.",
        image: ""
      }

    case "candy":
      return {
        title: "Play Candy Shop P2E Game - Nakamoto Games",
        description:
          "Combine the same color candies to WIN in this Match 3 NFT game. Play Candy Shop and other best NFT games on Nakamoto Games.",
        image: ""
      }

    case "naka-strike-single":
      return {
        title: "NAKA Strike Single Player - Nakamoto Games",
        description:
          "Conquer the enemy and dominate your territory in Naka Strike, a team-based first-person shooter game with play to earn rewards. Try it on Nakamoto Games.",
        image: ""
      }

    case "zaka":
      return {
        title: "ZAKA - P2E Game on Nakamoto Games",
        description:
          "Control the dragon and shoot eggs with accuracy to earn crypto games coins. Play ZAKA now!",
        image: ""
      }

    case "spooky":
      return {
        title: "Spooky Run - Nakamoto Games",
        description:
          "An endless action game where the character races to escape a city plunged into eternal darkness. Play Spooky Run and earn $NAKA rewards now!",
        image: ""
      }

    case "8ballpool":
      return {
        title: "8 Ball Pool - Nakamoto Games",
        description:
          "A fun 2D billiards game with play to earn crypto rewards. Start playing 8 Ball Pool on Nakamoto Games now!",
        image: ""
      }

    case "tank-battle":
      return {
        title: "Tank Battle - Nakamoto Games",
        description:
          "Combat the enemy armies with explosive weapons in Tank Battle. Play and earn $NAKA and other NFT rewards now!",
        image: ""
      }

    case "night-warrior":
      return {
        title: "Night Warrior Action Play and Earn Game - Nakamoto Games",
        description:
          "Defeat monsters to collect NFT rewards in Night Warrior - the newest action and strategy play to earn crypto game. Try it today on Nakamoto Games.",
        image: ""
      }

    default:
      return {
        title: "Get Started with the Best Play and Earn Crypto Platform",
        description:
          "Get started in minutes with our free-to-play games. The best collection of play-to-earn crypto games featuring action, arcade, and more. Powered by $NAKA.",
        image: "/ng.png"
      }
  }
}
