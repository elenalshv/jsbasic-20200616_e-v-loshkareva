import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let container = document.createElement('div');
    let carousel = document.createElement('div');
    let carousel__inner = document.createElement('div');
    carousel__inner.className = "carousel__inner";
    container.className = "container";
    carousel.className = "carousel";
    for (let i = 0; i < this.slides.length; i++) {
      let carousel__slide = document.createElement('div');
      let carousel__caption = document.createElement('div');
      carousel__slide.className = "carousel__slide";
      carousel__slide.id = this.slides[i].id;
      //    <div class="carousel__slide" data-id="${this.slides[i].id}">
      carousel__slide.dataset.id = this.slides[i].id;
      carousel__caption.className = "carousel__caption";
      carousel__slide.innerHTML = `<img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">`;
      carousel__caption.innerHTML = `<span class="carousel__price">€${this.slides[i].price.toFixed(2)}</span>
    <div class="carousel__title">${this.slides[i].name}</div>`;
      let button = document.createElement("button");
      button.className = "carousel__button";
      button.innerHTML = '<img src="/assets/images/icons/plus-icon.svg" alt="icon">';
      button.onclick = () => {

        this.elem.dispatchEvent(

          new CustomEvent("product-add", {
            detail: this.slides[i].id,
            bubbles: true
          }));

      }


      carousel__caption.appendChild(button);
      carousel__slide.appendChild(carousel__caption);
      carousel__inner.appendChild(carousel__slide);
    }





    let carousel__arrow_right = document.createElement('div');
    carousel__arrow_right.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    let carousel__arrow_left = document.createElement('div');
    carousel__arrow_left.innerHTML = '<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">';
    carousel__arrow_right.className = "carousel__arrow_right carousel__arrow";
    carousel__arrow_left.className = "carousel__arrow_left carousel__arrow";
    carousel.appendChild(carousel__arrow_right);
    carousel.appendChild(carousel__arrow_left);
    carousel.appendChild(carousel__inner);


    this.elem = carousel;

    let buttonRight = this.elem.querySelector('.carousel__arrow_right');
    let buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    let buttons = this.elem.querySelectorAll('.carousel__arrow');
    let movement = 0;

    if (movement == 0) {
      buttonLeft.style.display = 'none';
    } else {
      buttonLeft.style.display = '';
    }

    function checkButton() {



      let inner = document.querySelectorAll('.carousel__slide');
      let innerContainer = document.querySelector('.carousel__inner');
      let innerWidth = 0;
      for (let n = 0; n < inner.length; n++) {


        innerWidth += inner[n].offsetWidth;
      }

      let slide = document.querySelector('.carousel__slide');

      let slideWidth = slide.offsetWidth;
      if (event.currentTarget.classList.contains('carousel__arrow_left')) {

        movement -= slideWidth;
      } else {
        movement += slideWidth;
      }

      if (movement == 0) {
        buttonLeft.style.display = 'none';
      } else {
        buttonLeft.style.display = '';
      }
      if (movement >= innerWidth - slideWidth) {
        buttonRight.style.display = 'none';
      } else {
        buttonRight.style.display = '';
      }
      innerContainer.style.transform = `translateX(-${movement}px)`;
    };


    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", checkButton, true);
    }

  }



}
