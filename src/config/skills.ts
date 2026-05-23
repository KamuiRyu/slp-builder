import type { BuffSkill, ElementalSkill, LineageSkill } from '../types/skill'

export const LINEAGE_SKILLS: Record<string, LineageSkill[]> = {
  uchiha: [
    {
      id: 'sharingan-dousatsugan',
      name: 'Sharingan Dousatsugan',
      description: 'Ativa a percepção do Sharingan para antecipar o movimento inimigo e evitar o primeiro golpe recebido.',
      baseDamage: 0,
      imageSrc: '/images/lineages/uchiha-1.png',
      scalingAttribute: 'genjutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'special',
          name: 'Previsão de Movimento',
          description: 'Evita completamente o primeiro hit que atingiria o usuário após a ativação.',
        },
      ],
    },
    {
      id: 'sharingan-copiador',
      name: 'Sharingan Copiador',
      description: 'Analisa os selos e o fluxo de chakra do adversário para copiar o último jutsu elemental utilizado por ele.',
      baseDamage: 0,
      imageSrc: '/images/lineages/uchiha-2.png',
      scalingAttribute: 'genjutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'special',
          name: 'Cópia Elemental',
          description: 'Replica o último jutsu elemental lançado pelo inimigo, respeitando as condições de uso da técnica copiada.',
        },
      ],
    },
    {
      id: 'magen-kasegui',
      name: 'Magen: Tsukuyomi',
      description: 'Prende o alvo em um genjutsu superior, suspendendo-o no ar e mergulhando sua mente no Tsukuyomi para causar dano e interromper suas ações.',
      baseDamage: 150,
      imageSrc: '/images/lineages/uchiha-3.png',
      scalingAttribute: 'genjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Aprisionamento Ilusório',
          description: 'Levanta o alvo e o mantém preso na ilusão, impedindo reação durante a execução.',
          duration: '2s',
        },
      ],
    },
  ],
  uzumaki: [
    {
      id: 'fuuinjutsu-fuuka-houin',
      name: 'Fuuinjutsu: Fuuka Houin',
      description: 'Avança utilizando o selo na palma da mão para selar o kawarimi do alvo durante 12 segundos.',
      imageSrc: '/images/lineages/uzumaki-1.png',
      baseDamage: 50,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Selamento de Kawarimi',
          description: 'Impede o alvo de utilizar a técnica de substituição (kawarimi).',
          duration: '12s',
        },
      ],
    },
    {
      id: 'fuuinjutsu-kongou-fuusa',
      name: 'Fuuinjutsu: Kongou Fuusa',
      description: 'Utiliza o selamento de correntes de chakra douradas para causar dano ao oponente.',
      imageSrc: '/images/lineages/uzumaki-2.png',
      baseDamage: 100,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'fuuinjutsu-shiki-fuujin',
      name: 'Fuuinjutsu: Shiki Fuujin',
      description: 'Invoca o ceifeiro da morte para selar o chakra do oponente por 24 segundos.',
      imageSrc: '/images/lineages/uzumaki-3.png',
      baseDamage: 150,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Selamento de Chakra',
          description: 'Bloqueia completamente o chakra do oponente, impedindo a conjuração de qualquer jutsu.',
          duration: '24s',
        },
      ],
    },
  ],
  senju: [
    {
      id: 'benishigure',
      name: 'Benishigure',
      description: 'O usuário salta graciosamente para a frente e desfere um golpe esmagador no chão com força colossal, quebrando a defesa do alvo.',
      imageSrc: '/images/lineages/senju-1.png',
      baseDamage: 50,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Quebra de Defesa',
          description: 'Rompe a postura defensiva do inimigo, deixando-o vulnerável a novos ataques.',
          duration: '3s',
        },
      ],
    },
    {
      id: 'ouka-resshou',
      name: 'Ouka Resshou',
      description: 'Realiza um soco carregado de chakra concentrado que, ao atingir o alvo, libera uma poderosa onda de choque que o levanta no ar.',
      imageSrc: '/images/lineages/senju-2.png',
      baseDamage: 100,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Arremessa o oponente para cima, interrompendo qualquer ação em andamento.'
        },
      ],
    },
    {
      id: 'tsuutenkyaku',
      name: 'Tsuutenkyaku',
      description: 'Concentra uma quantidade massiva de chakra no calcanhar e desfere um poderoso chute de machado descendente, causando dano extremo e levantando o alvo com o impacto.',
      imageSrc: '/images/lineages/senju-3.png',
      baseDamage: 150,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Arremessa o oponente para cima, interrompendo qualquer ação em andamento.'
        },
      ],
    },
  ],
  hyuuga_souke: [
    {
      id: 'byakugan-juuken-souke',
      name: 'Byakugan: Juuken',
      description: 'Desperta o Byakugan, garantindo percepção total do campo de batalha. Amplifica o Taijutsu em 10% e permite drenar o chakra inimigo através do Juuken, consumindo o chakra do usuário passivamente por segundo. Pode ativar a visão para enxergar tudo ao redor.',
      imageSrc: '/images/lineages/hyuuga-1.png',
      baseDamage: 0,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'buff',
          name: 'Visão Panorâmica (Byakugan)',
          description: 'Aumenta o Taijutsu em 10%, drena o chakra do oponente a cada golpe e consome o chakra do usuário passivamente por segundo.',
          percentStats: { taijutsu: 10 },
        },
      ],
    },
    {
      id: 'hakke-kuuhekishou',
      name: 'Hakke Kuushou: Vacuum Palm',
      description: 'Concentra chakra nas palmas e dispara uma rajada de vácuo em linha reta, atingindo o inimigo à distância com um impacto preciso do Juuken.',
      baseDamage: 100,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'juuho-soushiken',
      name: 'Juuho Soushiken',
      description: 'Envolve os punhos com chakra em forma de leões gêmeos, fortalecendo o Juuken e aumentando o Taijutsu em 12.5%, consome o chakra do usuário passivamente por segundo. A energia também pode ser lançada contra o inimigo para causar dano direto.',
      baseDamage: 150,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'buff',
          name: 'Punhos dos Leões Gêmeos',
          description: 'Aumenta o Taijutsu do usuário em 39% enquanto os punhos estiverem envoltos pela técnica. Consome o chakra do usuário passivamente por segundo.',
          percentStats: { taijutsu: 12.5 },
        },
        {
          type: 'special',
          name: 'Disparo de Chakra',
          description: 'Permite lançar a energia dos leões gêmeos para atingir o alvo à distância.',
        }

      ],
    },
  ],
  hyuuga_bunke: [
    {
      id: 'byakugan-juuken-bouke',
      name: 'Byakugan: Juuken',
      description: 'Desperta o Byakugan, garantindo percepção total do campo de batalha. Amplifica o Taijutsu em 10% e permite drenar o chakra inimigo através do Juuken, consumindo o chakra do usuário passivamente por segundo. Pode ativar a visão para enxergar tudo ao redor.',
      imageSrc: '/images/lineages/hyuuga-1.png',
      baseDamage: 0,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'buff',
          name: 'Visão Panorâmica (Byakugan)',
          description: 'Aumenta o Taijutsu em 10%, drena o chakra do oponente a cada golpe e consome o chakra do usuário passivamente por segundo.',
          percentStats: { taijutsu: 10 },
        },
      ],
    },
    {
      id: 'hakkeshou-kaiten',
      name: 'Hakkeshou Kaiten',
      description: 'Libera uma quantidade massiva de chakra por todos os tenketsu do corpo enquanto gira rapidamente, criando uma barreira giratória impenetrável que causa dano aos inimigos próximos e os repele com a força do impacto.',
      imageSrc: '/images/lineages/hyuuga-b-2.png',
      baseDamage: 100,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'hakke-sanjuu-ni-shou',
      name: 'Hakke Sanjuu Ni Shou',
      description: 'Executa uma sequência veloz e implacável de 32 golpes nos pontos de chakra (tenketsu) dos oponentes em área, causando dano massivo.',
      imageSrc: '/images/lineages/hyuuga-b-3.png',
      baseDamage: 150,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Drenagem de Chakra',
          description: 'Drena continuamente o chakra do oponente a cada golpe desferido nos pontos de chakra.',
          duration: '5s',
        },
      ],
    },
  ],
  nara: [
    {
      id: 'kagemane',
      name: 'Kagemane',
      description: 'Estende a sombra do usuário para conectar-se à do oponente, paralisando seus movimentos e permitindo enforcá-lo com sombras adicionais para causar dano',
      imageSrc: '/images/lineages/nara-1.png',
      baseDamage: 50,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Paralisia e Enforcamento',
          description: 'O inimigo fica completamente paralisado e sofre dano ao ser enforcado por sombras adicionais.',
          duration: '2s',
        },
      ],
    },
    {
      id: 'kage-nui',
      name: 'Kage Nui',
      description: 'Materializa sombras pontiagudas em formato de agulhas físicas que surgem do solo para perfurar o oponente. Não restringe a movimentação do alvo, concentrando todo o seu poder em causar dano puro.',
      imageSrc: '/images/lineages/nara-2.png',
      baseDamage: 100,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'kageyose',
      name: 'Kageyose',
      description: 'Cria uma densa e ampla área de sombras que converge sob os inimigos, prendendo-os no local com a possibilidade de detonar as sombras acumuladas para um impacto devastador.',
      imageSrc: '/images/lineages/nara-3.png',
      baseDamage: 150,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Sombras Aprisionadoras',
          description: 'Prende os inimigos em uma área de sombras com possibilidade de detonação explosiva subsequente.',
          duration: '4s',
        },
      ],
    },
  ],
  sabaku: [
    {
      id: 'suna-no-kouken',
      name: 'Suna no Kouken',
      description: 'Envia braços de areia que causam atordoamento (stun) no inimigo.',
      imageSrc: '/images/lineages/sabaku-1.png',
      baseDamage: 50,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Atordoamento (Stun)',
          description: 'O inimigo fica imobilizado e incapacitado de agir.',
          duration: '1s',
        },
      ],
    },
    {
      id: 'suna-no-tate',
      name: 'Suna no Tate',
      description: 'Cria uma defesa absoluta de areia ao seu redor. Concede imunidade a dano e controle de grupo enquanto durar o chakra. Consome chakra passivamente por segundo e sofre redução de chakra ao receber golpes.',
      imageSrc: '/images/lineages/sabaku-2.png',
      baseDamage: 0,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'buff',
          name: 'Defesa Absoluta',
          description: 'Imunidade total a danos e efeitos de controle de grupo. Consome chakra continuamente e ao receber ataques.',
        },
      ],
    },
    {
      id: 'sabaku-soutaisou',
      name: 'Sabaku Soutaisou',
      description: 'Executa o Grande Mausoléu de Areia (Grand Sand Mausoleum) em uma ampla área, prendendo e esmagando todos os oponentes.',
      imageSrc: '/images/lineages/sabaku-3.png',
      baseDamage: 150,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4
    },
  ],
  lotus: [
    {
      id: 'dainamikku-entori',
      name: 'Dainamikku Entori',
      description: 'Avança em alta velocidade com um chute frontal explosivo, ideal para iniciar combate e romper a guarda do alvo.',
      imageSrc: '/images/lineages/lotus-1.png',
      baseDamage: 50,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'konoha-shoufuu',
      name: 'Konoha Shoufuu',
      description: 'Executa um chute ascendente rápido que intercepta o inimigo e o lança para cima.',
      imageSrc: '/images/lineages/lotus-2.png',
      baseDamage: 100,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Arremessa o oponente para o alto, interrompendo ações e abrindo espaço para combos.',
        },
      ],
    },
    {
      id: 'hachimon-tonkou',
      name: 'Hachimon Tonkou',
      description: 'Liberação progressiva dos portões internos para amplificar o desempenho físico. Cada portão desbloqueado aumenta o Taijutsu em percentual. O usuário pode escolher o nível ativo dos portões para aplicar os bônus correspondentes.',
      imageSrc: '/images/lineages/lotus-3.png',
      baseDamage: 0,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'buff',
          name: 'Portões internos',
          description: 'Escolha o nível ativo para aplicar os bônus.',

          levels: [
            {
              level: 1,
              label: '1º Portão',
              description: 'Aumenta o Taijutsu em 6.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 6.5 },
            },
            {
              level: 2,
              label: '2º Portão',
              description: 'Aumenta o Taijutsu em 13%.',
              duration: '1min30s',
              percentStats: { taijutsu: 13 },
            },
            {
              level: 3,
              label: '3º Portão',
              description: 'Aumenta o Taijutsu em 19.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 19.5 },
            },
            {
              level: 4,
              label: '4º Portão',
              description: 'Aumenta o Taijutsu em 26%.',
              duration: '1min30s',
              percentStats: { taijutsu: 26 },
            },
            {
              level: 5,
              label: '5º Portão',
              description: 'Aumenta o Taijutsu em 32.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 32.5 },
            },
            {
              level: 6,
              label: '6º Portão',
              description: 'Aumenta o Taijutsu em 39%.',
              duration: '1min30s',
              percentStats: { taijutsu: 39 },
            }
          ],
        },
      ],
    },
  ],
  yuuhi: [
    {
      id: 'magen-jubaku-satsu',
      name: 'Magen: Jubaku Satsu',
      description: 'Invoca um clone formado por pétalas que avança contra o inimigo. Ao tocar o alvo, o clone explode em uma rajada ilusória e o lança para cima.',
      imageSrc: '/images/lineages/yuuhi-1.png',
      baseDamage: 50,
      scalingAttribute: 'genjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'O inimigo é lançado para o alto, interrompendo suas ações e deixando-o vulnerável a ataques subsequentes.',
        }
      ]
    },
    {
      id: 'magen-hanagasumi',
      name: 'Magen: Hanagasumi',
      description: 'Conjura pétalas de flores e as dispara contra o inimigo causando dano direto.',
      imageSrc: '/images/lineages/yuuhi-2.png',
      baseDamage: 100,
      scalingAttribute: 'genjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'magen-sanshin',
      name: 'Magen: Sanshin',
      description: 'Cria uma nuvem de pétalas ao redor do usuário e a detona em seguida, atingindo inimigos próximos e lançando-os para cima.',
      imageSrc: '/images/lineages/yuuhi-3.png',
      baseDamage: 150,
      scalingAttribute: 'genjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'O inimigo é lançado para o alto, interrompendo suas ações e deixando-o vulnerável a ataques subsequentes.',
        }
      ]
    },
  ],
  momochi: [
    {
      id: 'kirigakure-no-jutsu',
      name: 'Kirigakure no Jutsu',
      description: 'Espalha uma névoa densa no campo de batalha e se oculta dentro dela. A técnica consome chakra continuamente enquanto estiver ativa e termina quando o chakra acaba, quando o usuário sai da área da névoa ou ao realizar o primeiro ataque.',
      imageSrc: '/images/lineages/momochi-1.png',
      baseDamage: 0,
      scalingAttribute: 'kenjutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'special',
          name: 'Ocultação na Névoa',
          description: 'O usuário permanece oculto dentro da área da névoa enquanto sustenta o consumo contínuo de chakra.',
        },
        {
          type: 'debuff',
          name: 'Visibilidade Reduzida',
          description: 'Inimigos dentro da névoa têm dificuldade para localizar o usuário e reagir ao primeiro ataque.',
        },
      ],
    },
    {
      id: 'sairento-kiringu',
      name: 'Sairento Kiringu',
      description: 'Avança rapidamente contra o inimigo e desfere uma espadada precisa, aproveitando aberturas criadas pela névoa ou pela aproximação silenciosa.',
      imageSrc: '/images/lineages/momochi-2.png',
      baseDamage: 100,
      scalingAttribute: 'kenjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'sakki',
      name: 'Sakki',
      description: 'Envolve o usuário em uma aura demoníaca de pura intenção assassina, pressionando os inimigos próximos e elevando drasticamente sua habilidade com espada.',
      imageSrc: '/images/lineages/momochi-3.png',
      baseDamage: 0,
      scalingAttribute: 'kenjutsu',
      scalingPercent: 0,
      effects: [
        {
          type: 'buff',
          name: 'Aura Demoníaca',
          description: 'Aumenta o Kenjutsu do usuário em 30%.',
          percentStats: { kenjutsu: 30 },
        },
      ],
    },
  ],
}

