// var registerComponent = require('../core/component').registerComponent;
// var THREE = require('../../lib/three');

AFRAME.registerComponent('floating', {

  schema: {
    width: {
      type: 'number',
      default: 1
    },
    depth: {
      type: 'number',
      default: 1
    }
  },

  update: function() {
    var scene = this.el.sceneEl;
    var depth = this.data.depth;
    var width = this.data.width;
    var position = this.el.components.position.data;

    var rayCreate = function (element, position) {
      element.setAttribute('id', 'ray-' + position);
      element.setAttribute('raycaster', 'showLine: true;');
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
    }

    var rayBack = document.createElement('a-entity');
    var rayFront = document.createElement('a-entity');
    var rayLeft = document.createElement('a-entity');
    var rayRight = document.createElement('a-entity');

    rayCreate(rayBack, 'back');
    this.el.appendChild(rayBack);
    this.rayBack = rayBack;

    rayCreate(rayFront, 'front');
    this.el.appendChild(rayFront);

    rayCreate(rayLeft, 'left');
    this.el.appendChild(rayLeft);

    rayCreate(rayRight, 'right');
    this.el.appendChild(rayRight);

    // console.log(scene);

  },

  tick: function() {
    var rayBack = this.rayBack;

    console.log(rayBack.components.raycaster.intersectedEls[0]);
  }

});
