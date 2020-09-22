<script>
	import transform from './transform';
	let input = '';
	let output = '';
	let error;
	let status = {
		totalLines: 0,
		goodLines: 0,
		badLines: 0
	}
	let options = {
		lowerCaseMajor: {
			name: 'Lower Case Major',
			description: 'Should I remove capital letters from majors?',
			displayDefault: 'true',
			value: true
		},
		citiesOrderOfImportance: {
			name: 'Cities Order',
			description: 'The order to display cities in the output',
			displayDefault: 'Struthers, Campbell, Lowellville, Poland, Youngstown',
			value: ['Struthers', 'Campbell', 'Lowellville', 'Poland', 'Youngstown']
		},
		replace:{
			value: [{ for: 'Alanis Chew', city: 'Youngstown' }]
		}
	}

	function setOutput() {
		output = transform(input, options);
	}
</script>

<style>
	#converter {
		width: 80vw;
		height: 96vh;
		padding-top: 1em;
		padding-bottom: 1em;
	}

	#textInput, #textOutput {
		width: 80vw;
		height: 40vh;
	}

	#textInput {
		margin-bottom: 2em;
	}

	#inputHolder, #outputHolder {
		margin-top: 1em;
		display: flex;
	}
	#inputHolder > h2, #outputHolder > h2 {
		transform: rotate(-20deg);
		height: 2em;
	}

	#status {
		height: 2em;
	}
</style>

<div id="converter">
	<div id="inputHolder">
		<h2>Paste Here:</h2>
		<textarea
			bind:value={input}
			on:input={setOutput}
			id="textInput" 
			spellcheck="false" />
	</div>
	<div id="status">

	</div>
	<div id="outputHolder">
		<h2>Copy Here:</h2>
		<textarea
			bind:value={output}
			id="textOutput" 
			spellcheck="false" />
	</div>
</div>