export const ELEMENTAL_SKILLS: Record<string, ElementalSkill[]> = {
  fire: [
    {
      id: 'katon-endan-goukakyuu',
      name: 'Katon: Endan - Goukakyuu',
      description: 'Concentra chakra nos pulmões e dispara uma grande bola de fogo em linha reta, causando impacto explosivo ao atingir o alvo.',
      imageSrc: '/images/elementals/katon-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
    },
    {
      id: 'katon-housenka',
      name: 'Katon: Housenka',
      description: 'Lança várias esferas de fogo teleguiadas em sequência, pressionando o inimigo com disparos rápidos que ajustam a trajetória até o alvo.',
      imageSrc: '/images/elementals/katon-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'special',
          name: 'Projéteis Teleguiados',
          description: 'As esferas de fogo acompanham o alvo durante o avanço, aumentando a chance de acerto.',
        },
      ],
    },
    {
      id: 'katon-haijingakure',
      name: 'Katon: Haijingakure',
      description: 'Expele uma nuvem de cinzas superaquecidas que envolve o alvo, reduz sua visibilidade e deixa queimaduras persistentes.',
      imageSrc: '/images/elementals/katon-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Queimadura',
          description: 'O alvo sofre dano contínuo pelas cinzas superaquecidas após ser atingido.',
          duration: '4s',
        },
      ],
    },
    {
      id: 'katon-karyuuendan',
      name: 'Katon: Karyuuendan',
      description: 'Libera um fluxo intenso de chamas em formato de dragão, avançando com grande pressão e alto poder destrutivo.',
      imageSrc: '/images/elementals/katon-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
    // {
    //   id: 'katon-gouka-mekkyaku',
    //   name: 'Katon: Gouka Mekkyaku',
    //   description: 'Grande aniquilação de fogo de proporções colossais.',
    //   baseDamage: 320,
    //   scalingAttribute: 'ninjutsu',
    //   scalingPercent: 1.0,
    // },
  ],
  wind: [
    {
      id: 'fuuton-tatsumaki-kou',
      name: 'Fuuton: Tatsumaki Kou',
      description: 'Lança um tornado compacto de vento contra o inimigo, atingindo-o com pressão ascendente e arremessando-o para o alto.',
      imageSrc: '/images/elementals/fuuton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Levanta o alvo com a força do tornado, interrompendo sua ação atual.',
        },
      ],
    },
    {
      id: 'fuuton-shinkuuha',
      name: 'Fuuton: Shinkuuha',
      description: 'Dispara uma lâmina de vácuo concentrada que corta o ar em alta velocidade e rompe a postura defensiva do alvo.',
      imageSrc: '/images/elementals/fuuton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Quebra de Defesa',
          description: 'Rompe a guarda do inimigo, deixando-o exposto a ataques seguintes.',
          duration: '1s',
        },
      ],
    },
    {
      id: 'fuuton-kuchiyose-kirikiri-mai',
      name: 'Fuuton: Kuchiyose Kirikiri Mai',
      description: 'Invoca uma rajada cortante em área que varre o campo, golpeia os inimigos próximos e os lança para cima.',
      imageSrc: '/images/elementals/fuuton-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Arremessa os alvos atingidos para o alto, abrindo espaço para continuidade de combo.',
        },
      ],
    },
    {
      id: 'fuuton-kamaitachi',
      name: 'Fuuton: Kamaitachi',
      description: 'Cria um redemoinho de vento cortante que avança com força elevada, golpeando o inimigo e levantando-o com o impacto.',
      imageSrc: '/images/elementals/fuuton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
      effects: [
        {
          type: 'debuff',
          name: 'Levantamento (Knockup)',
          description: 'Suspende o alvo no ar pela pressão do vento, interrompendo movimentação e conjuração.',
        },
      ],
    },
    // {
    //   id: 'fuuton-tatsu-no-oushigoto',
    //   name: 'Fuuton: Tatsu no Oushigoto',
    //   description: 'Tornado de grande pressão do dragão de vento.',
    //   baseDamage: 320,
    //   scalingAttribute: 'ninjutsu',
    //   scalingPercent: 1.0,
    // },
  ],
  lightning: [
    {
      id: 'raiton-chidori-raikiri',
      name: 'Raiton: Chidori / Raikiri',
      description: 'Concentra chakra elétrico na palma da mão e avança em alta velocidade para perfurar o alvo, descarregando eletricidade suficiente para atordoá-lo.',
      imageSrc: '/images/elementals/raiton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
      effects: [
        {
          type: 'debuff',
          name: 'Atordoamento (Stun)',
          description: 'O impacto elétrico imobiliza brevemente o alvo atingido.',
          duration: '1s',
        },
      ],
    },
    {
      id: 'raiton-raikyuu',
      name: 'Raiton: Raikyuu',
      description: 'Dispara uma esfera de eletricidade concentrada contra o inimigo, causando dano e paralisando o alvo ao contato.',
      imageSrc: '/images/elementals/raiton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Atordoamento (Stun)',
          description: 'A descarga elétrica interrompe o movimento do alvo atingido.',
          duration: '1s',
        },
      ],
    },
    {
      id: 'raiton-nagashi',
      name: 'Raiton: Nagashi',
      description: 'Libera eletricidade ao redor do corpo em uma descarga de área, atingindo inimigos próximos e atordoando quem for pego pela corrente.',
      imageSrc: '/images/elementals/raiton-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Atordoamento em Área',
          description: 'Inimigos atingidos pela descarga elétrica ficam brevemente atordoados.',
          duration: '1s',
        },
      ],
    },
    {
      id: 'raiton-hebi-ikazuchi',
      name: 'Raiton: Hebi Ikazuchi',
      description: 'Projeta uma descarga elétrica em forma de serpente que avança contra o alvo e causa dano direto com grande pressão ofensiva.',
      imageSrc: '/images/elementals/raiton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
    // {
    //   id: 'raiton-kirin',
    //   name: 'Raiton: Kirin',
    //   description: 'Técnica lendária que invoca um trovão em formato de criatura mitológica.',
    //   baseDamage: 320,
    //   scalingAttribute: 'ninjutsu',
    //   scalingPercent: 1.0,
    // },
  ],
  water: [
    {
      id: 'suiton-teppodama',
      name: 'Suiton: Teppodama',
      description: 'Dispara uma esfera compacta de água em alta pressão, atingindo o inimigo com impacto direto e causando dano.',
      imageSrc: '/images/elementals/suiton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
    },
    {
      id: 'suiton-suikodan',
      name: 'Suiton: Suikodan',
      description: 'Cria um projétil de água em formato de tubarão que persegue o inimigo, ajustando sua trajetória até atingir o alvo.',
      imageSrc: '/images/elementals/suiton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'special',
          name: 'Projétil Teleguiado',
          description: 'O tubarão de água acompanha o alvo durante o avanço, aumentando a chance de acerto.',
        },
      ],
    },
    {
      id: 'suiton-suirou',
      name: 'Suiton: Suirou',
      description: 'Forma uma bolha de água ao redor do alvo, prendendo-o dentro da prisão líquida e limitando suas ações enquanto a técnica se mantém ativa.',
      imageSrc: '/images/elementals/suiton-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Prisão de Água',
          description: 'O alvo fica preso na bolha de água, com movimentação e reação interrompidas.',
          duration: '3s',
        },
      ],
    },
    {
      id: 'suiton-suireiha',
      name: 'Suiton: Suireiha',
      description: 'Ativa o modo Pistola de Água, concentrando chakra em disparos precisos de água pressurizada para causar dano à distância.',
      imageSrc: '/images/elementals/suiton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
      effects: [
        {
          type: 'special',
          name: 'Modo Pistola de Água',
          description: 'Permite disparar rajadas concentradas de água com alta precisão enquanto o modo estiver ativo.',
        },
      ],
    },
    // {
    //   id: 'suiton-daikodan',
    //   name: 'Suiton: Daikodan',
    //   description: 'Técnica do grande tubarão de água que absorve chakra do oponente.',
    //   baseDamage: 320,
    //   scalingAttribute: 'ninjutsu',
    //   scalingPercent: 1.0,
    // },
  ],
  earth: [
    {
      id: 'doton-doryuuheki',
      name: 'Doton: Doryuuheki',
      description: 'Faz uma muralha sólida de terra subir à frente do usuário, bloqueando avanços e criando uma barreira defensiva no campo.',
      imageSrc: '/images/elementals/doton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
      effects: [
        {
          type: 'buff',
          name: 'Muralha de Terra',
          description: 'Cria uma barreira que protege o usuário e dificulta a aproximação inimiga.',
        },
      ],
    },
    {
      id: 'doton-chidoukaku-kouka',
      name: 'Doton: Chidoukaku / Kouka',
      description: 'Invoca um pilar de terra sob os pés do alvo. Se acertar, o impacto quebra a defesa do inimigo; se errar, o pilar se ergue próximo ao usuário e funciona como proteção.',
      imageSrc: '/images/elementals/doton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Quebra de Defesa',
          description: 'Ao atingir o alvo, o pilar rompe sua guarda e deixa o inimigo vulnerável.',
          duration: '3s',
        },
        {
          type: 'buff',
          name: 'Pilar Protetor',
          description: 'Caso não acerte o alvo, o pilar permanece como cobertura defensiva para o usuário.',
        },
      ],
    },
    {
      id: 'doton-dorojigoku',
      name: 'Doton: Dorojigoku',
      description: 'Cria uma poça de lama em área que prende os inimigos atingidos, dificultando a movimentação e mantendo-os expostos.',
      imageSrc: '/images/elementals/doton-3.png',
      baseDamage: 0,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Prisão de Lama',
          description: 'Inimigos dentro da área ficam presos na lama e têm suas ações interrompidas.',
          duration: '4s',
        },
      ],
    },
    {
      id: 'doton-doryuudan',
      name: 'Doton: Doryuudan',
      description: 'Molda a terra em uma cabeça de dragão que dispara projéteis pesados contra o alvo, causando dano direto com impacto bruto.',
      imageSrc: '/images/elementals/doton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
    // {
    //   id: 'doton-toujinbou',
    //   name: 'Doton: Toujinbou',
    //   description: 'Espinho maciço de pedra perfurante que surge do chão.',
    //   baseDamage: 320,
    //   scalingAttribute: 'ninjutsu',
    //   scalingPercent: 1.0,
    // },
  ],
}

