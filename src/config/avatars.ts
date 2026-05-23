import type { NinjaAvatar } from '../types/avatar'

export const NINJA_AVATARS: NinjaAvatar[] = [
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    imageSrc: '/images/avatars/naruto.png',
    images: [
      '/images/avatars/naruto.png',
      '/images/avatars/naruto-sage.png',
      '/images/avatars/naruto-kcm.png',
    ],
  },
  {
    id: 'sasuke',
    name: 'Sasuke Uchiha',
    imageSrc: '/images/avatars/sasuke.png',
    images: [
      '/images/avatars/sasuke.png',
      '/images/avatars/sasuke-curse.png',
      '/images/avatars/sasuke-rinnegan.png',
    ],
  },
  {
    id: 'sakura',
    name: 'Sakura Haruno',
    imageSrc: '/images/avatars/sakura.png',
    images: [
      '/images/avatars/sakura.png',
      '/images/avatars/sakura-byakugou.png',
    ],
  },
  {
    id: 'kakashi',
    name: 'Kakashi Hatake',
    imageSrc: '/images/avatars/kakashi.png',
    images: [
      '/images/avatars/kakashi.png',
      '/images/avatars/kakashi-anbu.png',
      '/images/avatars/kakashi-mangekyou.png',
    ],
  },
  {
    id: 'itachi',
    name: 'Itachi Uchiha',
    imageSrc: '/images/avatars/itachi.png',
    images: [
      '/images/avatars/itachi.png',
      '/images/avatars/itachi-anbu.png',
    ],
  },
  {
    id: 'madara',
    name: 'Madara Uchiha',
    imageSrc: '/images/avatars/madara.png',
    images: [
      '/images/avatars/madara.png',
      '/images/avatars/madara-edo.png',
      '/images/avatars/madara-rikudou.png',
    ],
  },
  {
    id: 'minato',
    name: 'Minato Namikaze',
    imageSrc: '/images/avatars/minato.png',
    images: [
      '/images/avatars/minato.png',
      '/images/avatars/minato-edo.png',
    ],
  },
  {
    id: 'gaara',
    name: 'Gaara',
    imageSrc: '/images/avatars/gaara.png',
    images: [
      '/images/avatars/gaara.png',
      '/images/avatars/gaara-kazekage.png',
    ],
  },
]

export const DEFAULT_AVATAR_IMAGE = '/images/elementals/unknown.png'
