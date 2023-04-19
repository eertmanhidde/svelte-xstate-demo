<script>
  export let state;
  export let send;

  function handleInputChange({target}) {
    send({type: 'NAME_CHANGED', value: target.value})
  }
</script>

<section>
  <h1>Name plz?</h1>
  <input value={state.context.name} on:input={handleInputChange} type="text">
  <div>
    <button on:click={() => send({type: 'NEXT'})}>Next</button>
  </div>
</section>
