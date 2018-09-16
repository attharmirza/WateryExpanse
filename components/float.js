AFRAME.registerComponent('floating', {

  schema: {
    target: {
      type: 'selector',
      default: '',
    },
    width: {
      type: 'number',
      default: 1
    },
    depth: {
      type: 'number',
      default: 1
    },
    dampening: {
      type: 'array',
      default: [1, 1, 1]
    },
    surface: {
      type: 'string'
    }
  },

  update: function() {
    var el = this.el;
    var scene = this.el.sceneEl;
    var depth = this.data.depth;
    var width = this.data.width;
    var dampening = this.data.dampening;
    var surface = this.data.surface;
    var position = this.el.components.position.data;
    var target = this.data.target;

    console.log(target);

    this.el.setAttribute('position', {x: position.x, y: position.y + 10, z: position.z });

    var rayCreate = function (element, position) {
      element.setAttribute('id', 'ray-' + position);
      element.setAttribute('rotation', {
        x: -90,
        y: 90,
        z: 0
      });

      if (position == 'back') {
        element.setAttribute('position', {
          x: 0,
          y: 0,
          z: 0 + depth
        });
      } else if (position == 'front') {
        element.setAttribute('position', {
          x: 0,
          y: 0,
          z: 0 - depth
        });
      } else if (position == 'left') {
        element.setAttribute('position', {
          x: 0 - width,
          y: 0,
          z: 0
        });
      } else if (position == 'right') {
        element.setAttribute('position', {
          x: 0 + width,
          y: 0,
          z: 0
        });
      } else {
        console.log('please use back, right, left, or front for position');
      };
    };

    var rayBack = document.createElement('a-entity');
    var rayFront = document.createElement('a-entity');
    var rayLeft = document.createElement('a-entity');
    var rayRight = document.createElement('a-entity');

    rayCreate(rayBack, 'back');
    this.el.appendChild(rayBack);
    this.rayBack = rayBack;

    rayCreate(rayFront, 'front');
    this.el.appendChild(rayFront);
    this.rayFront = rayFront;

    rayCreate(rayLeft, 'left');
    this.el.appendChild(rayLeft);
    this.rayLeft = rayLeft;

    rayCreate(rayRight, 'right');
    this.el.appendChild(rayRight);
    this.rayRight = rayRight;

    var pointBack;
    var pointFront;
    var pointLeft;
    var pointRight;

    var oceanTilt = function () {
      var angleZ;
      var angleX;

      angleX = -(Math.atan((pointBack.y + pointFront.y)/(depth * 2))) * (180/Math.PI);
      angleZ = (Math.atan((pointLeft.y + pointRight.y)/(width * 2))) * (180/Math.PI);


      target.setAttribute('rotation', {x: angleX * dampening[0], y: 0, z: angleZ * dampening[1]});
    };

    document.querySelector(surface).addEventListener('raycaster-intersected', function (event) {

      if (event.detail.el == rayBack) {
        pointBack = event.detail.intersection.point;
      } else if (event.detail.el == rayFront) {
        pointFront = event.detail.intersection.point;
      } else if (event.detail.el == rayLeft) {
        pointLeft = event.detail.intersection.point;
      } if (event.detail.el == rayRight) {
        pointRight = event.detail.intersection.point;
      }

      var pointAverage = (pointFront.y + pointBack.y + pointLeft.y + pointRight.y)/4;

      target.setAttribute('position', {y: (pointAverage * dampening[2]) - 10});

      oceanTilt();

    });
  },

  tick: function() {
    var rayCast = function (element) {
      element.removeAttribute('raycaster');
      element.setAttribute('raycaster', 'showLine: false;');
    }

    rayCast(this.rayBack);
    rayCast(this.rayFront);
    rayCast(this.rayLeft);
    rayCast(this.rayRight);

  },

  remove: {}

});

AFRAME.registerComponent('floating-small', {

  schema: {
    target: {
      type: 'selector',
      default: '',
    },
    surface: {
      type: 'string'
    }
  },

  update: function() {
    var el = this.el;
    var scene = this.el.sceneEl;
    var surface = this.data.surface;
    var position = this.el.components.position.data;
    var target = this.data.target;

    this.el.setAttribute('position', {x: position.x, y: position.y + 10, z: position.z });

    var rayCreate = function (element, position) {
      element.setAttribute('id', 'ray-' + position);
      element.setAttribute('rotation', {
        x: -90,
        y: 90,
        z: 0
      });
      element.setAttribute('position', {
        x: 0,
        y: 0,
        z: 0
      });
    }

    var rayCenter = document.createElement('a-entity');

    rayCreate(rayCenter, 'center');
    this.el.appendChild(rayCenter);
    this.rayCenter = rayCenter;

    var pointCenter;

    document.querySelector(surface).addEventListener('raycaster-intersected', function (event) {

      if (event.detail.el == rayCenter) {
        pointCenter = event.detail.intersection.point;
      }

      target.setAttribute('position', {x: pointCenter.x - position.x, y: pointCenter.y - position.y - 10, z: pointCenter.z - position.z});

    });
  },

  tick: function() {
    var rayCast = function (element) {
      element.removeAttribute('raycaster');
      element.setAttribute('raycaster', 'showLine: false;');
    }

    rayCast(this.rayCenter);
  },

  remove: {},

});
