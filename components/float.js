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
    var targetPosition = {};
    
    // console.log(targetPosition);
    
    if (this.data.target) {
      target = this.data.target;
    } else {
      target = el.children[0]
    };

    this.el.setAttribute('position', {x: position.x, y: position.y + 10, z: position.z });

    var rayCreate = function (element, orientation, initialPosition) {
      element.setAttribute('id', 'ray-' + orientation);
      element.setAttribute('rotation', {
        x: -90,
        y: 90,
        z: 0
      });

      if (orientation == 'back') {
        element.setAttribute('position', {
          x: initialPosition.x,
          y: 0,
          z: initialPosition.z + depth
        });
      } else if (orientation == 'front') {
        element.setAttribute('position', {
          x: initialPosition.x,
          y: 0,
          z: initialPosition.z - depth
        });
      } else if (orientation == 'left') {
        element.setAttribute('position', {
          x: initialPosition.x - width,
          y: 0,
          z: initialPosition.z
        });
      } else if (orientation == 'right') {
        element.setAttribute('position', {
          x: initialPosition.x + width,
          y: 0,
          z: initialPosition.z
        });
      } else {
        console.log('please use back, right, left, or front for position');
      };
    };

    var rayBack = document.createElement('a-entity');
    var rayFront = document.createElement('a-entity');
    var rayLeft = document.createElement('a-entity');
    var rayRight = document.createElement('a-entity');
    
    // target.addEventListener('model-loaded', function () {
      targetPosition = target.getAttribute('position');
      
      rayCreate(rayBack, 'back', targetPosition);
      el.appendChild(rayBack);
      
      rayCreate(rayFront, 'front', targetPosition);
      el.appendChild(rayFront);
      
      rayCreate(rayLeft, 'left', targetPosition);
      el.appendChild(rayLeft);
      
      rayCreate(rayRight, 'right', targetPosition);
      el.appendChild(rayRight);
    // });
    
    this.rayBack = rayBack;
    this.rayFront = rayFront;
    this.rayLeft = rayLeft;
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

      // console.log(targetPosition);
      target.setAttribute('position', {x: targetPosition.x, y: (pointAverage * dampening[2]) - 10, z: targetPosition.z});

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
    var target;
    var targetPosition = {};
    
    if (this.data.target) {
      target = this.data.target;
    } else {
      target = el.children[0]
    };

    this.el.setAttribute('position', {x: position.x, y: position.y + 10, z: position.z });

    var rayCreate = function (element, orientation, initialPosition) {
      element.setAttribute('id', 'ray-' + orientation);
      element.setAttribute('rotation', {
        x: -90,
        y: 90,
        z: 0
      });
      element.setAttribute('position', {
        x: initialPosition.x,
        y: 0,
        z: initialPosition.z
      });
    }

    var rayCenter = document.createElement('a-entity');
    
    // target.addEventListener('loaded', function () {
      targetPosition = target.getAttribute('position');
      
      rayCreate(rayCenter, 'center', targetPosition);
      el.appendChild(rayCenter);
    // });


    this.rayCenter = rayCenter;

    var pointCenter;

    document.querySelector(surface).addEventListener('raycaster-intersected', function (event) {

      if (event.detail.el == rayCenter) {
        pointCenter = event.detail.intersection.point;
      };

      target.setAttribute('position', {x: targetPosition.x, y: (pointCenter.y - position.y) - 10, z: targetPosition.z});

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
