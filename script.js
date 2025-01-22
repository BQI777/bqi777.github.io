function copiarMail() {
    navigator.clipboard.writeText
    ("nicolas.barqui@gmail.com");
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    const closeButton = wrapper.querySelector('.btn-close');
    if (closeButton) {
      closeButton.click();
    }
  }, 2500);
};

const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('📮 Email copiado 📮', 'dark');
  });
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



$('a').magnificPopup({
  type: 'image',
  closeBtnInside: false,
  closeOnContentClick: true,
  closeOnBgClick: true,

  callbacks: {
    open: function() {
      var self = this;
      self.wrap.on('click.pinhandler', 'img', function() {
        self.wrap.toggleClass('mfp-force-scrollbars');
      });
    },
    beforeClose: function() {
          this.wrap.off('click.pinhandler');
      this.wrap.removeClass('mfp-force-scrollbars');
    }
  },
   
  image: {
    verticalFit: false
  }

});