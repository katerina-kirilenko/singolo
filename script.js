window.onload = function() {
  // Menu
  addMenuClickHandler();

  // Phone
  addPhoneClickHandler();

  // Slider
  addSliderClickHandler();

  // Tags
  addTagsClickHandler();

  // Gallery images
  addGalleryImgClickHandler();

  // Modal
  addModalClickHandler();
};

// Menu
const addMenuClickHandler = () => {
  let menu = document.getElementById("menu");

  menu.addEventListener("click", event => {
    menu.querySelectorAll("a").forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");
  });
};

// Phone
const addPhoneClickHandler = () => {
  let phoneV = document.querySelector(".phone-vertical");
  let phoneH = document.querySelector(".phone-horizontal");
  let displayV = phoneV.querySelector(".wrap-display");
  let displayH = phoneH.querySelector(".wrap-display");

  // let phones = document.querySelector(".slider__content");
  // phones.addEventListener("click", event => {
  //   phone = event.path[event.path.length - 10];
  //   switched(phone);
  //   console.log(phones.children);
  //   console.log(event);
  // });

  // function switched(phone) {
  //   let display = phone.querySelector(".wrap-display");
  //   display.classList.toggle("display-off");

  // let indicator = phone.querySelector(".indicator");
  // indicator.classList.toggle("display-off");
  // }
  phoneV.addEventListener("click", event => {
    displayV.classList.toggle("display-off");
  });

  phoneH.addEventListener("click", event => {
    displayH.classList.toggle("display-off");
  });
};

// Slider
function addSliderClickHandler() {
  let items = document.querySelectorAll(".slider__item");
  let currentItem = 0;
  let isEnabled = true;

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("slide-active", direction);
    });
  }

  function showItem(direction) {
    items[currentItem].classList.add("slide-next", direction);
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("slide-next", direction);
      this.classList.add("slide-active");
      isEnabled = true;
    });
  }

  function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
  }

  function previosItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    showItem("from-left");
  }


  document.querySelector(".left-arrow").addEventListener("click", function() {
    if (isEnabled) {
      previosItem(currentItem);
    }
  });

  document.querySelector(".right-arrow").addEventListener("click", function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });

  let slider = document.querySelector(".slider");
  slider.addEventListener("click", e => {
    if (
      e.target.className == "right-arrow" ||
      e.target.className == "left-arrow"
    ) {
      slider.classList.toggle("background-blue");
    }
  });
}

// Tags
const addTagsClickHandler = () => {
  document
    .querySelector(".portfolio__tags")
    .addEventListener("click", event => {
      if (event.target.classList.contains("tag")) {
        let clickedTag = event.target;
        removeSelectedTags();
        selectClickedTag(clickedTag);
        if (clickedTag.innerText === "All") {
          showAllImages();
        } else {
          filterImagesBySelectedTag(clickedTag.innerText);
        }
      }
    });
};

const removeSelectedTags = () => {
  let tags = document.querySelectorAll(".portfolio__tags .tag");
  tags.forEach(tag => {
    tag.classList.remove("tag_selected");
    tag.classList.add("tag_bordered");
  });
};

const selectClickedTag = clickedTag => {
  clickedTag.classList.add("tag_selected");
  clickedTag.classList.remove("tag_bordered");
};

const showAllImages = () => {
  let images = document.querySelectorAll(".portfolio__gallery .gallery__img");
  images.forEach(image => {
    image.classList.remove("img_hidden");
  });
};

const filterImagesBySelectedTag = selectedTag => {
  let images = document.querySelectorAll(".portfolio__gallery .gallery__img");
  images.forEach(image => {
    image.classList.add("img_hidden");
    image.querySelectorAll("img").forEach(category => {
      if (category.dataset.category === selectedTag) {
        image.classList.remove("img_hidden");
      }
    });
  });
};

// Gallery images
const addGalleryImgClickHandler = () => {
  let gallery = document.getElementById("portfolio-gallery");

  gallery.addEventListener("click", e => {
    gallery
      .querySelectorAll(".gallery__img")
      .forEach(el => el.classList.remove("img_bordered"));
    e.target.parentElement.classList.add("img_bordered");

    console.log(e);
  });
};

// Modal
const addModalClickHandler = () => {
  const btnOpen = document.getElementById("btn");
  const btnClose = document.getElementById("close-btn");
  const form = document.querySelector(".quote-form");

  form.addEventListener("submit", e => {
    e.preventDefault();
  });

  btnOpen.addEventListener("click", event => {
    const username = document.getElementById("username").value.toString();
    const email = document.getElementById("email").value.toString();
    const subject = document.getElementById("subject").value.toString();
    const comment = document.getElementById("comment").value.toString();

    const sendStatus = document.getElementById("send-status");
    const messageTheme = document.getElementById("message-theme");
    const messageText = document.getElementById("message-text");

    if (
      username === "" ||
      email === "" ||
      email !== email.match(/.+@.+/).input
    ) {
      sendStatus.innerText =
        "Письмо не отправлено :( Пожалуйста, заполните ваше имя и email.";
    } else {
      sendStatus.innerText = "Письмо отправлено! :)";
    }

    if (subject === "") {
      messageTheme.innerText = "Без темы";
    } else {
      messageTheme.innerText = subject;
    }

    if (comment === "") {
      messageText.innerText = "Без описания";
    } else {
      messageText.innerText = comment;
    }

    document.getElementById("modal-message").classList.remove("hidden");
  });

  btnClose.addEventListener("click", () => {
    document.getElementById("modal-message").classList.add("hidden");
  });
};

// Button to top
(function() {
  "use strict";

  function trackScroll() {
    var scrolled = window.pageYOffset;

    if (scrolled > 300) {
      goTopBtn.classList.add("back_to_top-show");
    }
    if (scrolled < 300) {
      goTopBtn.classList.remove("back_to_top-show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -30);
      setTimeout(backToTop, 10);
    }
  }

  var goTopBtn = document.querySelector(".back_to_top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);
})();