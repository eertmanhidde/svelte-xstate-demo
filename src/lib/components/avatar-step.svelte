<script>
  import { onMount } from 'svelte';
  import { useMachine } from '@xstate/svelte';
  import { profanityService }  from '$lib/machines/profanity-machine';

  export let send;

  let dropArea;
  let input;
  let uploadedFileName = '';
  let uploadedFileBase64 = '';

    async function handleChange(e) {
      profanityService.send({type: 'CHECK'})
      const file = e.target.files[0];
      const base64 = await convertBase64(file)
      var fileName = file.name;
      uploadedFileBase64 = base64;
      uploadedFileName = fileName;
    };


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

  profanityService.onTransition(state => {
    if (state.value === 'success') {
      send({type: 'AVATAR_CHANGED', value: uploadedFileBase64 })
    }
  })

</script>

<section>
  {JSON.stringify($profanityService.value)}
  <h1>Avatar plz(no not the blue one!)</h1>
  <p>With profanity filter, so no nudes please</p>
    <div class="container">
  <div class="card">
    <h3>Upload Avatar</h3>
    <div bind:this={dropArea} class="drop_box">
        {#if uploadedFileName && uploadedFileBase64 && $profanityService.matches('success')}
          <h4><b>{uploadedFileName}</b></h4>
          <img src={uploadedFileBase64} width="100" alt="no clue what this is" />
        {:else if $profanityService.matches('checking')}
          loading...
        {:else}
          <header>
            <h4>Select File here</h4>
          </header>
          <input bind:this={input} on:change={handleChange} accept="image/png, image/jpeg" type="file" hidden id="fileID" style="display:none;">
          <button on:click={() => input.click()} class="btn">Choose File</button>
        {/if}

        {#if $profanityService.matches('failure')}
          <p style="color: red;">Something went wrong please attempt again!</p>
        {/if}
    </div>

  </div>
</div>

    <br>
    <br>

  <div>
    <button on:click={() => send({type: 'PREV'})}>Previous</button>
    <button on:click={() => send({type: 'NEXT'})}>Next</button>
  </div>
</section>

<style>
.container {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;
}

.card {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 600px;
  height: 260px;
  background-color: #ffffff;
  padding: 10px 30px 40px;
}

.card h3 {
  font-size: 22px;
  font-weight: 600;

}

.drop_box {
  margin: 10px 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #a3a3a3;
  border-radius: 5px;
}

.drop_box h4 {
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
}

.drop_box p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #a3a3a3;
}

.btn {
  text-decoration: none;
  background-color: #005af0;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: 0.3s;
}

.btn:hover{
  text-decoration: none;
  background-color: #ffffff;
  color: #005af0;
  padding: 10px 20px;
  border: none;
  outline: 1px solid #010101;
}
.form input {
  margin: 10px 0;
  width: 100%;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}

</style>
