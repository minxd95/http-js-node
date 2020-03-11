var Body = {
  setColor : function(color) {
    document.querySelector('body').style.color=color;
  },
  setBgColor : function(color) {
    document.querySelector('body').style.backgroundColor=color;
  }
}
var Links = {
  setColor : function(color) {
    // var alist = document.querySelectorAll('a');
    // for(var i=0;i<alist.length;i++) {
    //   alist[i].style.color=color;
    // }
    $('a').css('color',color);
  }
}
function ndHandler(self) {
  if(self.value == 'night') {
    Body.setBgColor('black');
    Body.setColor('white');
    self.value='day';
    Links.setColor('powderblue');
  }
  else {
    Body.setBgColor('white');
    Body.setColor('black');
    self.value='night';
    Links.setColor('blue');
  }
}
