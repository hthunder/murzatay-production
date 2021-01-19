let imgInput = document.getElementById("image");
let submitBtn = document.querySelector('.edit__submit');

imgInput.onchange = function(){
   if(this.files[0].size > 20500){
      alert("Размер файла превышает допусимые 20кб");
      submitBtn.disabled = true;
   } else {
      submitBtn.disabled = false;
   }
}

