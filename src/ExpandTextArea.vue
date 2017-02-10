<template>
<div id = "expandTextArea">
	<article id = "text">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis libero id nunc porttitor posuere. Maecenas pellentesque massa massa. Duis aliquam dui in venenatis vulputate. Etiam eu nisi nunc. Fusce fermentum elit ut erat rutrum lacinia. Sed gravida tincidunt nulla, venenatis tristique sem cursus a. Donec malesuada varius nulla et hendrerit. Nunc nec ipsum metus.

	Nullam eu commodo mauris, eget placerat mauris. Sed ullamcorper, ligula et volutpat gravida, lacus mi efficitur dolor, nec euismod diam lacus nec dolor. Donec felis mi, placerat eu sapien ac, egestas vehicula quam. Proin nunc erat, hendrerit in enim sit amet, mollis luctus nisl. Aliquam quis convallis nisl. Aliquam rhoncus euismod elementum. Nam semper nulla sapien, nec placerat ante varius id. Integer quis sapien vitae libero congue porttitor. Proin cursus at mi nec mollis. Nunc sed auctor nunc, lacinia lacinia eros. Integer eros mi, ullamcorper vel vehicula non, vulputate ullamcorper velit.
	</article>
	</div>
</template>

<script>
export default {
	name: 'ExpandTextArea',
	data(){
		return {

		}
	}
}
</script>

<style scoped>
#expandTextArea{
	position: fixed;
	width: 50%;
	height: 80%;
	right: 0; top: 0; bottom: 0;
	margin: auto auto;
	border: 3px red solid;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

	#text {
		position: absolute;
		padding: 2rem;
		box-sizing: border-box;
		/*border: 1px green solid;*/

	}
</style>