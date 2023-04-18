import { createMachine } from 'xstate';

export const formMachine = createMachine({
  id: 'form',
  initial: 'name',
  context: {
    maxStep: 1,
  },
  states: {
    name: {},
    age: {},
    avatar: {},
  }
});
