import { create } from 'zustand';
import { readStorage, writeStorage } from '@/shared/lib/storage';

const SLIDES_KEY = 'slides';

export interface Slide {
  id: string;
  title: string;
  annotation: string;
  isChecked: boolean;
}

const initialSlides: Slide[] = [
  {
    id: '1',
    title: 'Онбординг',
    annotation: 'Знакомство пользователя с продуктом',
    isChecked: true,
  },
  { id: '2', title: 'Каталог', annotation: 'Поиск и фильтрация товаров', isChecked: false },
  {
    id: '3',
    title: 'Корзина',
    annotation: 'Оформление заказа в несколько шагов',
    isChecked: false,
  },
  { id: '4', title: 'Оплата', annotation: 'Поддержка нескольких способов оплаты', isChecked: true },
];

interface SlideState {
  slides: Slide[];
  addSlide: (data: Pick<Slide, 'title' | 'annotation' | 'isChecked'>) => void;
  removeSlide: (id: string) => void;
}

export const useSlideStore = create<SlideState>((set, get) => ({
  slides: readStorage(SLIDES_KEY, initialSlides),
  addSlide: (data) => {
    const slide: Slide = { id: crypto.randomUUID(), ...data };
    const slides = [...get().slides, slide];
    writeStorage(SLIDES_KEY, slides);
    set({ slides });
  },
  removeSlide: (id) => {
    const slides = get().slides.filter((slide) => slide.id !== id);
    writeStorage(SLIDES_KEY, slides);
    set({ slides });
  },
}));
