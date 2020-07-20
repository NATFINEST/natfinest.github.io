$(window).on('load',function(){
    // $('#profileModal').modal('show');
    // vars
    let result = document.querySelector('.result'),
    img_result = document.querySelector('.img-result'),
    img_w = $('.img-w').text(),
    img_h = $('.img-h').text(),
    options = document.querySelector('.options'),
    save = document.querySelector('.save'),
    cropped = document.querySelector('.cropped'),
    dwn = document.querySelector('.download'),
    upload = document.querySelector('#file-input'),
    cropper = '';



    function crop(){
      // get result to data uri
      let imgSrc = cropper.getCroppedCanvas({
            width: img_w, // input value
            height: img_h // input value
        }).toDataURL();
      // remove hide class of img
      cropped.classList.remove('hide');
        img_result.classList.remove('hide');
        // show image cropped
      cropped.src = imgSrc;
      // dwn.classList.remove('hide');
      // dwn.download = 'imagename.png';
      // dwn.setAttribute('href',imgSrc);
      $('.logo-src').attr('value',imgSrc)
      $('button#profile').removeAttr('disabled')
    }

    // on change show image with crop options
    upload.addEventListener('change', (e) => {
      if (e.target.files.length) {
            // start file reader
        const reader = new FileReader();
        reader.onload = (e)=> {

          var image = new Image();
          image.src = e.target.result;
          var height;
          var width;

          if(e.target.result){
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.src = e.target.result
                // clean result before
                result.innerHTML = '';
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');
                options.classList.remove('hide');
                // init cropper
                cropper = new Cropper(img, { aspectRatio: img_w / img_h, movable : true});
                
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        // if(img_w == '')
      }
    });

    // save on click
    save.addEventListener('click',(e)=>{
      e.preventDefault();
      crop()
    });


});