import { useState } from 'react';
import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { IconTrash } from '@tabler/icons-react';
import { useSlideStore } from '@/entities/slide';
import { notificationProgressStyle } from '@/shared/config/notifications';

import progressStyles from '@/shared/ui/notificationProgress.module.css';

interface DeleteSlideButtonProps {
  slideId: string;
  slideTitle: string;
}

export function DeleteSlideButton({ slideId, slideTitle }: DeleteSlideButtonProps) {
  const [opened, setOpened] = useState(false);
  const removeSlide = useSlideStore((state) => state.removeSlide);

  const handleConfirm = () => {
    removeSlide(slideId);
    notifications.show({
      message: `Слайд "${slideTitle}" удалён`,
      color: 'red',
      classNames: { root: progressStyles.root },
      style: notificationProgressStyle,
    });
    setOpened(false);
  };

  return (
    <>
      <ActionIcon
        variant="subtle"
        color="red"
        aria-label="Удалить слайд"
        onClick={() => setOpened(true)}
      >
        <IconTrash size={18} />
      </ActionIcon>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Удалить слайд" centered>
        <Text size="sm">Удалить слайд "{slideTitle}"? Это действие нельзя отменить.</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setOpened(false)}>
            Отмена
          </Button>
          <Button color="red" onClick={handleConfirm}>
            Удалить
          </Button>
        </Group>
      </Modal>
    </>
  );
}
