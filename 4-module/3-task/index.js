function highlight(table) {
  let tbody = table.querySelector('tbody');
  let trs = tbody.querySelectorAll('tr');
  
  for (let i = 0; i < trs.length; i++) {
  
  let availableStatus = trs[i].cells[3];
  
  availableStatus.dataset.available === 'true' ? trs[i].classList.add("available") : trs[i].classList.add("unavailable")
  
  
  !availableStatus.hasAttribute('data-available') ? trs[i].setAttribute('hidden','') : false
  
  let genderStatus = trs[i].cells[2];
  
  genderStatus.textContent === "m" ? trs[i].classList.add("male") : trs[i].classList.add("female")
  
  let ageStatus = trs[i].cells[1];
  +ageStatus.innerHTML < 18 ? trs[i].style.textDecoration = "line-through" : false
  
  }
  }
