/**
 * 游戏基础的精灵类
 */
export default class advanceSprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0, lastX = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.lastX = x
    
    //advance special
   

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )


    ctx.fillStyle = "#ffffff"
    ctx.font = "14px Arial"

    ctx.fillText(
      this.skill.name,
      this.x,
      this.y+20
    )
    ctx.fillStyle = "#ffffff"
    ctx.font = "10px Arial"


    ctx.fillText(
      "LV"+this.skill.degree,
      this.x+15,
      this.y+5
    )
  

  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible)
      return false

    return !!(spX >= this.x
      && spX <= this.x + this.width
      && spY >= this.y
      && spY <= this.y + this.height)
  }
}
