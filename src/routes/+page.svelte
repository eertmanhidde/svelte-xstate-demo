<script>
  import { browser } from '$app/environment';
  import NameStep from '$lib/components/name-step.svelte';
  import AgeStep from '$lib/components/age-step.svelte';
  import AvatarStep from '$lib/components/avatar-step.svelte';
  import { formService } from '$lib/machines/form-machine';

  function handleClick(e) {
    formService.send({type: 'NEXT'})
  }
</script>


<main>
  <marquee>Creating an Untapped account</marquee>

  {#if $formService.matches('name')}
    <NameStep state={$formService} send={formService.send} />
  {/if}

  {#if $formService.matches('age')}
    <AgeStep state={$formService} send={formService.send} />
  {/if}

  {#if $formService.matches('avatar')}
    <AvatarStep state={$formService} send={formService.send} />
  {/if}

  {#if $formService.matches('final')}
    <h1>Thanks for signing up!</h1>
    <dl>
     <dt><b>Name</b></dt>
     <dd>{$formService.context.name}</dd>
     <dt><b>Age</b></dt>
     <dd>{$formService.context.age}</dd>
     <dt><b>avatar</b></dt>
     <dd>
        <img src={$formService.context.avatar} alt="idk">
      </dd>
    </dl>
  {/if}
</main>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
</style>
