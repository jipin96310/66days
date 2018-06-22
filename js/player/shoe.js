import DataBus from '../databus'
import advanceSprite from '../base/advanceSprite'
import Skill from './skill'

const SHOE_IMG_SRC_DEF = 'images/shoe_normal.png'
const SHOE_WIDTH_DEF = 25
const SHOE_HEIGHT_DEF = 26


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight



let databus = new DataBus()
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Shoe extends advanceSprite {
  constructor() {
    super(SHOE_IMG_SRC_DEF, SHOE_WIDTH_DEF, SHOE_HEIGHT_DEF)
    //this.name = 
    this.cur_time = 0;
    this.y = screenHeight - 116;
    this.duration = 600;
    

    var new_skill = new Skill(1);
    
    this.skill = new_skill;

    this.visible = true
  }

  init(color) {
    this.x = rnd(0, window.innerWidth - SHOE_WIDTH_DEF)
    
    //TODO
    var new_skill = new Skill(color);
    this.skill = new_skill;
    
    this.cur_time = 0
    //if(color !== 1)randomShoeGenerator(color);//根据'颜色'定义 degree  name等 color=degree init:1
  
    this.visible = true
  }


  randomShoeGenerator(color){
   // this.degree = color;
   
  }

  // 预定义爆炸的帧动画
 



  // 每一帧更新子弹位置
  update() {
   
    this.cur_time ++
  
    if (this.cur_time >= this.duration){
      databus.removeShoes(this);
      
      
      }
  
  }
}
