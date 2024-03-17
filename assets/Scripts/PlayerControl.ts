import { _decorator, Component, instantiate, NodeEventType, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerControl")
export class PlayerControl extends Component {
  @property(Prefab)
  private preBullet: Prefab = null;

  onMove() {
    this.node.on(NodeEventType.TOUCH_MOVE, (event) => {
      // 获取触摸位置的世界坐标
      const touchWorldPos = event.getUILocation();

      // 使用世界坐标设置节点位置
      this.node.setWorldPosition(
        touchWorldPos.x,
        touchWorldPos.y,
        this.node.worldPosition.z
      );
    });
  }

  shoot() {
    this.schedule(() => {
      let bullet = instantiate(this.preBullet);
      bullet.setParent(this.node.parent);
      const { x: playerX, y: playerY } = this.node.getPosition();
      const bulletY = playerY + 100;
      const bulletPosition = {
        x: playerX,
        y: bulletY,
      };
      bullet.setPosition(bulletPosition.x, bulletPosition.y);
    }, 0.5);
  }
  protected start(): void {
    this.onMove();
    this.shoot();
  }
}
