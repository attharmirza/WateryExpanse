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
    this.raycaster = new THREE.Raycaster();

    var data = this.data;
    var el = this.el;
    var rotation = el.components.rotation.data;
    var position = el.components.position.data;
    var raycaster = this.raycaster;
    var scene = this.el.sceneEl.object3D;

    var rayOrigin = new THREE.Vector3(position.x, position.y, position.z);
    var rayDirection = new THREE.Vector3(0, 0, 0);

    raycaster.set(rayOrigin, rayDirection);

    var arrow = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 2, '#000000');
    scene.add( arrow );

    // console.log(raycaster.intersectObjects( scene.children ));
  },

  tick: function() {
    var raycaster = this.raycaster;
    var scene = this.el.sceneEl.object3D;
    var box = document.querySelector('a-box').object3D.children;

    // console.log(box)
    // console.log(raycaster);
    console.log(raycaster.intersectObjects( box ));
  }

});
