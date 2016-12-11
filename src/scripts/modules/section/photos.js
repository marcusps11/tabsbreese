class Photos {

  constructor () {
    this.overlay = null;
    this.image = null;
    this.setVars();
    this.addListeners();
  }

  setVars() {
    this.overlay = document.querySelector('#overlay')
    this.image = Array.from(document.querySelectorAll('.image-gallery'));
  }

  addListeners() {

    // $('#photo-gallery img').click(this.updateOverlay.bind(this));

    this.image.forEach((image) => { image.addEventListener('click', this.updateOverlay.bind(this))})

  }

  updateOverlay(event) {
    console.log(event.path[0]);
    // this.overlay.classList.add('active'); 
    // let imageLocation = $(this).attr('href');
    // this.overlay.style.display = 'block';
    // console.log(this.overlay.style.display);
  }








}
export default Photos;





