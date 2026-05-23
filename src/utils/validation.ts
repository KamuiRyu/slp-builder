import { z } from 'zod'

export const buildSchema = z.object({
  name: z.string().min(2, 'Informe um nome com pelo menos 2 caracteres.'),
  rankId: z.string().min(1, 'Escolha uma graduação.'),
  lineageId: z.string().min(1, 'Escolha uma linhagem.'),
  avatarId: z.string().optional(),
  avatarImageIndex: z.number().int().min(0).optional(),
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
  equipments: z
    .object({
      weaponId: z.string().optional(),
      equipment1Id: z.string().optional(),
      equipment2Id: z.string().optional(),
      bandanaId: z.string().optional(),
      ninjaToolId: z.string().optional(),
    })
    .refine(
      (eq) =>
        !eq.equipment1Id ||
        !eq.equipment2Id ||
        eq.equipment1Id !== eq.equipment2Id,
      {
        message: 'Não é possível equipar dois equipamentos iguais.',
        path: ['equipment2Id'],
      },
    )
    .refine(
      (eq) => {
        const eq1 = eq.equipment1Id
        const eq2 = eq.equipment2Id
        if (!eq1 || !eq2) return true
        const isHat1 = eq1 === 'hat' || eq1.endsWith('-hat')
        const isHat2 = eq2 === 'hat' || eq2.endsWith('-hat')
        return !isHat1 || !isHat2
      },
      {
        message: 'Só é possível equipar um chapéu.',
        path: ['equipment2Id'],
      },
    ),
  selectedSkills: z.object({
    lineageSkillIds: z.array(z.string()),
    elementalSkillIds: z.array(z.string()),
    buffSkillIds: z.array(z.string()),
    generalSkillIds: z.array(z.string()),
  }),
  skillLevels: z.record(z.string(), z.number().int().min(1)),
})

export type BuildFormValues = z.infer<typeof buildSchema>
