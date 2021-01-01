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
        console.log(res);
        return res.json();
      })
      .then((text) => {
        if (url === '/api/auth/signin')
          localStorage.setItem('accessToken', text.accessToken);
        console.log(text);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
