
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.querySelector(".projects-grid");
  const allCards = document.querySelectorAll(".project-card");

 
  const techTags = new Set();
  allCards.forEach((card) => {
    card.querySelectorAll(".tech-tag").forEach((tag) => {
      techTags.add(tag.textContent.trim());
    });
  });


  let filterButtonsHTML =
    '<button class="filter-btn active" data-tech="all">All</button>';
  techTags.forEach((tag) => {
    filterButtonsHTML += `<button class="filter-btn" data-tech="${tag}">${tag}</button>`;
  });

  
  const filterControls = document.createElement("div");
  filterControls.className = "filter-controls";
  filterControls.innerHTML = filterButtonsHTML;

  projectsGrid.parentNode.insertBefore(filterControls, projectsGrid);

  
  filterControls.addEventListener("click", (e) => {
  
    if (!e.target.classList.contains("filter-btn")) {
      return;
    }


    filterControls
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));


    const clickedBtn = e.target;
    clickedBtn.classList.add("active");

    const filterValue = clickedBtn.dataset.tech;

 
    filterProjects(filterValue);
  });

  function filterProjects(filterValue) {
    allCards.forEach((card) => {
 
      if (filterValue === "all") {
        card.style.display = ""; 
        return;
      }


      const cardTags = Array.from(card.querySelectorAll(".tech-tag")).map(
        (tag) => tag.textContent.trim()
      );

      if (cardTags.includes(filterValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none"; 
      }
    });
  }
});