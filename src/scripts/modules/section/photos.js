class Photos {

  constructor () {
    this.overlay = null;
    this.image = null;
    this.setVars();
    this.addListeners();
  }

  setVars() {
    this.overlay = $('<div id="overlay"></div>');
    this.image = $("<img>");
    this.overlay.append(this.image);
    $('body').append(this.overlay);
  }

  addListeners() {

    $("#photo-gallery img").click(this.updateOverlay.bind(this));
  }

  updateOverlay(event) {
    console.log(this)
    let imageLocation = $(this).attr('href');
  }








}
export default Photos;





