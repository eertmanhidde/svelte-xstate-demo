<script>
  export let type = 'success';
</script>

<div class="alert-message alert-message--{type}">
  <slot />
</div>

<style>
  .alert-message {
    color: white;
  }

  .alert-message--error {
    background: red;
  }

  .alert-message--success {
    background: green;
  }
</style>
