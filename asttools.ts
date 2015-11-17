var traverser= require("estraverse");

export = function countTypes(typename:string,ast)
{
	var count = 0;
	traverser.traverse(ast,{
		enter:(node,parent)=>{
			if(node.type == typename)
				count++;
		}
	})
	return count;
}