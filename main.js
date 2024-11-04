
var canvas = document.getElementById("sudoku_board");
const WIDTH=canvas.width;
const HEIGHT=canvas.height;
const ROW_HEIGHT = WIDTH/9;
const COL_WIDTH = HEIGHT/9;
var ctx = canvas.getContext("2d");
ctx.lineWidth=1;

function generate_sudoku(){

}

function render(){
	//grid
	for(let x=0; x<WIDTH; x+=COL_WIDTH){
		if((x) % (COL_WIDTH*3) == 0){
			ctx.strokeStyle="black";
			ctx.lineWidth=2;
		}
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, HEIGHT);
		ctx.stroke();
		ctx.closePath();
		ctx.strokeStyle="#808080";
		ctx.lineWidth=1;
	}
	for(let y=0; y<HEIGHT; y+=ROW_HEIGHT){
		if(y % (ROW_HEIGHT*3) == 0){
			ctx.strokeStyle="black";
			ctx.lineWidth=2;
		}
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(WIDTH, y);
		ctx.stroke();
		ctx.closePath();
		ctx.strokeStyle="#808080";
		ctx.lineWidth=1;
	}
}
render();