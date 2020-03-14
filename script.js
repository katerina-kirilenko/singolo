window.onload = function() {
  // Menu
  addMenuClickHandler();

  // Phone
  addPhoneClickHandler();

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
  // let phoneV = document.querySelector(".phone-vertical");
  // let phoneH = document.querySelector(".phone-horizontal");
  // let displayV = phoneV.querySelector(".wrap-display");
  // let displayH = phoneH.querySelector(".wrap-display");

  let phones = document.querySelector(".slider__content");
  phones.addEventListener("click", event => {
    phone = event.path[event.path.length - 9];
    switched(phone);
    console.log(phones.children);
    console.log(event);
  });

  function switched(phone) {
    let display = phone.querySelector(".wrap-display");
    display.classList.toggle("display-off");

    let indicator = phone.querySelector(".indicator");
    indicator.classList.toggle("display-off");
  }
  // phoneV.addEventListener("click", event => {
  //   displayV.classList.toggle("display-off");
  // });

  // phoneH.addEventListener("click", event => {
  //   displayH.classList.toggle("display-off");
  // });
};

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

  btnOpen.addEventListener("click", event => {    

    const username = document.getElementById("username").value.toString();
    const email = document.getElementById("email").value.toString();
    const subject = document.getElementById("subject").value.toString();
    const comment = document.getElementById("comment").value.toString();

    const sendStatus = document.getElementById("send-status");
    const messageTheme = document.getElementById("message-theme");
    const messageText= document.getElementById("message-text");

    if (username === "" || email === "") {
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
      messageText.innerText = 'Без описания';
    } else {
      messageText.innerText = comment;
    }

    document.getElementById("modal-message").classList.remove("hidden");
    event.preventDefault();
  });

  btnClose.addEventListener("click", () => {
    document.getElementById("modal-message").classList.add("hidden");
    document.querySelector(".quote-form").reset();
  });
};
