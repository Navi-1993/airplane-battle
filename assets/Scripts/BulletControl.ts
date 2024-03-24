import { _decorator, Contact2DType, Component, Collider2D } from "cc";
import { EnemyControl } from "./EnemyControl";
const { ccclass, property } = _decorator;

@ccclass("BulletControl")
export class BulletControl extends Component {
  @property
  private speed = 800;

  protected start(): void {
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  private move(dt: number) {
    const { x, y } = this.node.getPosition();
    let newY = y + this.speed * dt;
    this.node.setPosition(x, newY);
    if (this.node.getWorldPosition().y > 1000) {
      this.node.destroy();
    }
  }

  protected update(dt: number): void {
    this.move(dt);
  }

  onBeginContact(_self, other): void {
    const enemy = other.getComponent(EnemyControl);
    if (enemy) {
      enemy?.die(); // 销毁敌人
    }
    setTimeout(() => this.node.destroy());
  }
}
