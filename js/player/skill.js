import DataBus from '../databus'
import Sprite from '../base/sprite'


let databus = new DataBus()
const SKILL_IMG_SRC = 'images/bullet.png'
const SKILL_WIDTH = 16
const SKILL_HEIGHT = 30

export default class Skill extends Sprite {
  constructor(color) {
    super(SKILL_IMG_SRC, SKILL_IMG_SRC, SKILL_IMG_SRC)
    this.name = "加速";
    this.duration = 300;
    this.cur_time = 0;
    this.degree = color;
  }

  init(name,degree) {
    this.name = name
    this.cur_time = 0;
    this.degree   = degree;
    
  }

  // 每一帧更新时间
  update() {
  

    this.cur_time++;
   
  }
}
