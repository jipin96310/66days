import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.time       = 0
    this.hp         = 100
    
    this.bullets    = []
    this.enemys     = []
    this.equips     = []
    this.animations = []
    this.shoes      = []

    this.skills     = []
    
    
    this.gameOver   = false
    this.gameStop   = false
  }

// get a new skill
  



/*

  removeSkill(skill) {

    var skills = this.skills
    var skillIndex = skills.indexOf(skill)

    if (skillIndex >= 0) {

      if (this.skills[skillIndex].name === "加速") {
        skill.player.speed = 8;
      }
      this.skills.splice(skillIndex, 1);
      console.log("remove skill")
    } else {

    }
    for (let i = 0, il = skills.length; i < il; i++) {
      
       
      if (skills[i] == skill) {
       
        this.skills.splice(i, 1);
        if (temp.name === "加速") {
          temp.player.speed = 8;
        }
       
        break
      }

    }

*/

   

  
  



  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = enemy;
    //console.log('enemy' + enemy.speed);
    for(let i =0;i<this.enemys.length;i++){

       if(temp === this.enemys[i]){
         this.enemys.splice(i,1);
        break;
       }
    }



    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
 
 
 /**
   * 回收鞋子，进入对象池
   * 此后不进入帧循环
   */


  removeShoes(shoe) {
    let temp = shoe;
    for (let i = 0; i < this.shoes.length; i++) {

      if (temp === this.shoes[i]) {
        this.shoes.splice(i, 1);
        
        break;
      }
    }
    temp.visible = false

   // this.pool.recover('shoe', shoe)
  }


}
