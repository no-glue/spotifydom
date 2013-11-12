window.SpotifyDOM = function() {
  var Dome = function (elements) {
    for(var i=0; i < elements.length; i++) {
      this[i] = elements[i];
    }
    
    this.length = elements.length;
  };
  
  Dome.prototype.isCollection = function () {
    return this.length > 1;
  };
  
  Dome.prototype.map = function (callback) {
    var results = [];
    
    for(var i=0; i < this.length; i++) {
      results.push(callback.call(this, this[i], i));
    }
    
    return results;
  };
  
  Dome.prototype.each = function(callback) {
    this.map(callback);
    
    return this;
  };
  
  Dome.prototype.mapOne = function(callback) {
    var thing = this.map(callback);
    
    return thing.length > 1 ? thing : thing[0];
  };
  
  Dome.prototype.html = function(html) {
    if(typeof html !== 'undefined') {
      this.each(function (element) {
        element.innerHTML = html;
      });
      
      return this;
    } else {
      return this.mapOne(function(element) {
        return element.innerHTML;
      });
    }
  };
  
  return function(selector) {
    var elements;
      
    if(typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    }
      
    return new Dome(elements);
  };
}();
