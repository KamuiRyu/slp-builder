---
name: shinobi-builder
description: Skill para criação e manutenção de um builder frontend de builds para o jogo Shinobi Striker usando React, TypeScript, Vite, TailwindCSS e shadcn/ui.
---

# Shinobi Builder Skill

## Objetivo

Criar uma aplicação frontend para montagem e compartilhamento de builds do jogo Shinobi Striker.

A aplicação será totalmente frontend, sem backend, utilizando compartilhamento via JSON serializado em Base64 na URL.

---

# Stack Obrigatória

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod

---

# Regras Técnicas

- Nunca utilizar backend
- Nunca utilizar banco de dados
- Nunca utilizar autenticação
- Todos os dados devem ser locais
- Compartilhamento deve ocorrer apenas via Base64
- O código deve ser modular
- O projeto deve ser expansível futuramente

---

# Estrutura do Projeto

```txt
src/
 ├── components/
 ├── pages/
 ├── config/
 │    ├── ranks.ts
 │    ├── lineages.ts
 │    ├── elements.ts
 │    ├── equipments.ts
 │    └── skills.ts
 │
 ├── types/
 │    ├── build.ts
 │    ├── skill.ts
 │    ├── attributes.ts
 │    └── rank.ts
 │
 ├── utils/
 │    ├── damage.ts
 │    ├── stats.ts
 │    ├── validation.ts
 │    └── share.ts
 │
 └── lib/
```

---

# Sistema de Atributos

## Atributos e Pontos Iniciais

```ts
export type AttributeKey =
  | "vida"
  | "chakra"
  | "taijutsu"
  | "ninjutsu"
  | "genjutsu"
  | "kenjutsu";

export type Attributes = Record<AttributeKey, number>;

export type TrainingAttributes = Record<
  "taijutsu" | "ninjutsu" | "genjutsu" | "kenjutsu",
  number
>;

export const INITIAL_ATTRIBUTE_POINTS: Attributes = {
  vida: 0,
  chakra: 0,
  taijutsu: 0,
  ninjutsu: 0,
  genjutsu: 0,
  kenjutsu: 0,
};

export const INITIAL_TRAINING_POINTS: TrainingAttributes = {
  taijutsu: 0,
  ninjutsu: 0,
  genjutsu: 0,
  kenjutsu: 0,
};
```

---

# Graduação Ninja

A graduação define quantos pontos podem ser distribuídos.

## Estrutura

```ts
export type NinjaRank = {
  id: string;
  name: string;
  maxAttributePoints: number;
  maxTrainableAttributePoints: number;
  baseStats: Attributes;
};
```

## Configuração Inicial

```ts
export const NINJA_RANKS: NinjaRank[] = [
  {
    id: "genin",
    name: "Genin",
    maxAttributePoints: 125,
    maxTrainableAttributePoints: 65,
    baseStats: {
      vida: 650,
      chakra: 650,
      taijutsu: 0,
      ninjutsu: 0,
      genjutsu: 0,
      kenjutsu: 0,
    },
  },
  {
    id: "chunnin",
    name: "Chunnin",
    maxAttributePoints: 250,
    maxTrainableAttributePoints: 125,
    baseStats: {
      vida: 900,
      chakra: 900,
      taijutsu: 0,
      ninjutsu: 0,
      genjutsu: 0,
      kenjutsu: 0,
    },
  },
];
```

## Stats Base por Graduação

- Genin possui 650 de vida base e 650 de chakra base
- Chunnin possui 900 de vida base e 900 de chakra base
- Os demais atributos base começam em 0, salvo regras futuras

---

# Regras de Distribuição

Todos os atributos abaixo contam como pontos distribuídos:

- vida
- chakra
- taijutsu
- ninjutsu
- genjutsu
- kenjutsu

Vida e chakra possuem conversão especial:

- 1 ponto distribuído em vida equivale a +10 de vida final
- 1 ponto distribuído em chakra equivale a +10 de chakra final

Os demais atributos usam conversão direta:

- 1 ponto distribuído em taijutsu equivale a +1 taijutsu
- 1 ponto distribuído em ninjutsu equivale a +1 ninjutsu
- 1 ponto distribuído em genjutsu equivale a +1 genjutsu
- 1 ponto distribuído em kenjutsu equivale a +1 kenjutsu

## Pontos Treináveis

Taijutsu, ninjutsu, genjutsu e kenjutsu possuem pontos treináveis separados da distribuição principal.

- Genin pode ter até 65 pontos treináveis em cada atributo treinável
- Chunnin pode ter até 125 pontos treináveis em cada atributo treinável
- Pontos treináveis não consomem `maxAttributePoints`
- Pontos treináveis somam diretamente no atributo final

