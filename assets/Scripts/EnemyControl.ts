import { _decorator, Component, resources, SpriteFrame, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyControl")
export class EnemyControl extends Component {
  @property
  private speed: number = 300;
  private isDie: boolean = false;

  move(dt: number) {
    let p = this.node.getPosition();
    p.y -= this.speed * dt;
    // 移动

    if (!this.isDie) {
      this.node.setPosition(p.x, p.y);
    }
    // 离开屏幕销毁子弹
    if (this.node.getWorldPosition().y < -800) {
      this.node.destroy();
    }
  }
  protected update(dt: number): void {
    this.move(dt);
  }

  private die() {
    this.isDie = true;
    //加载爆炸图片
    resources.load(
      "enemy0_die/spriteFrame",
      SpriteFrame,
      (err, spriteFrame) => {
        this.node.getComponent(Sprite).spriteFrame = spriteFrame;
      }
    );
    // 300ms后销毁
    setTimeout(() => {
      this.node.destroy();
    }, 300);
  }
}
