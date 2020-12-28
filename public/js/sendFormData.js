export const sendForm = (formId, url) => {
  const myForm = document.getElementById(formId);

  myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        console.log(text);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