---

# Estrutura da Build

```ts
export type Build = {
  name: string;

  rankId: string;

  lineageId: string;
  elementId: string;

  attributes: {
    vida: number;
    chakra: number;
    taijutsu: number;
    ninjutsu: number;
    genjutsu: number;
    kenjutsu: number;
  };

  training: {
    taijutsu: number;
    ninjutsu: number;
    genjutsu: number;
    kenjutsu: number;
  };

  equipments: {
    weaponId?: string;
    armorId?: string;
    accessoryId?: string;
    ninjaToolId?: string;
  };

  selectedSkills: {
    lineageSkillIds: string[];
    elementalSkillIds: string[];
    buffSkillIds: string[];
  };
};
```

---

# Linhagens

Linhagens:
- não dão bônus direto
- apenas liberam skills

## Estrutura

```ts
export type Lineage = {
  id: string;
  name: string;
  skills: LineageSkill[];
};
```

---

# Elementos

Elementos:
- não dão bônus direto
- apenas liberam skills elementais

## Estrutura

```ts
export type Element = {
  id: string;
  name: string;
  skills: ElementalSkill[];
};
```

---

# Equipamentos

Equipamentos podem fornecer bônus de atributos.

## Tipos

- weapon
- armor
- accessory
- ninjaTool

## Estrutura

```ts
export type Equipment = {
  id: string;
  name: string;
  type: "weapon" | "armor" | "accessory" | "ninjaTool";
  stats?: Partial<Attributes>;
};
```

---

# Skills de Linhagem

## Fórmulas

```txt
50 + 40% TAI/NIN/GEN/KEN
100 + 40% TAI/NIN/GEN/KEN
150 + 40% TAI/NIN/GEN/KEN
```

## Estrutura

```ts
export type LineageSkill = {
  id: string;
  name: string;

  baseDamage: number;

  scalingAttribute:
    | "taijutsu"
    | "ninjutsu"
    | "genjutsu"
    | "kenjutsu";

  scalingPercent: 0.4;
};
```

---

# Skills Elementais

## Fórmulas

```txt
40 + 20% NIN
80 + 40% NIN
120 + 60% NIN
200 + 80% NIN
```

## Estrutura

```ts
export type ElementalSkill = {
  id: string;
  name: string;

  baseDamage: number;

  scalingAttribute: "ninjutsu";

  scalingPercent:
    | 0.2
    | 0.4
    | 0.6
    | 0.8;
};
```

---

# Fórmula de Dano

```ts
export function calculateDamage(
  baseDamage: number,
  attributeValue: number,
  scalingPercent: number
): number {
  return baseDamage + attributeValue * scalingPercent;
}
```

---

# Compartilhamento Base64

## Encode

```ts
export function encodeBuild(build: Build): string {
  const json = JSON.stringify(build);
  const bytes = new TextEncoder().encode(json);

  return btoa(String.fromCharCode(...bytes));
}
```

## Decode

```ts
export function decodeBuild(encoded: string): Build {
  const bytes = Uint8Array.from(
    atob(encoded),
    c => c.charCodeAt(0)
  );

  const json = new TextDecoder().decode(bytes);

  return JSON.parse(json);
}
```

---

# Requisitos de UI

A interface deve:

- possuir tema escuro
- possuir visual inspirado em Naruto/Shinobi
- possuir cards modernos
- possuir animações suaves
- possuir preview da build
- atualizar dano em tempo real
- funcionar em desktop e mobile
- utilizar componentes shadcn/ui ou componentes locais equivalentes no padrão shadcn para inputs, selects, checkboxes, labels e botões

---

# Diretrizes de Código

- Utilizar TypeScript strict
- Preferir componentes reutilizáveis
- Evitar código duplicado
- Separar configs do core da aplicação
- Toda fórmula deve ficar em utils/
- Toda tipagem deve ficar em types/
- Nunca hardcodar fórmulas dentro de componentes React
- Preferir composição ao invés de lógica gigante em páginas
- Campos numéricos devem usar `inputMode="numeric"` e `pattern="[0-9]*"`
- Campos numéricos devem sanitizar entrada com regex removendo qualquer caractere não numérico
- Campos numéricos devem aplicar clamp pelo limite correto antes de atualizar o estado do formulário
- Não permitir `e`, `-`, `.`, vírgula ou qualquer caractere não inteiro nos campos de pontos

---

# Objetivo Final

Criar um builder rápido, moderno, escalável e fácil de compartilhar via URL.
