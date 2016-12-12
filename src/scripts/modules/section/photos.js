class Photos {

  constructor () {
    this.overlay = null;
    this.image = null;
    this.setVars();
    this.addListeners();
  }

  setVars() {
    this.imageTag = document.createElement("img");
    this.imageTag.className = 'overlay-image';
    this.overlay = document.getElementById('overlay');
    this.image = Array.from(document.querySelectorAll('.image-gallery'));
  }

  addListeners() {

    this.image.forEach((image) => { image.addEventListener('click', this.updateOverlay.bind(this))})
    this.overlay.addEventListener('click', this.closeOverlay.bind(this));

  }

  updateOverlay(event) {
    let currentPhotoSrc = event.path[0].src;
    this.overlay.style.display = 'block';
    this.imageTag.src = currentPhotoSrc;
    this.overlay.appendChild(this.imageTag);
   
  }

  closeOverlay() {
    this.overlay.style.display = 'none';
  }







}
export default Photos;





