AFRAME.registerComponent('mesh-material-reset', {
  
  schema: {},
  
  init: function () {
    
    var element = this.el;
    var group;
    var objects;
    
    // var material = new THREE.MeshStandardMaterial();
    // var materialAttribute = element.components.material;
    var material = element.components.material.material;
    
    console.log(material);
    
    this.el.addEventListener('model-loaded', function () {
      var groupSize = element.object3D.children.length - 1;
      console.log(groupSize);
      
      group = element.object3D.children[groupSize];
      objects = group.children;      
          
      for (i = 0; i < objects.length; i++) {
        if (document.querySelector('#' + objects[i].name + '-texture') != null) {
          console.log(objects[i].name + "'s texture exists!");
        } else {
          console.log(objects[i].name + "'s texture does not exist, bro!");
        }
        
        objects[i].material = material;
      }
    });


  },
  
});