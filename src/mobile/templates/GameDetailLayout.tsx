import React from "react"
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import SearchIcon from "@components/icons/SearchIcon"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"
import { useRouter } from "next/router"
import ShareToEarn from "@components/atoms/ShareToEarn"
import HowToPlayMobile from "@components/atoms/HowToPlayMobile"
import StatisticGameDetailCopy from "@components/molecules/statistic/StatisticGameDetailCopy"
import CardBuyItemCopy from "@feature/gameItem/components/molecules/CardBuyItemCopy"
import StatEstimatedProfit from "@components/molecules/statistic/StatEstimatedProfit"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"

// FIXME Boy: เดี๋ยวกลับมาทำ ขอเอาขึ้นก่อน

const GameDetailLayout = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const gameData: any = {
    "_id": "6411900036d638fbfa63f501",
    "howto": {
      "title": "How to play Goal Rush",
      "details":
        "<p>Get ready to experience the ultimate rush of soccer action! With this thrilling game, you'll be transported to the heart of the action, where every goal counts and every shot could mean the difference between victory and defeat.</p><p><br></p><p>Featuring an exciting soccer table that puts your aim and skill to the test, this game is the perfect challenge for fans of the beautiful game. With intuitive controls and stunning graphics, you'll feel like you're right there on the pitch, scoring goals and making epic saves.</p><p><br></p><p>But that's not all - as you progress through the story mode, you'll unlock your favorite teams and players, each with their own unique strengths and abilities. From Argentina to France, you'll travel the world and take on the toughest competition in soccer history.</p><p><br></p><p>So what are you waiting for? Strap on your boots and get ready to score some goals! With this amazing soccer table game, the only limit is your own skill and determination. So lace up your cleats, grab your ball, and get ready to take on the world like never before!</p>"
    },
    "game_free_status": false,
    "hot_game_status": false,
    "hot_game_no": 0,
    "banner_status": true,
    "banner_no": 0,
    "banner_description":
      "<p>Playing football with your fingers has never been this fun!</p>",
    "tournament": false,
    "browser_support": [
      {
        "key": "safari",
        "name": "Safari",
        "supported": true
      },
      {
        "key": "chrome",
        "name": "Chrome",
        "supported": true
      },
      {
        "key": "edge",
        "name": "Edge",
        "supported": true
      },
      {
        "key": "firefox",
        "name": "Firefox",
        "supported": true
      },
      {
        "key": "opera",
        "name": "Opera",
        "supported": true
      }
    ],
    "device_support": [
      {
        "key": "mobile",
        "name": "Mobile and Tablet",
        "supported": true
      },
      {
        "key": "desktop",
        "name": "Desktop",
        "supported": true
      }
    ],
    "item": [
      {
        "_id": "6308a5b75a9c201724f4e7cc",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 0.05,
        "min_item": 1,
        "item_id_smartcontract": 14,
        "item_size": "0.05$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "id": "6308a5b75a9c201724f4e7cc"
      },
      {
        "_id": "6308a60e5a9c201724f4f325",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 0.1,
        "min_item": 1,
        "item_id_smartcontract": 15,
        "item_size": "0.1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "id": "6308a60e5a9c201724f4f325"
      },
      {
        "_id": "6308a6385a9c201724f4f851",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 0.25,
        "min_item": 1,
        "item_id_smartcontract": 16,
        "item_size": "0.25$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "id": "6308a6385a9c201724f4f851"
      },
      {
        "_id": "6308a6575a9c201724f4fa76",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 0.5,
        "min_item": 1,
        "item_id_smartcontract": 17,
        "item_size": "0.5$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "id": "6308a6575a9c201724f4fa76"
      },
      {
        "_id": "61976479dffe844091ab8df1",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 1,
        "image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/item/4eee8668300136fde2bdf304c7135bf0.ticket.png",
        "item_id_smartcontract": 2,
        "min_item": 1,
        "image_icon":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/icon/ticketWhite.png",
        "image_icon_color":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/icon_color/tickettRed.png",
        "item_size": "1$",
        "id": "61976479dffe844091ab8df1"
      },
      {
        "_id": "6308a6ab5a9c201724f50615",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 2,
        "min_item": 1,
        "item_id_smartcontract": 18,
        "item_size": "2$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "id": "6308a6ab5a9c201724f50615"
      },
      {
        "_id": "6308a6c05a9c201724f508b4",
        "name": "Ticket",
        "detail":
          "The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.",
        "price": 5,
        "min_item": 1,
        "item_id_smartcontract": 19,
        "item_size": "5$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png",
        "id": "6308a6c05a9c201724f508b4"
      }
    ],
    "play_to_earn": false,
    "play_to_earn_status": "in_progress",
    "date_start_event": null,
    "date_end_event": null,
    "reward_item_amount": 0,
    "reward_payment_rate": [
      {
        "no": 1,
        "item_reward_amount": 5
      },
      {
        "no": 2,
        "item_reward_amount": 4
      },
      {
        "no": 3,
        "item_reward_amount": 3
      },
      {
        "no": 4,
        "item_reward_amount": 2
      },
      {
        "no": 5,
        "item_reward_amount": 1
      },
      {
        "no": 6,
        "item_reward_amount": 1
      },
      {
        "no": 7,
        "item_reward_amount": 1
      },
      {
        "no": 8,
        "item_reward_amount": 1
      },
      {
        "no": 9,
        "item_reward_amount": 1
      },
      {
        "no": 10,
        "item_reward_amount": 1
      }
    ],
    "repeat_event_status": false,
    "repeat_event_delay_minute": 0,
    "number_of_played": 0,
    "event_number": 1,
    "min_player": 2,
    "meta_data_list": [
      {
        "item_key": "coins",
        "item_name": "Coins",
        "type": "number",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": 0,
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 0
      },
      {
        "item_key": "player",
        "item_name": "Player",
        "type": "number",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": 0,
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 1
      },
      {
        "item_key": "bot",
        "item_name": "Bot",
        "type": "number",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": 0,
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 2
      },
      {
        "item_key": "wins",
        "item_name": "Wins",
        "type": "number",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": 0,
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 3
      },
      {
        "item_key": "teams_unlock",
        "item_name": "TeamsUnlock",
        "type": "array",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": [
          1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 4
      },
      {
        "item_key": "formations_unlock",
        "item_name": "FormationsUnlock",
        "type": "array",
        "image": null,
        "mini_image": null,
        "active_display": true,
        "default_value": [1, 0, 0, 0, 0],
        "max_value": -1,
        "image_base_url":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        "no": 5
      }
    ],
    "must_try_status": false,
    "must_try_no": 0,
    "category_list": [
      {
        "name": "😀 Others",
        "id": "6197642ddffe844091ab8dcd"
      }
    ],
    "map": [
      {
        "_id": "63c1001b1424f817a70fb2df",
        "map_name": "Map 0",
        "map_id": 0
      }
    ],
    "name": "Goal Rush",
    "story":
      "Get ready to experience the ultimate rush of soccer action! With this thrilling game, you'll be transported to the heart of the action, where every goal counts and every shot could mean the difference between victory and defeat.  Featuring an exciting soccer table that puts your aim and skill to the test, this game is the perfect challenge for fans of the beautiful game. With intuitive controls and stunning graphics, you'll feel like you're right there on the pitch, scoring goals and making epic saves.  But that's not all - as you progress through the story mode, you'll unlock your favorite teams and players, each with their own unique strengths and abilities. From Argentina to France, you'll travel the world and take on the toughest competition in soccer history.  So what are you waiting for? Strap on your boots and get ready to score some goals! With this amazing soccer table game, the only limit is your own skill and determination. So lace up your cleats, grab your ball, and get ready to take on the world like never before!",
    "is_active": true,
    "max_players": 8,
    "play_time": 2880,
    "version": "1",
    "developer": "naka",
    "category": {
      "name": "😀 Others",
      "id": "6197642ddffe844091ab8dcd"
    },
    "game_type": "singleplayer",
    "type_code": "single_02",
    "game_url": "goal-rush",
    "path": "goal-rush",
    "image_main":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/main/1023_468.png",
    "image_room":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/room/1023_468.png",
    "image_list":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/list/1023_468.png",
    "image_category_list":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/category_list/B2.png",
    "image_sum":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/sum/1023_468.png",
    "image_reward":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/reward/1023_468.png",
    "image_banner":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/banner/1368_180.png",
    "image_waiting":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/waiting/1023_468.png",
    "image_background":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/background/1023_468.png",
    "image_home_banner":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/c5810353206f5d2256e4a3a56bfce64f/home_banner/1023_468.png",
    "is_NFT": true,
    "NFT_info": {
      "NFT_token": "105000003",
      "image_game_ipfs_cid": "QmQZbFwKfaVdcH3fJdXa7iAEVGmPVXMYvCjNFT9xFhE6EU",
      "vdo_game_ipfs_cid": "QmYLdyMuQi3Fu7yP5sPo3GujUD2x77U2fe1D6U7ojutwCJ",
      "address_owner": "0x65b96eB3B77ee007f733e1896B5F8A00a02f7e27",
      "owner_id": "642270a67bb1fd6e4b047701",
      "player_id": "642270a67bb1fd6e4b047701",
      "meta_data": {
        "name": "Goal Rush",
        "description":
          "Goal Rush is a football game that offers a variety of game modes and features, including single-player mode against AI with a turn-based system and a Crazy mode where players can shoot at any time. With its flexible gameplay and global connectivity, Goal Rush provides a fun and exciting experience for players of all ages and skill levels. Play game at : https://www.nakamoto.games/goal-rush",
        "external_url": "https://www.nakamoto.games/goal-rush",
        "image": "ipfs://QmQZbFwKfaVdcH3fJdXa7iAEVGmPVXMYvCjNFT9xFhE6EU",
        "animation_url": "ipfs://QmYLdyMuQi3Fu7yP5sPo3GujUD2x77U2fe1D6U7ojutwCJ"
      }
    },
    "pdf_url": "",
    "id": "6411900036d638fbfa63f501",
    "play_total_count": 0,
    "NFT_Owner": "642270a67bb1fd6e4b047701",
    "image_nft_arcade_game":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/MintArcadeGamesNFT/eb460c1d512647ff288baedc33c02506/image/png/f43efca5ca06e0f62055e668e4c9ce34.goalrush pic.png",
    "animation_nft_arcade_game":
      "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/MintArcadeGamesNFT/341757fc69a1b6bd24a33156c61180ce/video/mp4/341757fc69a1b6bd24a33156c61180ce.goalrush VDO.mp4",
    "marketplaces_data": null,
    "media_list": []
  }

  const { topPlayerGameId } = useTopPlayerByGameId()

  return (
    <>
      <Box
        component="div"
        className="w-auto p-[1.875rem]"
      >
        <Grid container>
          <Grid
            item
            xs={12}
          >
            <Box
              component="div"
              className="flex items-center justify-between"
            >
              <KeyboardBackspaceOutlinedIcon className="text-neutral-300" />
              <Typography className="text-[14px] font-bold uppercase text-neutral-300">
                {t("game_details")}
              </Typography>
              <SearchIcon stroke="#E1E2E2" />
            </Box>
            <hr className="mx-0 mb-8 mt-5 text-neutral-800" />
            <Box
              component="div"
              className="flex justify-center"
            >
              <Avatar
                sx={{
                  bgcolor: "#008000",
                  width: 109,
                  height: 109,
                  border: "1px solid #18181C",
                  borderRadius: "13px"
                }}
                variant="square"
              >
                <SearchIcon stroke="#E1E2E2" />
              </Avatar>
            </Box>
            <Typography className="py-[9px] text-center text-[16px] font-bold uppercase text-white-default">
              {t("NAKAMOTO WAR")}
            </Typography>
            <Box
              component="div"
              className="pb- flex justify-center pb-4"
            >
              <Chip
                label="Shooting"
                variant="filled"
                size="small"
                className="cursor-default !bg-[#2f2f2fcc] font-neue-machina uppercase !text-[#ffffff99]"
                color="default"
              />
            </Box>
            <Box
              component="div"
              className="flex items-center justify-center"
            >
              <Box
                component="div"
                className="flex justify-center"
              >
                <ButtonGame
                  textButton={t("join-game")}
                  url={`${router.asPath}/roomlist`}
                />
              </Box>
              <Box
                component="div"
                className="absolute right-5 flex items-center"
              >
                <HowToPlayMobile />
                <ShareToEarn id="test-mock-id-string" />
              </Box>
            </Box>
            <hr className="mx-0 mb-8 mt-5 text-neutral-800" />
            <Grid
              container
              spacing={2}
              xs={12}
            >
              <Grid
                item
                xs={6}
                className="!pl-0"
                container
              >
                <StatisticGameDetailCopy />
              </Grid>
              <Grid
                item
                xs={6}
                className="!pl-0"
              >
                <CardBuyItemCopy
                  buttonStyle="green"
                  gameObject={gameData}
                />
              </Grid>
            </Grid>
            <Box
              component="div"
              className="mx-[-0.5rem] pt-8"
            >
              <StatEstimatedProfit
                minValue={0}
                maxValue={0}
              />
            </Box>
            <Box
              component="div"
              className="mx-[-0.5rem] pt-8"
            >
              <TopPlayer
                element="select"
                subtitle
                background="neutral"
                note
                elevation={0}
                className="lg:max-w-auto max-w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText lg:!h-[424px] xl:!w-[100%]"
                rank
                topPlayerGameId={topPlayerGameId && topPlayerGameId}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default GameDetailLayout
