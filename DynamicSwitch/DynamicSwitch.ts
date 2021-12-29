interface dynamicSwitchInterace<T> {
  cases: Array<T>;
  conditions: Array<Function>;
  add(condition: T, callback: Function): void;
  isValid(): void;
  isEmpty(): boolean;
}

class Switch<T> implements dynamicSwitchInterace<T> {
  public cases: Array<T> = [];
  public conditions: Array<Function> = [];

  add(condition: T, callback: Function) {
    this.cases = [...this.cases, condition];
    this.conditions = [...this.conditions, callback];
  }

  isValid() {
    for (let i = 0; i < this.cases.length; i++) {
      if (this.cases[i]) {
        this.conditions[i]();
      } else return true;
    }
    this.cases = [];
    this.conditions = [];
  }

  isEmpty() {
    if (this.cases.length === 0 && this.conditions.length === 0) {
      return true;
    } else return false;
  }
}

const formChecker = new Switch();
const value = "test";

formChecker.add(value.length < 5, () => {
  console.error("value is too short");
});

formChecker.add(!value.includes("@"), () => {
  console.error("value is not an email");
});

formChecker.isEmpty();
formChecker.isValid();
formChecker.isEmpty();
