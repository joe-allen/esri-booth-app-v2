<script lang="ts">
	// svelte
	import { goto } from '$app/navigation';

	// ui
	import { SidepanelIndustries, Content } from '$lib';

	let { data } = $props();
	// import data from './assets/content/industries.json';

	function navigateToIndustry(id: string) {
		if (PUBLIC_BUILD_TARGET === 'tauri') {
			window.location.href = `industries/${id}.html`;
		} else {
			goto(`industries/${id}`);
		}
	}
</script>

<!-- THIS WONT WORK ON TAURI DEV: -->
<!-- Welcome, select an
{#if PUBLIC_BUILD_TARGET === 'tauri' || PUBLIC_BUILD_TARGET === 'static'}
	<a href="industries.html">industry.html</a>.
{:else}
	<a href="industries">industry</a>.
{/if} -->

<SidepanelIndustries {data} />
<Content cn="pt-6">
	<h1 class="text-white">
		HOME Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit esse quas neque veniam illo
		doloribus qui omnis. Voluptatem inventore repudiandae cumque vitae facere quisquam, quam soluta,
		ratione, labore culpa iure. Id, temporibus non aspernatur doloribus necessitatibus beatae
		voluptates velit veritatis aut animi ipsum quibusdam asperiores corrupti, repellat mollitia
		aperiam. Ex, eveniet molestiae! Incidunt asperiores ducimus facilis corrupti iusto natus rem!
		Eos exercitationem provident numquam quaerat? Dolorem neque dolorum minima? Provident molestiae,
		tempora aut aliquam labore deserunt tenetur et earum repellat voluptas ducimus minus corrupti
		ipsa consequuntur neque id eius ipsam! Facilis quas ipsam officia quasi dolor, perspiciatis
		maxime deleniti porro necessitatibus modi at unde ducimus fugiat accusamus veniam illo nobis
		vel! Doloremque inventore recusandae eius neque, deleniti tempora molestias a. Inventore amet
		voluptates rem reprehenderit, maiores assumenda hic perspiciatis. Fugit sunt placeat adipisci
		eveniet, sequi sed asperiores! Tenetur, officia sequi, voluptatibus aperiam ab distinctio vero
		autem consectetur natus molestiae ut? Consequatur magnam eos ut culpa debitis, voluptatem
		dignissimos, aut placeat illo iure ea eveniet laborum modi possimus quam ipsum? Nostrum nihil,
		tempora debitis necessitatibus consequatur placeat! Eos libero veniam earum! Cupiditate ipsam
		laborum, magni atque ullam, magnam facilis sint amet omnis corrupti, dolore architecto ratione!
		Quidem omnis temporibus, rerum adipisci consequuntur ullam nam quibusdam quo numquam ab
		explicabo vero optio. Illo illum odio iusto accusamus ipsum velit ipsam voluptates distinctio
		impedit veniam eos aliquam provident quis, nostrum reiciendis ratione itaque obcaecati quod
		molestiae in tempora iure quaerat? Magni, beatae ab. Error nihil et consequuntur necessitatibus,
		tenetur unde magnam quis dolor, consectetur dolorum doloremque odit, totam eaque ipsum eius
		debitis? Itaque dolores veritatis, esse praesentium iste saepe corporis impedit? Possimus, amet.
		Blanditiis, nam, error quae tempore alias placeat dolor totam odit velit ipsa, consectetur
		laboriosam sint! Amet, velit delectus? Laboriosam culpa repellat saepe iusto ex esse ut optio
		iste itaque iure? Illo ut, labore explicabo hic provident at voluptatibus fuga quisquam adipisci
		ducimus voluptas quo cum repellendus ipsam! Nesciunt deleniti ipsum dolor quos beatae fuga. Quos
		aperiam dolorum praesentium eos sed. Blanditiis, laboriosam maiores! Obcaecati ea sunt eaque
		necessitatibus! Inventore officia commodi amet? Accusamus velit voluptates quo illum, cumque
		aliquam est, numquam molestiae pariatur debitis quos nesciunt veritatis, temporibus minima
		dolores?
	</h1>
</Content>
