<script>
  import { useMachine } from '@xstate/svelte';
  import {formMachine} from '$lib/machines/form-machine';

  const { state, send } = useMachine(formMachine);
</script>

{JSON.stringify($state.value)}

