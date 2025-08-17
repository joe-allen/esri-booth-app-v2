<script lang="ts">
  import initPocketBase from "$lib/pocketbase";
  import { onMount } from "svelte";

  let records: object = $state({});
  let pb: object | null = $state({});

  onMount(async () => {
    if (navigator.onLine) {
      pb = initPocketBase("https://aecdemo.pockethost.io/");
    } else {
      pb = initPocketBase("http://127.0.0.1:8090/");
    }
    console.log("pb", pb);
    records = await pb.collection("conferences").getList(1, 20, {});
    console.log("records", records);
  });
</script>

<h1>Conferences:</h1>
{#if records}
  {#each records.items as record}
    <div>
      <h2>{record.title}</h2>
    </div>
  {/each}
{/if}
<p>
  Visit the <a target="_blank" href="http://127.0.0.1:8090/_/#/login"
    >Admin area</a
  >.
</p>
