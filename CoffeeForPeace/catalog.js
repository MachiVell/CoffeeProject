const filterButtons = document.querySelectorAll('.filters button');
const productCards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    filterButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    const filter = button.textContent.toLowerCase();

    productCards.forEach(card => {
      const tags = card.getAttribute('data-tags').toLowerCase();

      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
