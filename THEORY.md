## Теоретическая часть

### Вопрос 1. Дженерики: определение, отличие от any, пример с ограничением

`Дженерик` это обобщённый тип данных (без привязки к конкретному типу заранее, но даёт понимание,
что как на входе, так и в возвращаемых данных типы будут совпадать), значение типа проставляется в момент вызова кода.
Позволяет избежать дублирования.

`any` просто выключает проверку типов. Ошибка будет видна, когда код уже упадёт в рантайме.

```ts
function getCoords<T>(arr: T[]): T {
  return arr[0];
}

getCoords([55.755864, 55.755864]); // вернёт number
getCoords(['55.755864', '55.755864']); // вернёт string

function firstAny(arr: any[]): any {
  return arr[0];
}
firstAny([1, 2, 3]);  // тип потерян, просто any
```

Ограничение (`extends`) нужно, когда дженерик не может быть совсем любым типом - у него должно быть хотя бы какое-то свойство:

```ts
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number) {
  return items.find((item) => item.id === id);
}

findById([{ id: 1, title: 'a' }], 1); // ок
findById([{ title: 'a' }], 1);        // ошибка - нет поля id
```

## Вопрос 2. type vs interface: различия, критерии выбора, extends

Оба нужны, чтобы описать форму объекта, и в простых случаях работают одинаково. Разница в деталях.

`interface` умеет только описывать объекты (и формы классов/функций).

`type` шире - им можно назвать объединение, пересечение, кортеж, примитив, вообще что угодно.

Ещё одна разница - `interface` можно объявить несколько раз с одним и тем же именем,
и TypeScript просто сложит все поля вместе (это называется declaration merging).
С `type` так не получится - будет ошибка о повторном объявлении.

Расширение тоже выглядит по-разному: у `interface` есть `extends`, у `type` для этого
используют пересечение `&`. На практике `extends` даёт более понятную ошибку, если поля конфликтуют,
а `&` в случае конфликта просто схлопывает свойство в `never`.

```ts
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

type AnimalT = { name: string };
type DogT = AnimalT & { breed: string };
```

Когда что выбирать:

`interface` - если это форма объекта или пропсы компонента, и её потенциально нужно
будет расширять.

`type` - если нужен union, пересечение, тип для примитива или
что-то посложнее (mapped/conditional типы)

## Вопрос 3. Intersection и Union: разница, работа со свойствами, type guard

Union (`A | B`) значит будет либо одно, либо другое. Из-за этого напрямую можно использовать только те свойства,
которые есть у обоих вариантов. TypeScript не знает, какой именно вариант перед ним, пока мы это не проверим.

Intersection (`A & B`) значит будет и то, и другое одновременно. Итоговый объект содержит все поля из обоих типов сразу.

```ts
type A = { a: string };
type B = { b: number };

type U = A | B; // либо { a: string }, либо { b: number }
type I = A & B; // { a: string; b: number } - оба поля сразу

function useUnion(x: U) {
  // x.a - ошибка, потому что в B этого поля нет
}


function useIntersection(x: I) {
  x.a; // ок
  x.b; // ок
}
```

Чтобы безопасно работать со свойствами union, нужна проверка, которая сужает тип до конкретного варианта:

```ts
type  Response =
  | { status: 'success', data: string }
  | { status: 'error', message: string }

function handleResponse(response: Response) {
  if (response.status === 'success') {
    return response.data;
  }

  return response.message;
}
```

Поле `status` - это свойство, по которому TypeScript понимает, какой именно вариант union перед ним, и после проверки разрешает обращаться к полям именно этого варианта.

## Вопрос 4. Разбор типа KeysOfType

```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
```

Смысл этого типа - получить имена всех полей объекта T, тип которых подходит под U.

1. `[K in keyof T]` - это mapped type, он проходится по каждому ключу объекта `T` по очереди.
2. Для каждого ключа считается `T[K] extends U ? K : never` - если тип значения этого поля подходит под `U`,
то в качестве значения оставляем само имя ключа. Если не подходит - ставим `never`, то есть "пусто".
3. После этого шага получается промежуточный объект, где у нужных полей значение - это их же имя, а у ненужных - `never`.
4. `[keyof T]` в самом конце берёт все значения этого промежуточного объекта и собирает их в один union.
Значения `never` при этом просто пропадают, потому что `never` в объединении не занимает места.

В итоге остаются только имена тех полей, которые подошли под `U`.

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

type StringKeys = KeysOfType<User, string>;   // "name"
type BooleanKeys = KeysOfType<User, boolean>; // "isActive"
```

## Вопрос 5. Утилитарные типы: Partial, Pick, Omit, Record, Readonly

Это готовые трансформеры типов - не нужно писать их руками, TypeScript уже даёт их из коробки.

**Partial\<T\>** - делает все поля необязательными.
Пригождается, когда нужно частично обновить объект (patch), а не пересоздавать его целиком:

```ts
interface Slide {
  id: string;
  title: string;
  annotation: string;
}

function updateSlide(id: string, patch: Partial<Slide>) {
  // patch может прислать только title, или только annotation
}
```

**Pick\<T, K\>** - оставляет из типа только перечисленные поля.
Удобно, когда нужна облегчённая версия объекта:

```ts
type SlidePreview = Pick<Slide, 'id' | 'title'>; // только id и title
```

**Omit\<T, K\>** - убирает перечисленные поля, остальное оставляет.
Часто нужен для форм создания, где поле вроде `id` появляется само, а руками его не вводят:

```ts
type NewSlideInput = Omit<Slide, 'id'>; // всё, кроме id
```

**Record\<K, V\>** - строит объект-словарь: список ключей `K`, и у всех значение одного типа `V`.
Хорошо подходит для карт ключ-значение:

```ts
type SlideById = Record<string, Slide>;
type StatusLabels = Record<'checked' | 'unchecked', string>;
```

**Readonly\<T\>** - запрещает менять поля после создания объекта.
Полезно, когда нужно защититься от случайной мутации данных:

```ts
function freezeSlide(slide: Slide): Readonly<Slide> {
  return Object.freeze(slide);
}

const frozen = freezeSlide(slide);
frozen.title = 'new'; // TypeScript не даст так сделать
```
