import { useCallback, useEffect, useState } from 'react';
import { ActionIcon, Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSlideStore } from '@/entities/slide';
import { AddSlideButton } from '@/features/slides/add-slide';
import { DeleteSlideButton } from '@/features/slides/delete-slide';

import styles from './SlideCarousel.module.css';

export function SlideCarousel() {
  const slides = useSlideStore((state) => state.slides);
  const isTablet = useMediaQuery('(min-width: 48em)');
  const isDesktop = useMediaQuery('(min-width: 75em)');
  const slidesPerView = isDesktop ? 3 : isTablet ? 2 : 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: slidesPerView });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit({ slidesToScroll: slidesPerView });
  }, [emblaApi, slidesPerView]);

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={3}>Слайды</Title>
        <AddSlideButton />
      </Group>

      {slides.length === 0 ? (
        <Card withBorder radius="md" padding="lg" mih={130} className={styles.emptyState}>
          <Text c="dimmed" ta="center">
            Пока нет слайдов. Добавьте первый.
          </Text>
        </Card>
      ) : (
        <>
          <Group gap="sm" wrap="nowrap" align="center">
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Предыдущий слайд"
              disabled={!canScrollPrev}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <IconChevronLeft size={20} />
            </ActionIcon>

            <div className={styles.viewport} ref={emblaRef}>
              <div className={styles.container}>
                {slides.map((slide) => (
                  <div className={styles.slide} key={slide.id}>
                    <Card withBorder radius="md" padding="lg" h="100%" mih={130}>
                      <Stack gap="xs" h="100%">
                        <Group justify="space-between" wrap="nowrap">
                          <Title order={4}>{slide.title}</Title>
                          <DeleteSlideButton slideId={slide.id} slideTitle={slide.title} />
                        </Group>
                        <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
                          {slide.annotation || 'Без аннотации'}
                        </Text>
                        <Badge
                          color={slide.isChecked ? 'teal' : 'gray'}
                          variant="light"
                          w="fit-content"
                        >
                          {slide.isChecked ? 'Проверено' : 'Не проверено'}
                        </Badge>
                      </Stack>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Следующий слайд"
              disabled={!canScrollNext}
              onClick={() => emblaApi?.scrollNext()}
            >
              <IconChevronRight size={20} />
            </ActionIcon>
          </Group>

          <Group justify="center" gap={6}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Перейти к странице ${index + 1}`}
                className={styles.dot}
                data-active={index === selectedIndex || undefined}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </Group>
        </>
      )}
    </Stack>
  );
}
