<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";

  let records: object = $state({});

  onMount(async () => {
    records = await pb.collection("conferences").getList(1, 20, {});
    console.log("records", records);
  });
</script>

<h1>Conferences</h1>
{#if records}
  {#each records.items as record}
    <div>
      <h2>{record.title}</h2>
    </div>
  {/each}
{/if}
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>
