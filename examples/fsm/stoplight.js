var stopLight = new machina.Fsm({
  initialState: "red",
  states: {
    green: {
      caution: function() {
        this.transition("yellow");
      }
    },
    yellow: {
      stop: function() {
        this.transition("red");
      }
    },
    red: {
      go: function() {
        this.transition("green");
      }
    }
  }
});
// state is "red"
stopLight.handle("go");
// state is now "green"

