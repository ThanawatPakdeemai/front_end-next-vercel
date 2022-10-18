import React from 'react';
import type { NextPage } from 'next';
import type { IGame } from 'types/games/gameData';

interface IProps {
  data: IGame;
}

const GamePage: NextPage<IProps> = ({ data }) => {
  return <>{data}</>;
};

export default GamePage;

export function getServerSideProps({
  params: { game }
}: {
  params: {
    game: string;
  };
}) {
  const data = {
    _id: '62907ded208735272ee9330e',
    howto: {
      title: 'How to play Spooky Run',
      details:
        '<p><strong>Spooky Run</strong></p><p><br></p><p><strong>How to play:</strong></p><p><br></p><p>Spooky Run is a parkour game. Set inside a dark and grim world, Spooky Run is full of challenging obstacles such as abandoned cars, trains, railings, and more. Players can choose from many rich and interesting characters. The longer they run, the more difficult the race gets, and they earn more rewards.&nbsp;</p><p><br></p><p>The city is plunged into eternal darkness for unknown reasons. In order to survive, the only way is to run fast and hard. Go wild! Let us enter the dark and mysterious world together and escape to freedom.&nbsp;</p><p><br></p><p><br></p><p><strong>Game specifics:</strong></p><p><br></p><p>Players can choose <strong>parkour characters</strong> and pick up <strong>props</strong> to increase the chance of survival.</p><p><br></p><p><strong>Characters：</strong></p><p><br></p><p>Frankenstein、Hairy Dwarf、Lycan、Scarecrow、Vampire, and Witch.</p><p><br></p><p><br></p><p><strong>Item props:</strong></p><p><br></p><p><strong>Magnetic</strong></p><p><br></p><p>After obtaining the Coin Magnet, you can collect all the gold coins in the game within the effective time of the item.</p><p><br></p><p><strong>Multiply</strong></p><p><br></p><p>After obtaining the 2X Multiplier, every gold coin collected will get twice the original Multiplier within the effective time of the item.</p><p><br></p><p><strong>DoubleJump</strong></p><p><br></p><p>After obtaining the DoubleJump, you can perform a 2-pole jump within the effective time of the item.</p><p><br></p><p><strong>PowerUp</strong></p><p><br></p><p>After obtaining PowerUp, within the effective time of the item, you can sprint without being affected by obstacles, but you can still collect gold coins.</p><p><br></p><p><br></p><p><strong>Game operation:</strong></p><p><br></p><p>WASD = Motion Control (pc mode)</p><p><br></p><p>Swipe (mobile phones &amp; tablets). Swipe up to jump, swipe down to roll, swipe left to move left, and swipe right to move right.</p><p><br></p><p><br></p><p><br></p><p><strong>Score calculation:</strong></p><p><br></p><p>Score = (distance *10) + bonus</p>'
    },
    game_free_status: false,
    hot_game_status: true,
    hot_game_no: 1,
    banner_status: true,
    banner_no: 1,
    banner_description: '<p>Keep running forward, evade the nightmares!</p>',
    tournament: false,
    browser_support: [
      {
        key: 'safari',
        name: 'Safari',
        supported: true
      },
      {
        key: 'chrome',
        name: 'Chrome',
        supported: true
      },
      {
        key: 'edge',
        name: 'Edge',
        supported: true
      },
      {
        key: 'firefox',
        name: 'Firefox',
        supported: true
      },
      {
        key: 'opera',
        name: 'Opera',
        supported: true
      }
    ],
    device_support: [
      {
        key: 'mobile',
        name: 'Mobile and Tablet',
        supported: false
      },
      {
        key: 'desktop',
        name: 'Desktop',
        supported: true
      }
    ],
    item: [
      {
        _id: '61976479dffe844091ab8df1',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 1,
        image:
          'https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/item/4eee8668300136fde2bdf304c7135bf0.ticket.png',
        item_id_smartcontract: 2,
        min_item: 1,
        image_icon:
          'https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/icon/ticketWhite.png',
        image_icon_color:
          'https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/d74a0901f693043dc5ed0a57d3d95788/icon_color/tickettRed.png',
        item_size: '1$'
      },
      {
        _id: '6308a5b75a9c201724f4e7cc',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 0.05,
        min_item: 1,
        item_id_smartcontract: 14,
        item_size: '0.05$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png'
      },
      {
        _id: '6308a60e5a9c201724f4f325',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 0.1,
        min_item: 1,
        item_id_smartcontract: 15,
        item_size: '0.1$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png'
      },
      {
        _id: '6308a6385a9c201724f4f851',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 0.25,
        min_item: 1,
        item_id_smartcontract: 16,
        item_size: '0.25$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png'
      },
      {
        _id: '6308a6575a9c201724f4fa76',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 0.5,
        min_item: 1,
        item_id_smartcontract: 17,
        item_size: '0.5$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png'
      },
      {
        _id: '6308a6ab5a9c201724f50615',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 2,
        min_item: 1,
        item_id_smartcontract: 18,
        item_size: '2$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png'
      },
      {
        _id: '6308a6c05a9c201724f508b4',
        name: 'Ticket',
        detail:
          'The tickets can be used in action games such as Naka Strike, Naka Runner, Popcorn popper and so on.',
        price: 5,
        min_item: 1,
        item_id_smartcontract: 19,
        item_size: '5$',
        image_icon:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon/ticket_white.png',
        image:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/image/ticket.png',
        image_icon_color:
          'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/c751439d0db3883ac1c8e816327adcab/icon_color/ticket_red.png'
      }
    ],
    play_to_earn: false,
    date_start_event: null,
    date_end_event: null,
    reward_item_amount: 0,
    reward_payment_rate: [
      {
        no: 1,
        item_reward_amount: 5
      },
      {
        no: 2,
        item_reward_amount: 4
      },
      {
        no: 3,
        item_reward_amount: 3
      },
      {
        no: 4,
        item_reward_amount: 2
      },
      {
        no: 5,
        item_reward_amount: 1
      },
      {
        no: 6,
        item_reward_amount: 1
      },
      {
        no: 7,
        item_reward_amount: 1
      },
      {
        no: 8,
        item_reward_amount: 1
      },
      {
        no: 9,
        item_reward_amount: 1
      },
      {
        no: 10,
        item_reward_amount: 1
      }
    ],
    repeat_event_status: false,
    repeat_event_delay_minute: 0,
    number_of_played: 0,
    event_number: 1,
    min_player: 2,
    map: [],
    name: 'Spooky Run',
    story: 'Keep running forward, evade the nightmares!',
    is_active: true,
    max_players: 8,
    play_time: 2880,
    version: '1',
    developer: 'NaKa',
    category: {
      name: '🔫 Shooting',
      id: '61976327dffe844091ab8d6d'
    },
    game_type: 'singleplayer',
    type_code: 'single_02',
    game_url: 'spooky',
    path: 'spooky',
    image_banner:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/banner/Sub-Banner.png',
    image_list:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/list/Naka_iii.png',
    image_room:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/room/Roomlist.png',
    image_main:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/main/Character.png',
    image_sum:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/sum/Sub2.png',
    image_waiting:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/waiting/Sub2.png',
    image_background:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/background/naka---BG.png',
    image_reward:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/reward/Sub2.png',
    image_category_list:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/category_list/B2.png',
    image_home_banner:
      'https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game/978cc8bbc8d83ce7986371144c939cda/home_banner/Main-Banner.png',
    play_to_earn_status: 'in_progress',
    id: '62907ded208735272ee9330e'
  };
  if (game && data) {
    return {
      props: {
        data: data
      }
    };
  }
  return {
    redirect: {
      destination: '/404',
      permanent: false
    }
  };
}
