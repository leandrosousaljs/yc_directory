'use client';

import { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { formSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      // const result = await createIdea(prevState, formData, pitch);

      // console.log(result);

      // if (result.status === 'SUCCESS') {
      //   toast('Sucesso!', {
      //     description: 'Sua startup foi enviada com sucesso.',
      //   });

      //   router.push(`/startup/${result.id}`);
      // }

      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast('Erro de validação', {
          description: 'Por favor, corrija os erros no formulário e tente novamente.',
        });

        return { ...prevState, error: 'Ocorreu um erro na validação do formulário.', status: 'ERROR' };
      }

      toast('Erro inesperado', {
        description: 'Por favor, tente novamente mais tarde.',
      });

      return { ...prevState, error: 'Ocorreu um erro ao enviar o formulário.', status: 'ERROR' };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL' });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Nome
        </label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Nome da Startup" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Descrição da Startup"
        />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Categoria
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Categoria da Startup (ex: Tecnologia)"
        />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Imagem
        </label>
        <Input id="link" name="link" className="startup-form_input" required placeholder="URL da Imagem da Startup" />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={value => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{ placeholder: 'Descreva brevemente a sua idéia e quais problemas ela resolve' }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white cursor-pointer" disabled={isPending}>
        {isPending ? 'Enviando...' : 'Compartilhe sua Startup'}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
