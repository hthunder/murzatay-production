export const addFavourite = () => {
  let favouriteBtn = document.querySelector('.add-favourite');

  if (favouriteBtn) {
    favouriteBtn.onclick = function () {
      // fetch()
      if (favouriteBtn.classList.contains('add-favourite-active')) {
        favouriteBtn.classList.remove('add-favourite-active');
      } else {
        favouriteBtn.classList.add('add-favourite-active');
      }
    };
  }

  // const myForm = document.getElementById(formId);

  // myForm.addEventListener('submit', function (e) {
  //   e.preventDefault();

  //   const formData = new FormData(this);

  //   fetch(url, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(Object.fromEntries(formData))
  //   })
  //     .then((res) => {
  //       if (res.redirected) window.location.href = res.url;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });
};
