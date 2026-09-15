import { Container } from '@mantine/core';

import { Header } from '@/widgets/header';
import { SlideCarousel } from '@/widgets/slide-carousel';

export function HomePage() {
  return (
    <Container size="lg">
      <Header />
      <SlideCarousel />
    </Container>
  );
}
