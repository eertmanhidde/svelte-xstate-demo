<script>
  export let state;
  export let send;

  import AlertMessage from '$lib/components/alert-message.svelte';

  function handleInputChange({target}) {
    send({type: 'AGE_CHANGED', value: target.value})
  }
</script>

<section>
  <h1>Age plz</h1>
  <input value={state.context.age} on:input={handleInputChange} type="number">
  <div>
    <button on:click={() => send({type: 'PREV'})}>Previous</button>
    <button on:click={() => send({type: 'NEXT'})}>Next</button>
  </div>

  {#if state.matches('age.ageTooLow')}
    <AlertMessage type="error">
      Aren't you a lil yung?
    </AlertMessage>
  {/if}

  {#if state.matches('age.ageTooHigh')}
    <AlertMessage type="error">
      Arent you supposed to be dead?
    </AlertMessage>
  {/if}

  {#if state.matches('age.ageCorrect')}
    <AlertMessage>
      Alrighty m8, u valid!
    </AlertMessage>
  {/if}
</section>
