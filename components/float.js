// var registerComponent = require('../core/component').registerComponent;
// var THREE = require('../../lib/three');

AFRAME.registerComponent('floating', {
  
  schema: {
    width: {type: 'number', default: 1},
    depth: {type: 'number', default: 1}
  },
  
  init: function () {
    this.raycaster = new THREE.Raycaster();
  },
  
  tick: function () {
    var data = this.data;
    var el = this.el;
    var rotation = el.components.rotation.data;
    var position = el.components.position.data;
    var scene = this.el.sceneEl.object3D;
    var raycaster = this.raycaster;
    
    raycaster.set(position, rotation);
    
    console.log(raycaster.intersectObjects(scene.children));
  }
  
});