import { cpuUsage } from "process";

export class Maze{
    public rows:number;
    public columns:number;
    public matrix;
    public devilImage;
    public godImage;
    public steps = 0
    public god_cords = []
    public number_of_devils
    public boxSize;
    public canvas:HTMLCanvasElement
    constructor(public nRow: number, public nCol: number) {
         this.columns = nCol
         this.rows = nRow
         this.matrix = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));

         
    }



    generateDevils(){
        let numOfDevils = this.rows>this.columns? this.columns:this.rows

        this.number_of_devils = numOfDevils


        let devils = 0

        while(devils<numOfDevils){
            var r = Math.floor(Math.random() * this.rows);
            var c = Math.floor(Math.random()*this.columns)

            if(this.matrix[r][c]==0){
                this.matrix[r][c]=1
                devils++;
            }
        }

        console.log(devils,this.number_of_devils)
    }

    generateGod(){
        let god_row =0 
        let god_column = 0
        if(this.rows % 2 == 0){
            god_row = this.rows/2
        }else{
            god_row = (this.rows+1)/2
        }

        if(this.columns % 2 == 0){
            god_column = this.columns/2
        }else{
            god_column = (this.columns+1)/2
        }

        this.matrix[god_row][god_column] = 2

        this.god_cords = [god_row,god_column]
    }

    move(key){
        console.log(key)
        let [row,column] = this.god_cords
         switch(key){
             case 'ArrowUp':
                 if(row>0){
                    row = row -1
                 
                    return this.checkMove(row,column)
                 }
                
                 break;
                 case 'ArrowDown':
                    if(row<(this.rows-1)){
                        row = row+1
                     
                        return this.checkMove(row,column)
                     }

                    break;
                    case 'ArrowLeft':

                        if(column>0){
                            column = column-1 
                         
                            return this.checkMove(row,column)
                         }
                        break;
                        case 'ArrowRight':

                            if(column<(this.columns-1)){
                                column = column+1 
                             
                                return this.checkMove(row,column)
                             }
                            break;    
         }
    }

    checkMove (row,column){
     this.steps++;
     let ctx = this.canvas.getContext('2d');
     
     
     
    
    var x = this.god_cords[1] * this.boxSize
    var y = this.god_cords[0] * this.boxSize
    
    
    
    ctx.clearRect(x, y, this.boxSize, this.boxSize)
    ctx.rect(x, y, this.boxSize, this.boxSize)
    ctx.stroke()
    this.god_cords = [row,column]
    x = column * this.boxSize;
    y = row * this.boxSize;
    ctx.drawImage(this.godImage,x,y,this.boxSize,this.boxSize) 
    
    if(this.matrix[row][column] == 1){

        this.matrix[row][column] = 0

         this.number_of_devils--;
     }
    if(this.number_of_devils<=0){
        return true
    }else{
        false
    }

    }

    


    draw(canvas: HTMLCanvasElement, boxSize =10, lineThickness = 2){
        this.canvas = canvas
        this.generateGod()
        this.generateDevils()
        console.log(this.matrix)
        var ctx = canvas.getContext('2d');
        this.boxSize = boxSize
        var god_url ='https://p1.hiclipart.com/preview/312/549/208/super-mario-icons-super-mario.jpg'
        var devil_url = 'https://image.freepik.com/free-vector/hannya-icon-cartoon-demon-mask_72107-100.jpg'
        var devil_image = new Promise((resolve,reject)=>{

            var img = new Image();
            img.onload = ()=>{
                this.devilImage = img;
                resolve(img)
              
            };
            img.src = devil_url;

        })

        var god_image  = new Promise((resolve,reject)=>{

            var img = new Image();
            img.onload = ()=>{
                this.godImage = img;
                resolve(img)
              
            };
            img.src = god_url;

        })
        Promise.all([devil_image,god_image]).then(()=>{
            ctx.beginPath()
            ctx.fillStyle ="white"
            ctx.lineWidth = lineThickness
            ctx.strokeStyle = 'black'
            for( var row = 0; row < this.matrix.length;row++){
                for (var column = 0; column < this.matrix[row].length; column++) {
                    var x = column * boxSize;
                    var y = row * boxSize;
                 
                    
                    ctx.rect(x, y, boxSize, boxSize);
                   
                    if(this.matrix[row][column] == 1 ){
                        ctx.drawImage(this.devilImage,x,y,boxSize,boxSize)
                    }
                    if(this.matrix[row][column] == 2 ){
                        ctx.drawImage(this.godImage,x,y,boxSize,boxSize)
                    }
                   
                   
                   
                    
                    ctx.stroke();
                  }
            }
            ctx.closePath()
        })
      
        

    }

}