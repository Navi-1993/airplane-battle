import { _decorator, Component, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
  @property(Prefab)
  private prefab: Prefab = null;

  start() {
    this.schedule(() => {
      const enemy: Node = instantiate(this.prefab);
      enemy.setParent(this.node.parent);
      let p = this.node.getPosition();
      let randomX = Math.random() * 400 + 1;
      enemy.setPosition(randomX, p.y);
    }, 2);
  }
}
