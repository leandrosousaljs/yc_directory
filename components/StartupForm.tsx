'use client';

import { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');
  const handleFormSubmit = () => {
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL' });
  };

  return (
    <form action={() => {}} className="startup-form">
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
