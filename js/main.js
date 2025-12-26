// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('active');
  });
});
reveals.forEach(el => observer.observe(el));

// Slider
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const total = slideItems.length;

let index = 0;

document.querySelector('.next').addEventListener('click', () => move(1));
document.querySelector('.prev').addEventListener('click', () => move(-1));

function move(step) {
  index += step;

  if (index < 0) index = total - 1;
  if (index >= total) index = 0;

  slides.style.transform = `translateX(-${index * 100}%)`;
}


// Before After
const slider = document.querySelector('.ba-slider');
const after = document.querySelector('.after');

slider.addEventListener('input', e => {
  after.style.clipPath = `inset(0 0 0 ${e.target.value}%)`;
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});


const form = document.getElementById('contactForm');
const statusText = document.getElementById('formStatus');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Lengkapi semua field.');
    return;
  }

  const waNumber = '6289525121811';
  const waText = `Halo, saya ${name}\nEmail: ${email}\nPesan: ${message}`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  window.open(waUrl, '_blank');

  statusText.innerText = "Mengirim pesan...";

  emailjs.send("service_rjrvylc", "template_l429qut", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    statusText.innerText = "Pesan berhasil dikirim!";
    alert("Pesan berhasil dikirim!");
  })
  .catch(err => {
    console.error(err);
    statusText.innerText = "Pesan terkirim ke WhatsApp. Email gagal.";
    alert("Pesan terkirim ke WhatsApp. Email gagal.");
  });

  form.reset();
});
