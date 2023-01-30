

Problem solving 
solution 


function rotateLeft(array, num){
for (let i = 0; i < num ; i ++ ){
array.push(array.shift());
}
return array ;
}
