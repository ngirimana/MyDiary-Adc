const dialogbox = (message) => { // Get the modal
  const modal = document.querySelector('#dialogbox');

  const divMsg = document.querySelector('.dialog-content-ex');


  divMsg.textContent = message;
  // Display the modal
  modal.style.display = 'block';
};
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};