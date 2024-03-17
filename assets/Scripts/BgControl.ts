import { _decorator, Component, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BgControl")
export class BgControl extends Component {
  private resetThreshold: number = 850;
  @property
  private airSpeed: number = 500;

  protected update(dt: number): void {
    for (let bgNode of this.node.children) {
      let { x, y: newY } = bgNode.position;
      newY = newY - this.airSpeed * dt;
      bgNode.setPosition(x, newY);
      // 检查是否达到复位阈值
      if (newY < -this.resetThreshold) {
        // 这里可以根据需要设置复位的具体位置
        newY = newY + this.resetThreshold * this.node.children.length; // 例如复位到原点
        bgNode.setPosition(x, newY);
      }
    }
  }
}
