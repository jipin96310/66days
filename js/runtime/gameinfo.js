const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"
    
    ctx.fillText(
      score,
      10,
      30
    )
  }



renderGameTime(ctx,time){
  ctx.fillStyle = "#ffffff"
  ctx.font = "16px Arial"
  var fixed_time = parseInt(time/100)
  ctx.fillText(
    "生存时间: "+ fixed_time + "分钟",
    30,
    90
  )

}
renderHp(ctx, hp) {
  ctx.fillStyle = "#ffffff"
  ctx.font = "16px Arial"
  var temp = hp;
  if (temp <= 0) temp=0;
  ctx.fillText(
    "剩余血量: " + temp,
    30,
    120
  )

}



renderSkillName(ctx,skills){

 var skillNames = "";
  

  for (let i = 0, il = skills.length; i < il; i++) {
    let cur_skillName = skills[i].name;

    skillNames += cur_skillName;
  }

  ctx.fillStyle = "#ffffff"
  ctx.font = "16px Arial"

  ctx.fillText(
    "当前技能: " + skillNames,
    30,
    150
  )
}


renderGameStop(ctx,stoped){
 // ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)
  ctx.fillStyle = "#ffffff"
  ctx.font = "20px Arial"

  ctx.fillText(
    stoped?'继续':'暂停',
    screenWidth / 2 - 40,
    screenHeight / 3 - 100 + 205
  )
  this.stopArea = {
    startX: screenWidth / 2 - 40,
    startY: screenHeight / 3 - 100 + 180,
    endX: screenWidth / 2 + 50,
    endY: screenHeight / 3 - 100 + 255
  }
  
  
}


  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

