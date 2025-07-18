import {
  MagicWarriorClass,
  MagicWarriorFunc,
  WarriorClass,
  WarriorFunc,
} from './index.js';

const implementations = [
  {
    name: 'class',
    Warrior: WarriorClass,
    MagicWarrior: MagicWarriorClass,
    construct: (Ctor, atk, mgc) =>
      mgc !== undefined ? new Ctor(atk, mgc) : new Ctor(atk),
  },
  {
    name: 'function',
    Warrior: WarriorFunc,
    MagicWarrior: MagicWarriorFunc,
    construct: (Ctor, atk, mgc) =>
      mgc !== undefined ? new Ctor(atk, mgc) : new Ctor(atk),
  },
];

implementations.forEach(({ name, Warrior, MagicWarrior, construct }) => {
  describe(`${name} implementation`, () => {
    test('Warrior attack returns double atk', () => {
      const w = construct(Warrior, 10);
      expect(w.attack()).toBe(20);
    });

    test('MagicWarrior attack includes mgc', () => {
      const m = construct(MagicWarrior, 10, 5);
      expect(m.attack()).toBe(25);
    });

    test('MagicWarrior attack works with zero mgc', () => {
      const m = construct(MagicWarrior, 8, 0);
      expect(m.attack()).toBe(16);
    });

    test('Warrior with 0 atk returns 0', () => {
      const w = construct(Warrior, 0);
      expect(w.attack()).toBe(0);
    });

    test('MagicWarrior with negative values still works', () => {
      const m = construct(MagicWarrior, -5, -3);
      expect(m.attack()).toBe(-13);
    });
  });
});
