import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

import Shoe from './player/shoe'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
/**
 * 游戏主函数
 */

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
      // 加速计启动
    this.accelerometerListener = wx.onAccelerometerChange(function (res) {
      console.log(this.player.cur_type);
      if (res.x < 0 && this.player.x > 0) {
        this.player.x -= this.player.speed;
        //判断是否是与之前同一方向
        if (this.player.cur_type >= 2) {
          this.player.cur_type = 0
        } else {
          this.player.cur_type == 0 ? this.player.cur_type = 1 : this.player.cur_type = 0;
        }


      }
      else if (res.x > 0 && this.player.x < screenWidth - this.player.width) {
        this.player.x += this.player.speed;


        if (this.player.cur_type < 2) {
          this.player.cur_type = 2
        } else {
          this.player.cur_type == 2 ? this.player.cur_type = 3 : this.player.cur_type = 2;
        }


      }

    }.bind(this))

    wx.stopAccelerometer(this.accelerometerListener)


   this.restart()
  }

  restart() {
    //this.player



   


    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    
    this.stopHandler = this.stopEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.stopHandler)
   

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false


    //var player = this.player;
    
    //stop button here
 

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  /

    wx.startAccelerometer(this.accelerometerListener)
   




  }
  // stop frame and change gameStop to true
  stop() {
    databus.gameStop = true;
    databus.frame++


    this.update()
    this.render()
    window.cancelAnimationFrame(this.aniId);
   
   

  }
  // resume frame and gameStop return to false
  resume(){
    databus.gameStop = false;
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    
  }






  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    var cur_frame = databus.frame;
    

    if (cur_frame<1000&&cur_frame % 50 === 0) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(3)
      databus.enemys.push(enemy)
    } else if (cur_frame >= 1000 && cur_frame < 3000 && cur_frame % 30 === 0){
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6)
      databus.enemys.push(enemy)

    } else if (cur_frame >= 3000  && cur_frame % 10 === 0){
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(9)
      databus.enemys.push(enemy)

    }
  }


  /**
   * 随着帧数变化的道具鞋子生成逻辑
   * 帧数取模定义成生成的频率
   */
  shoeGenerate() {


    if (databus.frame % 800 === 0) {
      let shoe = databus.pool.getItemByClass('shoe', Shoe)

      shoe.init(2)
      databus.shoes.push(shoe)
    }
  }


  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.enemys.length; i < il; i++) {
        let enemy = databus.enemys[i]

        if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.playAnimation()
          that.music.playExplosion()

          bullet.visible = false
          databus.score += 1

          break
        }
      }
    })

    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]

      if (this.player.isCollideWith(enemy)) {
        enemy.playAnimation()
        that.music.playExplosion()

        //TODO
        
        databus.hp -= 10; //-10 for each enemy
        
        if(databus.hp<=0)
        {
          databus.gameOver = true
          
          }
        break;
        
      }
    }
//道具鞋子 碰撞检测
    for (let i = 0, il = databus.shoes.length; i < il; i++) {
      let shoe = databus.shoes[i]

      if (this.player.isCollideWith(shoe)) {
        var skill = shoe.skill
        //skill.bindPlayer(this.player);
        this.player.getNewSkill(skill)


        //need to be at databus, temp location
        

        
        databus.removeShoes(shoe)
      
      
      }
    }



  }


  //全局玩家技能检测
  









  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }
  //游戏暂停触摸事件处理
  stopEventHandler(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.stopArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY
      && !databus.gameStop
      )
      this.stop()
    else if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY
      && databus.gameStop
    )
     this.resume()

  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

   this.bg.render(ctx)

    databus.bullets
      .concat(databus.enemys)
      .concat(databus.shoes)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    
  
    
  
   
    this.player.drawToCanvas(ctx)
   // console.log(this.player.x);

   // databus.animations.forEach((ani) => {
   //   if (ani.isPlaying) {
    //    ani.aniRender(ctx)
    //  }
   // })



   
   // this.gameinfo.renderGameScore(ctx, databus.score)
    this.gameinfo.renderGameTime(ctx,databus.time)
    this.gameinfo.renderHp(ctx,databus.hp)
    this.gameinfo.renderSkillName(ctx, this.player.skills)
    this.gameinfo.renderGameStop(ctx,databus.gameStop)
    // 游戏结束停止帧循环  + game stop




    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)
      wx.stopAccelerometer(this.accelerometerListener)
      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
        
      }

      canvas.removeEventListener(
        'touchstart',
        this.stopHandler
      )
    }
// bind stop listener
  
    
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    //this.bg.update()


     

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update()
      })


    databus.shoes.forEach((item) => {
      item.update()
    })
    databus.skills.forEach((item) => {
      item.update()
    })
    this.player.changeImg();//更改游戏人物图片

    //check skill remaining time
var skills = this.player.skills;
for(let i =0,il=skills.length;i<il;i++){
  let cur_skill = skills[i]
  if (cur_skill.cur_time >= 300) {
    
    
 
      this.player.stopSkill(cur_skill)//停止技能效果
      this.player.skills.splice(i,1)//移除技能状态
    }
  else cur_skill.cur_time++;
   
    }

    this.enemyGenerate()// 敌机生成
    this.shoeGenerate()//道具鞋子生成

  
    
    databus.time++//计时器推进
    
    this.collisionDetection()

    if (databus.frame % 20 === 0) {
     // this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
     this.bindLoop,
     canvas
    )
  }
}
