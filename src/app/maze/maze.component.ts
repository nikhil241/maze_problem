import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Maze } from './models/maze';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit,AfterViewInit {


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.maze.move(event.key)){
      setTimeout(()=>{
        alert('You Won')
      },0)

      
     
    }
    this.steps = this.maze.steps 
  }
  private canvas: HTMLCanvasElement;
  private maze:Maze;
  rows:number = 10;
  cols:number = 10;
  length = 50;
  steps:number=0;
  constructor() { }

  setValue(){
    this.drawMaze()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    
  }

  drawMaze(){
    this.maze = new Maze(this.rows,this.cols)
    this.canvas.width = this.cols * this.length;
    this.canvas.height = this.rows * this.length;
    
    this.maze.draw(this.canvas,this.length)
  }

}
