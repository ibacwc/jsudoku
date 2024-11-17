
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
	for(let x=0; x<9;++x){
		numbers[x] = new Array();
		for(let y = 0;y<9;++y){
			numbers[x][y]=0;
		}
	}
	for(let x=0; x<9;++x){
		for(let y = 0;y<9;++y){
			if(!valid_pos(numbers, numbers[x][y], x, y)){
				numbers[x][y] = 0;
			}
		}
	}
}

function solve_sudoku(grid, row, column){
	if (row==9){
		return true;
	}else if(column == 9){
		return solve_sudoku(grid, row+1, 0);
	}else if(grid[column][row] != 0){
		return solve_sudoku(grid, row, column+1);
	}else{
		for(let n = 1; n<10; ++n){
			if(valid_pos(grid, n, column, row)){
				grid[column][row] = n;
				if(solve_sudoku(grid, row, column+1)){
					return true;
				}
				grid[column][row]=0;
			}
		}
		return false;
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

function valid_pos(grid, num, x, y){
	for(let i = 0; i<9; ++i){
		if(i != x && num == grid[i][y]){
			return false;
		}
	}
	for(let i = 0; i<9; ++i){
		if(i != y && num == grid[x][i]){
			return false;
		}
	}
	let square = [Math.floor(x/3)*3, Math.floor(y/3)*3];
	for(let i = square[0]; i<square[0]+3; ++ i){
		if (i == x){
			continue;
		}
		for (let j = square[1]; j < square[1] + 3; ++j){
			if (j == y){
				continue;
			}
			if(num == grid[i][j]){
				return false;
			}
		}
	}
	return true;
}

generate_sudoku();
window.requestAnimationFrame(game_loop);
solved = solve_sudoku(numbers, 0,0);
function game_loop(){
	render();
	window.requestAnimationFrame(game_loop);
}
