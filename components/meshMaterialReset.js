AFRAME.registerComponent('mesh-material-reset', {
  
  schema: {},
  
  init: function () {
    
    var element = this.el;
    var group;
    var objects;
    
    var material = new THREE.MeshStandardMaterial();
    
    console.log(material);
    
    this.el.addEventListener('model-loaded', function () {
      group = element.object3D.children[0];
      objects = group.children;      
          
      for (i = 0; i < objects.length; i++) {
        objects[i].material = material;
      }
    });


  },
  
});