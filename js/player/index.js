import Sprite   from '../base/sprite'
import Bullet   from './bullet'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/normal_player_left.png'
const PLAYER_WIDTH   = 52
const PLAYER_HEIGHT  = 90


let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - 180


   
    this.cur_type = 0;
    
    

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    this.speed   = 8

    this.lastX = this.x //记录上个时刻X

   this.skills = []
   
   

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2


    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if (disY < screenHeight - 180 )
      disY = screenHeight - 180

    else if (disY > screenHeight - 180 )
      disY = screenHeight - 180

    this.x = disX
    this.y = disY

    if (this.x < this.lastX) this.cur_type = 0;
    else if (this.x > this.lastX) this.cur_type = 1;
    else this.cur_type = 0;



    this.lastX = disX
  }
//get new skill
  getNewSkill(skill) {

    var skills = this.skills
    var haveSkill = false;
    for (let i = 0, il = skills.length; i < il; i++) {
      let cur_skill = skills[i]

      if (cur_skill.name == skill.name) {
        this.skills.splice(i, 1);

        this.skills.push(skill);
        haveSkill = true;

        
        break
      }

    }


    if (haveSkill == false) this.skills.push(skill);



    this.startSkill(skill)
  }





  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    
  
    


    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      //
      if ( this.checkIsFingerOnAir(x, y) ) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this))
   
    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      


      let x = e.touches[0].clientX
    
      
      let y = e.touches[0].clientY


     

      if ( this.touched ){


        this.setAirPosAcrossFingerPosZ(x, y)
       
      
      }
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      //TEST
      this.touched = false
    }).bind(this))
  }

  //Function(): change the current player image resource
  changeImg(){
    var temp = this.cur_type;
    switch(temp){
      case 0: 
      this.img.src = "images/normal_player_left.png";
      break;
      case 1:
      this.img.src = "images/normal_player_left_1.png";
      break;
      case 2:
      this.img.src = "images/normal_player_right.png";
      break;
      case 3:
      this.img.src = "images/normal_player_right_1.png";


    }


  }
  
  


  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    let bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet)
  }
  startSkill(skill){
    var skillName = skill.name;
    var degree = skill.degree;

    switch(skillName){
      case "加速":
           this.speed = 8*(degree+1);
           break;
      case "无敌":
      break;


    }


  }
  stopSkill(skill){
    var skillName = skill.name;
    switch (skillName) {
      case "加速":
        this.speed = 8;
        break;
      case "无敌":
        break;


    }



  }
  

}
