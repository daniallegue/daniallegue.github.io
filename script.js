const content = window.siteContent;

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const makeParagraph = (text) => {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = text;
  return paragraph;
};

const makeLink = ({ label, href, icon }) => {
  const link = document.createElement("a");
  link.href = href;
  link.title = label;
  link.setAttribute("aria-label", label);

  if (href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  const iconElement = document.createElement("i");
  iconElement.className = icon;
  iconElement.setAttribute("aria-hidden", "true");
  link.append(iconElement);

  return link;
};

const renderNestedFocusList = (areas) => {
  const list = document.querySelector("#focus-list");

  areas.forEach((area) => {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = area.title;
    item.append(strong);

    const nested = document.createElement("ul");
    area.items.forEach((entry) => {
      const nestedItem = document.createElement("li");
      nestedItem.textContent = entry;
      nested.append(nestedItem);
    });

    item.append(nested);
    list.append(item);
  });
};

const renderExperience = (items) => {
  const list = document.querySelector("#experience-list");

  items.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "experience-item";

    const logoWrapper = document.createElement("div");
    logoWrapper.className = "experience-logo";

    const logo = document.createElement("img");
    logo.src = item.logo.src;
    logo.alt = item.logo.alt;
    if (item.logo.size) logo.style.width = item.logo.size;
    logoWrapper.append(logo);
    wrapper.append(logoWrapper);

    const details = document.createElement("div");
    details.className = "experience-details";

    const company = document.createElement("p");
    company.className = "experience-company";
    company.textContent = item.company;
    details.append(company);

    const role = document.createElement("p");
    role.className = "experience-role";
    role.textContent = item.role;
    details.append(role);

    const meta = document.createElement("p");
    meta.className = "experience-meta";
    meta.textContent = item.location ? `${item.period} · ${item.location}` : item.period;
    details.append(meta);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "experience-description";
      desc.textContent = item.description;
      details.append(desc);
    }

    wrapper.append(details);
    list.append(wrapper);
  });
};

const renderWork = (items) => {
  const work = document.querySelector("#work");

  items.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "publication-item";

    if (item.image) {
      const media = document.createElement("a");
      media.className = "publication-media";
      media.href = item.href;
      media.target = "_blank";
      media.rel = "noreferrer";

      const image = document.createElement("img");
      image.src = item.image.src;
      image.alt = item.image.alt;
      media.append(image);

      if (item.tag) {
        const tag = document.createElement("span");
        tag.className = "publication-tag";
        tag.textContent = item.tag;
        media.append(tag);
      }

      wrapper.append(media);
    }

    const details = document.createElement("div");
    details.className = "publication-details";

    const title = document.createElement("p");
    title.className = "publication-title";
    title.textContent = item.title;
    details.append(title);

    if (item.authors) {
      const authors = document.createElement("p");
      authors.className = "publication-authors";
      const maxVisible = 3;
      const visible = item.authors.slice(0, maxVisible);
      const hidden = item.authors.length - maxVisible;

      visible.forEach((author, index) => {
        if (index > 0) authors.append(document.createTextNode(", "));
        const span = document.createElement("span");
        if (author.highlight) span.className = "publication-author-highlight";
        span.textContent = author.name;
        authors.append(span);
      });

      if (hidden > 0) {
        authors.append(document.createTextNode(", and "));
        const more = document.createElement("span");
        more.className = "publication-more-authors";
        more.textContent = `${hidden} more author${hidden > 1 ? "s" : ""}`;
        authors.append(more);
      }

      details.append(authors);
    }

    if (item.venue || item.year) {
      const venueLine = document.createElement("p");
      venueLine.className = "publication-venue";
      if (item.venue) {
        const em = document.createElement("em");
        em.textContent = item.venue;
        venueLine.append(em);
      }
      if (item.venue && item.year) {
        venueLine.append(document.createTextNode(", "));
      }
      if (item.year) {
        venueLine.append(document.createTextNode(item.year));
      }
      details.append(venueLine);
    }

    if (item.links) {
      const links = document.createElement("div");
      links.className = "publication-links";
      item.links.forEach((itemLink) => {
        const action = document.createElement("a");
        action.href = itemLink.href;
        action.textContent = itemLink.label;
        action.target = "_blank";
        action.rel = "noreferrer";
        links.append(action);
      });
      details.append(links);
    }

    wrapper.append(details);
    work.append(wrapper);
  });
};

document.title = content.name;
setText("[data-content='brandStrong']", content.brandStrong);
setText("[data-content='brandLight']", content.brandLight ? ` ${content.brandLight}` : "");
setText("[data-content='description']", content.description);

const portrait = document.querySelector("#portrait");
portrait.src = content.portrait.src;
portrait.alt = content.portrait.alt;

const portraitAddress = document.querySelector("#portrait-address");
content.links.forEach((link) => {
  const p = document.createElement("p");
  const a = document.createElement("a");
  a.href = link.href;
  a.textContent = link.label === "email" ? link.href.replace("mailto:", "") : link.label;
  if (link.href.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noreferrer";
  }
  p.append(a);
  portraitAddress.append(p);
});

const intro = document.querySelector("#intro");
content.intro.forEach((line) => intro.append(makeParagraph(line)));

const focusIntro = document.querySelector("#focus-intro");
content.focusIntro.forEach((line) => focusIntro.append(makeParagraph(line)));
renderNestedFocusList(content.focusAreas);
if (content.cvPdf) {
  const cvDownload = document.querySelector("#cv-download");
  const a = document.createElement("a");
  a.href = content.cvPdf;
  a.download = "";
  a.className = "cv-download-btn";
  a.setAttribute("aria-label", "Download CV as PDF");
  const icon = document.createElement("i");
  icon.className = "fas fa-file-pdf";
  icon.setAttribute("aria-hidden", "true");
  a.append(icon);
  cvDownload.append(a);
}

renderExperience(content.experience);
renderWork(content.work);


document.querySelector("#footer-name").textContent = content.name;
document.querySelector("#footer-year").textContent = new Date().getFullYear();

const navSectionLabel = document.querySelector("#nav-section-label");

const tabLabels = { home: "", experience: "CV" };
const tabTitles = { experience: "Experience" };

const navbar = document.querySelector("#navbar");

const postTitle = document.querySelector(".post-title");
const postTitleHome = postTitle ? postTitle.innerHTML : "";

const applyTab = (tab) => {
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.querySelector(`#tab-${tab}`).classList.add("active");
  navbar.classList.toggle("nav-home", tab === "home");
  const label = tabLabels[tab] || "";
  navSectionLabel.textContent = label ? ` · ${label}` : "";
  if (postTitle) {
    postTitle.innerHTML = tab === "home" ? postTitleHome : (tabTitles[tab] || label);
  }
};

applyTab("home");

document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const tab = link.dataset.tab;
    applyTab(tab);
    document.querySelectorAll(".navbar-nav .nav-item").forEach((item) => item.classList.remove("active"));
    const navItem = link.closest(".nav-item");
    if (navItem) navItem.classList.add("active");
  });
});
