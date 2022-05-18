class MyClass {
  teste;
  constructor() {
    this.teste = "oi";
  }

  show = () => {
    console.log(this);
  };
}

function teste(fn) {
  fn();
}

teste(new MyClass().show);
