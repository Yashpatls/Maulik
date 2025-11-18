// Simple front-end login (demo). Replace credentials below.

if(!sessionStorage.getItem('formFilled')){
  window.location.href = 'form.html';
}

const VALID_ID = 'maulik';
const VALID_PW = '1234';



document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('loginId').value.trim();
  const pw = document.getElementById('password').value;
  if(id === VALID_ID && pw === VALID_PW){
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = 'portfolio.html';
  }else{
    alert('Invalid ID or password');
  }
});



const pwInput = document.getElementById('password');
const togglePw = document.getElementById('togglePw');
if(togglePw){
  togglePw.addEventListener('click', ()=>{
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  });
}