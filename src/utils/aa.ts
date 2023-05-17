export function uuid():string{
	let d=new Date().getTime();
	const uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
		const r=(d+Math.random()*16) % 16 | 0;
		d=Math.floor(d/16);
		return (c==='x' ? r :(r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}
export function ise(e:any){//判断不为空
	if(e!==0){
		return !e||0===e.length||/^\s*$/.test(e) ||(Object===e.constructor && 0===Object.keys(e).length)||'undefined'===e||'null'===e;
	}else return false;
};