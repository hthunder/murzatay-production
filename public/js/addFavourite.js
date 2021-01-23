export const addFavourite = () => {
  let favouriteBtn = document.querySelector('.add-favourite');

  if (favouriteBtn) {
    favouriteBtn.onclick = async function () {
      const articleId = favouriteBtn.dataset.articleId;
      const userId = favouriteBtn.dataset.userId;
      try {
        const res = await fetch(`/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ favourites: `${articleId}` })
        });
        const data = await res.json();
        if (
          (data.favourites &&
            !favouriteBtn.classList.contains('add-favourite-active')) ||
          (!data.favourites &&
            favouriteBtn.classList.contains('add-favourite-active'))
        ) {
          favouriteBtn.classList.toggle('add-favourite-active');
        }
      } catch (e) {
        console.log(e);
      }
    };
  }
};
