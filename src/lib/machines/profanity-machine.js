import { browser } from '$app/environment';
import { inspect } from '@xstate/inspect';

if (browser) {

  inspect({
    // options
    // url: 'https://stately.ai/viz?inspect', // (default)
    iframe: false // open in new window
  });
}
import { createMachine, interpret } from 'xstate';

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// this will fail randomly
function validateAvatar(base64Image) {

  // Do something with image
  console.log(base64Image);

  return new Promise((resolve, reject) => {
    const rndInt = randomIntFromInterval(0, 10)

    setTimeout(() => {
      if (rndInt > 5) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  })
}

const profanityMachine = createMachine({
  id: 'profanity',
  initial: 'idle',
  states: {
    idle: {},
    checking: {
      invoke: {
        id: 'checker',
        src: (_, event) => validateAvatar(event.value),
        onDone: {
          target: 'success'
        },
        onError: {
          target: 'failure',
        },
      },
    },
    success: {
      type: 'final',
    },
    failure: {},
  },
  on: {
    CHECK: {
      target: 'checking'
    }
  }
});

export const profanityService = interpret(profanityMachine, { devTools: true }).start();