export const BUFF_SKILLS: BuffSkill[] = []

export const LINEAGE_BUFF_SKILLS: Record<string, BuffSkill[]> = {
  hyuuga_souke: [
    {
      id: 'byakugan-focus',
      name: 'Foco Byakugan',
      imageSrc: '/images/lineages/hyuuga-1.png',
      description: 'Refina percepção e controle de taijutsu.',
      effects: [
        {
          type: 'buff',
          name: 'Leitura de movimento',
          description: 'Aumenta Taijutsu em percentual.',
          percentStats: { taijutsu: 10 },
        },
      ],
    },
    {
      id: 'juuho-soushiken',
      name: 'Juuho Soushiken',
      imageSrc: '/images/lineages/hyuuga-1.png',
      description: 'Punhos revestidos por chakra que amplificam o Juuken.',
      effects: [
        {
          type: 'buff',
          name: 'Punhos dos Leões Gêmeos',
          description: 'Aumenta o Taijutsu do usuário em 39%.',
          percentStats: { taijutsu: 12.5 },
        },
      ],
    },
  ],
  hyuuga_bunke: [
    {
      id: 'byakugan-focus',
      name: 'Foco Byakugan',
      imageSrc: '/images/lineages/hyuuga-1.png',
      description: 'Refina percepção e controle de taijutsu.',
      effects: [
        {
          type: 'buff',
          name: 'Leitura de movimento',
          description: 'Aumenta Taijutsu em percentual.',
          percentStats: { taijutsu: 10 },
        },
      ],
    }

  ],

  lotus: [
    {
      id: 'lotus-gates',
      name: 'Hachimon Tonkou',
      imageSrc: '/images/lineages/lotus-3.png',
      description: 'Liberação progressiva dos portões internos para amplificar o desempenho físico.',
      effects: [
        {
          type: 'buff',
          name: 'Portões internos',
          description: 'Escolha o nível ativo para aplicar os bônus.',
          levels: [
            {
              level: 1,
              label: '1º Portão',
              description: 'Aumenta o Taijutsu em 6.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 6.5 },
            },
            {
              level: 2,
              label: '2º Portão',
              description: 'Aumenta o Taijutsu em 13%.',
              duration: '1min30s',
              percentStats: { taijutsu: 13 },
            },
            {
              level: 3,
              label: '3º Portão',
              description: 'Aumenta o Taijutsu em 19.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 19.5 },
            },
            {
              level: 4,
              label: '4º Portão',
              description: 'Aumenta o Taijutsu em 26%.',
              duration: '1min30s',
              percentStats: { taijutsu: 26 },
            },
            {
              level: 5,
              label: '5º Portão',
              description: 'Aumenta o Taijutsu em 32.5%.',
              duration: '1min30s',
              percentStats: { taijutsu: 32.5 },
            },
            {
              level: 6,
              label: '6º Portão',
              description: 'Aumenta o Taijutsu em 39%.',
              duration: '1min30s',
              percentStats: { taijutsu: 39 },
            }
          ]
        },
      ],
    },
  ],
  momochi: [
    {
      id: 'sakki',
      name: 'Sakki',
      imageSrc: '/images/elementals/unknown.png',
      description: 'Aura demoníaca que amplifica a pressão assassina e a técnica de espada.',
      effects: [
        {
          type: 'buff',
          name: 'Aura Demoníaca',
          description: 'Aumenta o Kenjutsu do usuário em 30%.',
          percentStats: { kenjutsu: 30 },
        },
      ],
    },
  ],
}
