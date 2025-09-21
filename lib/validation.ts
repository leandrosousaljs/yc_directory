import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'O nome da startup deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome da startup deve ter no máximo 100 caracteres.' }),
  description: z
    .string()
    .min(20, { message: 'A descrição deve ter pelo menos 20 caracteres.' })
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres.' }),
  category: z
    .string()
    .min(3, { message: 'A categoria deve ter pelo menos 3 caracteres.' })
    .max(20, { message: 'A categoria deve ter no máximo 20 caracteres.' }),
  link: z
    .string()
    .url({ message: 'URL inválida.' })
    .refine(
      async url => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');

          return contentType?.startsWith('image/');
        } catch {
          return false;
        }
      },
      { message: ' O link deve ser uma imagem.' }
    ),
  pitch: z.string().min(10, { message: 'Seu pitch deve ter pelo menos 10 caracteres.' }),
});
