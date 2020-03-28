window.onload = function() {
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

  // Button to top
  clickButtonTop();

  // Scroll
  scrollPage();

  // Hamburger menu
  addHamburgerClickHandler();
};

// Phone
const addPhoneClickHandler = () => {
  let phoneV = document.querySelector('.phone-vertical');
  let phoneH = document.querySelector('.phone-horizontal');
  let displayV = phoneV.querySelector('.wrap-display');
  let displayH = phoneH.querySelector('.wrap-display');
  let indicatorV = document.querySelector('.phone-vertical .indicator');
  let indicatorH = document.querySelector('.phone-horizontal .indicator');

  phoneV.addEventListener('click', () => {
    displayV.classList.toggle('display-off');
    indicatorV.classList.toggle('display-off');
  });

  phoneH.addEventListener('click', () => {
    displayH.classList.toggle('display-off');
    indicatorH.classList.toggle('display-off');
  });
};

// Slider
function addSliderClickHandler() {
  let items = document.querySelectorAll('.slider__item');
  let currentItem = 0;
  let isEnabled = true;

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slide-active', direction);
    });
  }

  function showItem(direction) {
    items[currentItem].classList.add('slide-next', direction);
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slide-next', direction);
      this.classList.add('slide-active');
      isEnabled = true;
    });
  }

  function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
  }

  function previosItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
  }

  document.querySelector('.left-arrow').addEventListener('click', function() {
    if (isEnabled) {
      previosItem(currentItem);
    }
  });

  document.querySelector('.right-arrow').addEventListener('click', function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });

  let slider = document.querySelector('.slider');
  slider.addEventListener('click', e => {
    if (
      e.target.className == 'right-arrow' ||
      e.target.className == 'left-arrow'
    ) {
      slider.classList.toggle('background-blue');
    }
  });
}

// Tags
const addTagsClickHandler = () => {
  document
    .querySelector('.portfolio__tags')
    .addEventListener('click', event => {
      if (event.target.classList.contains('tag')) {
        let clickedTag = event.target;
        removeSelectedTags();
        selectClickedTag(clickedTag);
        if (clickedTag.innerText === 'All') {
          showAllImages();
        } else {
          filterImagesBySelectedTag(clickedTag.innerText);
        }
      }
    });
};

const removeSelectedTags = () => {
  let tags = document.querySelectorAll('.portfolio__tags .tag');
  tags.forEach(tag => {
    tag.classList.remove('tag_selected');
    tag.classList.add('tag_bordered');
  });
};

const selectClickedTag = clickedTag => {
  clickedTag.classList.add('tag_selected');
  clickedTag.classList.remove('tag_bordered');
};

let galleryDiv = document.getElementById('portfolio-gallery');
let collection = [...galleryDiv.children];

const showAllImages = () => {
  galleryDiv.innerHTML = '';

  collection.forEach(item => {
    galleryDiv.append(item);
  });
};

const filterImagesBySelectedTag = selectedTag => {
  galleryDiv.innerHTML = '';

  collection.forEach(image => {
    image.querySelectorAll('img').forEach(category => {
      if (category.dataset.category === selectedTag) {
        galleryDiv.append(image);
      }
    });
  });
};

// Gallery images
const addGalleryImgClickHandler = () => {
  let gallery = document.getElementById('portfolio-gallery');

  gallery.addEventListener('click', e => {
    gallery
      .querySelectorAll('.gallery__img')
      .forEach(el => el.classList.remove('img_bordered'));
    e.target.parentElement.classList.add('img_bordered');
  });
};

// Modal
const addModalClickHandler = () => {
  const btnOpen = document.getElementById('btn');
  const btnClose = document.getElementById('close-btn');
  const form = document.querySelector('.quote-form');

  form.addEventListener('submit', e => {
    e.preventDefault();
  });

  btnOpen.addEventListener('click', event => {
    const username = document.getElementById('username').value.toString();
    const email = document.getElementById('email').value.toString();
    const subject = document.getElementById('subject').value.toString();
    const comment = document.getElementById('comment').value.toString();

    const sendStatus = document.getElementById('send-status');
    const messageTheme = document.getElementById('message-theme');
    const messageText = document.getElementById('message-text');

    if (
      username !== '' &&
      email !== '' &&
      email === email.match(/.+@.+/).input
    ) {
      sendStatus.innerText = 'Письмо отправлено! :)';
      if (subject === '') {
        messageTheme.innerText = 'Тема: без темы';
      } else {
        messageTheme.innerText = 'Тема: ' + subject;
      }
      if (comment === '') {
        messageText.innerText = 'Описание: без описания';
      } else {
        messageText.innerText = 'Описание: ' + comment;
      }

      document.getElementById('modal-message').classList.remove('hidden');
      document.body.classList.add('no-scroll');
    }
  });

  btnClose.addEventListener('click', () => {
    document.getElementById('modal-message').classList.add('hidden');
    document.body.classList.remove('no-scroll');
    form.reset();
  });
};

// Button to top
function clickButtonTop() {
  btnTop = document.getElementById('btnTop');

  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      btnTop.style.display = 'block';
    } else {
      btnTop.style.display = 'none';
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  btnTop.addEventListener('click', topFunction);
}

// Scroll
function scrollPage() {
  document.addEventListener('scroll', onScroll);

  function onScroll(e) {
    let sections = document.querySelectorAll('section');
    let links = document.querySelectorAll('#menu a');

    sections.forEach(el => {
      if (
        el.getBoundingClientRect().top <=
        document.documentElement.clientWidth / 3
      ) {
        links.forEach(a => {
          a.classList.remove('active');
          if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
            a.classList.add('active');
          }
        });
      }
    });
  }
}

// Hamburger menu
const addHamburgerClickHandler = () => {
  document.addEventListener('click', e => {
    let val = [...e.target.classList];
    let menu = document.querySelector('.header__navigation');
    let logo = document.querySelector('.logo');

    val.forEach(item => {
      if (
        item == 'hamburger' ||
        item == 'hamburger__line' ||
        item == 'overlay' ||
        item == 'menu-link'
      ) {
        menu.classList.toggle('hamburger__menu_open');

        document
          .getElementById('hamburger-menu-overlay')
          .classList.toggle('overlay');

        document
          .querySelector('.hamburger')
          .classList.toggle('hamburger__rotate');

        if (menu.classList.contains('hamburger__menu_open')) {
          logo.style.marginLeft = '35px';
        } else {
          logo.style.marginLeft = '';
        }
      }
    });
  });
};
