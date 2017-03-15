
 export default function getElementTndex(node){
	 var i = 1;
	 while (node = node.previousElementSibling){ ++i }
	 return i
 }