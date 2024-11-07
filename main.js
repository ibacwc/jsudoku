
var canvas = document.getElementById("sudoku_board");
const WIDTH=canvas.width;
const HEIGHT=canvas.height;
const ROW_HEIGHT = WIDTH/9;
const COL_WIDTH = HEIGHT/9;
var ctx = canvas.getContext("2d");
ctx.lineWidth=1;
ctx.font = "48px Ubuntu";
let numbers = new Array();
let solved = false

function generate_sudoku(){
	solved = true;
	for(let x=0; x<9;++x){
		numbers[x] = new Array();
		for(let y = 0;y<9;++y){
			numbers[x][y]=Math.floor(Math.random() * (9-1) + 1);
		}
	}
	for(let x=0; x<9;++x){
		for(let y = 0;y<9;++y){
			if(!valid_pos(x,y)){
				numbers[x][y] = 0;
				solved = false;
			}
		}
	}
}
//recursive death
function solve_sudoku(){
	while(!solved){
		generate_sudoku();
	}
}

function render(){
	//render clear
	ctx.clearRect(0,0,WIDTH, HEIGHT);
	//grid
	for(let x=0; x<WIDTH; x+=COL_WIDTH){
		if((x) % (COL_WIDTH*3) == 0){
			ctx.strokeStyle="white";
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
			ctx.strokeStyle="white";
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
	//numbers...
	ctx.fillStyle="white";
	for(let x=0; x<9;++x){
		for(let y = 0;y<9;++y){
			if(numbers[x][y] != 0){
				ctx.fillText(numbers[x][y],(x*COL_WIDTH)+(COL_WIDTH/4), (y+1)*ROW_HEIGHT-(ROW_HEIGHT/5))
			}
		}
	}
}
generate_sudoku();

function valid_pos(x, y){
	for(let i = 0; i<9; ++i){
		if(i != x && numbers[x][y] == numbers[i][y]){
			return false;
		}
	}
	for(let i = 0; i<9; ++i){
		if(i != y && numbers[x][y] == numbers[x][i]){
			return false;
		}
	}
	let square = [Math.floor(x/3)*3, Math.floor(y/3)*3];
	for(let i = square[0]; i<square[0]+3; ++ i){
		for (let j = square[1]; j < square[1] + 3; ++j){
			if(x != i && y != j && numbers[x][y] == numbers[i][j]){
				return false;
			}
		}
	}
	return true;
}

window.requestAnimationFrame(game_loop);
function game_loop(){
	render();
	solve_sudoku();
	window.requestAnimationFrame(game_loop);
}
