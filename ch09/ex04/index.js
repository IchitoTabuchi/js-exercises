// class記法による実装

export class WarriorClass {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

export class MagicWarriorClass extends WarriorClass {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// prototype記法による実装

export function WarriorFunc(atk) {
  this.atk = atk;
}

WarriorFunc.prototype.attack = function () {
  return this.atk * 2;
};

export function MagicWarriorFunc(atk, mgc) {
  WarriorFunc.call(this, atk);
  this.mgc = mgc;
}

MagicWarriorFunc.prototype = Object.create(WarriorClass.prototype);
MagicWarriorFunc.prototype.constructor = MagicWarriorFunc;

MagicWarriorFunc.prototype.attack = function () {
  return WarriorFunc.prototype.attack.call(this) + this.mgc;
};
