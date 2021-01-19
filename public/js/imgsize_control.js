let imgInput = document.getElementById('image');
let submitBtn = document.querySelector('.edit__submit');

const imgsize_control = (size_kb) => {
  return function () {
    if (this.files[0].size > size_kb * 1024) {
      alert('Размер файла превышает допустимые 20кб');
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  };
};

imgInput.onchange = imgsize_control(20);
