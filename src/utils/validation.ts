import { z } from 'zod'

export const buildSchema = z.object({
  name: z.string().min(2, 'Informe um nome com pelo menos 2 caracteres.'),
  rankId: z.string().min(1, 'Escolha uma graduação.'),
  lineageId: z.string().min(1, 'Escolha uma linhagem.'),
  elementIds: z
    .tuple([z.string().min(1, 'Escolha um elemento.'), z.string().optional()])
    .refine(([primary, secondary]) => !secondary || primary !== secondary, {
      message: 'Escolha elementos diferentes.',
    }),
  attributes: z.object({
    vida: z.number().int().min(0),
    chakra: z.number().int().min(0),
    taijutsu: z.number().int().min(0),
    ninjutsu: z.number().int().min(0),
    genjutsu: z.number().int().min(0),
    kenjutsu: z.number().int().min(0),
  }),
  training: z.object({
    taijutsu: z.number().int().min(0),
    ninjutsu: z.number().int().min(0),
    genjutsu: z.number().int().min(0),
    kenjutsu: z.number().int().min(0),
  }),
  equipments: z.object({
    weaponId: z.string().optional(),
    armorId: z.string().optional(),
    accessoryId: z.string().optional(),
    ninjaToolId: z.string().optional(),
  }),
  selectedSkills: z.object({
    lineageSkillIds: z.array(z.string()),
    elementalSkillIds: z.array(z.string()),
    buffSkillIds: z.array(z.string()),
  }),
  skillLevels: z.record(z.string(), z.number().int().min(1)),
})

export type BuildFormValues = z.infer<typeof buildSchema>
