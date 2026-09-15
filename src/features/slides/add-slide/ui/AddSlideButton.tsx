import { useState } from 'react';
import { Button, Checkbox, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { IconPlus } from '@tabler/icons-react';
import { useSlideStore } from '@/entities/slide';
import { notificationProgressStyle } from '@/shared/config/notifications';

import progressStyles from '@/shared/ui/notificationProgress.module.css';

interface FormValues {
  title: string;
  annotation: string;
  isChecked: boolean;
}

export function AddSlideButton() {
  const [opened, setOpened] = useState(false);
  const addSlide = useSlideStore((state) => state.addSlide);

  const form = useForm<FormValues>({
    initialValues: { title: '', annotation: '', isChecked: false },
    validate: {
      title: (value) => (value.trim().length === 0 ? 'Заголовок обязателен' : null),
    },
  });

  const handleClose = () => {
    setOpened(false);
    form.reset();
  };

  const handleSubmit = form.onSubmit((values) => {
    const title = values.title.trim();
    addSlide({
      title,
      annotation: values.annotation.trim(),
      isChecked: values.isChecked,
    });
    notifications.show({
      message: `Слайд "${title}" добавлен`,
      color: 'green',
      classNames: { root: progressStyles.root },
      style: notificationProgressStyle,
    });
    handleClose();
  });

  return (
    <>
      <Button leftSection={<IconPlus size={18} />} onClick={() => setOpened(true)}>
        Добавить слайд
      </Button>
      <Modal opened={opened} onClose={handleClose} title="Новый слайд" centered>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap="md">
            <TextInput
              label="Заголовок"
              placeholder="Введите заголовок"
              required
              data-autofocus
              {...form.getInputProps('title')}
            />
            <Textarea
              label="Аннотация"
              placeholder="Краткое описание"
              autosize
              minRows={2}
              {...form.getInputProps('annotation')}
            />
            <Checkbox
              label="Проверено"
              {...form.getInputProps('isChecked', { type: 'checkbox' })}
            />
            <Button type="submit" fullWidth>
              Добавить
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
