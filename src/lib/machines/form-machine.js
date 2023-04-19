
    import { browser } from '$app/environment';
import { inspect } from '@xstate/inspect';

    if (browser) {

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false // open in new window
});
    }
import { createMachine, interpret, assign, actions, raise, spawn } from 'xstate';
const { pure } = actions;

const getAgeEvent = (age) => {
  if (!age) return 'BACK_TO_IDLE';

  if (age < 18) return 'AGE_TOO_LOW';

  // Current oldest person is 166, source: https://en.wikipedia.org/wiki/List_of_the_verified_oldest_people
  if (age > 166) return 'AGE_TOO_HIGH';

  return 'AGE_CORRECT';
}

const nameIsValid = (context) => {
  return context.name !== '' && context.name.length > 1;
}

const formMachine = createMachine({
  id: 'form',
  initial: 'name',

  context: {
    name: '',
    age: '',
    avatar: '',
    profanityActor: null,
  },
  states: {
    name: {
      on: {
        NEXT: {
          target: 'age',
          cond: nameIsValid,
        },
        NAME_CHANGED: {
          actions: assign({
            name: (_, event) => event.value
          })
        }
      }
    },
    age: {
      onEntry: pure((context) => {
        return raise({ type: getAgeEvent(context.age)});
      }),
      initial: 'idle',
      states: {
        idle: {},
        ageTooLow: {},
        ageCorrect: {},
        ageTooHigh: {},
      },
      on: {
        PREV: 'name',
        NEXT: {
          target: 'avatar',
          cond: (context) => getAgeEvent(context.age) === 'AGE_CORRECT',
        },
        AGE_CHANGED: {
          actions: pure((_, event) => {
            const actions = [
              assign({
                age: event.value,
              }),
              raise({ type: getAgeEvent(event.value) }),
            ];

            return actions;
          }),
        },
        AGE_TOO_LOW: {
          target: '.ageTooLow',
        },
        AGE_CORRECT: {
          target: '.ageCorrect',
        },
        AGE_TOO_HIGH: {
          target: '.ageTooHigh',
        },
        BACK_TO_IDLE: {
          target: '.idle',
        },
      }
    },
    avatar: {
      on: {
        PREV: 'age',
        NEXT: {
          target: 'final',
          cond: (context) => context.avatar !== '',
        },
        AVATAR_CHANGED: {
          actions: assign({
            avatar: (_, event) => event.value
          })
        }
      },
    },
    final: {},
  }
});

export const formService = interpret(formMachine, {devTools: true}).start();
