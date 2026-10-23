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
    item.append(document.createTextNode(": "));
    const span = document.createElement("span");
    span.innerHTML = area.items.join(", ");
    item.append(span);
    list.append(item);
  });
};

const renderExperience = (items, containerSelector = "#experience-list") => {
  const list = document.querySelector(containerSelector);

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

    if (item.period || item.location) {
      const meta = document.createElement("p");
      meta.className = "experience-meta";
      meta.textContent = item.period && item.location ? `${item.period} · ${item.location}` : (item.period || item.location);
      details.append(meta);
    }

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

const renderAwards = (items) => {
  const container = document.querySelector("#awards-list");

  items.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "award";

    const title = document.createElement("h3");
    title.className = "award-title";
    title.textContent = item.title;
    wrapper.append(title);

    if (item.description) {
      const description = document.createElement("p");
      description.className = "award-description";
      description.textContent = item.description;
      wrapper.append(description);
    }

    container.append(wrapper);
  });
};

const renderPublications = (items) => {
  const container = document.querySelector("#publications-list");

  const byYear = {};
  items.forEach((item) => {
    const y = item.year || "Other";
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(item);
  });

  const yearRank = (year) => (/^\d+$/.test(year) ? Number(year) : Infinity);
  Object.keys(byYear).sort((a, b) => yearRank(b) - yearRank(a)).forEach((year) => {
    const heading = document.createElement("h2");
    heading.className = "pub-year-heading";
    heading.textContent = year;
    container.append(heading);

    const ol = document.createElement("ol");
    ol.className = "pub-year-list";

    byYear[year].forEach((item) => {
      const li = document.createElement("li");
      li.className = "pub-list-item";

      if (item.image) {
        const media = document.createElement("div");
        media.className = "publication-media pub-list-media";
        const img = document.createElement("img");
        img.src = item.image.src;
        img.alt = item.image.alt;
        media.append(img);
        li.append(media);
      }

      const details = document.createElement("div");

      const title = document.createElement("div");
      title.className = "publication-title";
      title.textContent = item.title;
      details.append(title);

      if (item.authors) {
        const authors = document.createElement("div");
        authors.className = "publication-authors";
        const maxVisible = 6;
        const visible = item.authors.slice(0, maxVisible);
        const hidden = item.authors.length - maxVisible;
        visible.forEach((author, index) => {
          if (index > 0) authors.append(document.createTextNode(", "));
          const span = document.createElement("span");
          if (author.highlight) span.className = "publication-author-highlight";
          span.textContent = author.name + (author.marker || "");
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
        const venueLine = document.createElement("div");
        venueLine.className = "publication-venue";
        if (item.venue) {
          const em = document.createElement("em");
          em.textContent = item.venue;
          venueLine.append(em);
        }
        if (item.venue && item.year) venueLine.append(document.createTextNode(", "));
        if (item.year) venueLine.append(document.createTextNode(item.year));
        if (item.note) venueLine.append(document.createTextNode(` (${item.note})`));
        details.append(venueLine);
      }

      const linksRow = document.createElement("div");
      linksRow.className = "publication-links";

      if (item.abstract) {
        const absBtn = document.createElement("button");
        absBtn.className = "pub-link-btn";
        absBtn.textContent = "Abs";
        const abstractDiv = document.createElement("div");
        abstractDiv.className = "publication-abstract";
        abstractDiv.textContent = item.abstract;
        absBtn.addEventListener("click", () => {
          const hidden = abstractDiv.style.display === "none" || !abstractDiv.style.display;
          abstractDiv.style.display = hidden ? "block" : "none";
        });
        linksRow.append(absBtn);
        details.append(linksRow);
        details.append(abstractDiv);
      } else {
        details.append(linksRow);
      }

      if (item.links) {
        item.links.filter((l) => l.label !== "ABS").forEach((itemLink) => {
          const a = document.createElement("a");
          a.href = itemLink.href;
          a.textContent = itemLink.label;
          a.target = "_blank";
          a.rel = "noreferrer";
          a.className = "pub-link-btn";
          linksRow.append(a);
        });
      }

      li.append(details);
      ol.append(li);
    });

    container.append(ol);
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

if (content.contactEmails) {
  const contactEmails = document.querySelector("#contact-emails");
  content.contactEmails.forEach((email) => {
    const obscuredEmail = email.replace("@", " [AT] ").replace(/\./g, " [DOT] ");
    const p = document.createElement("p");
    p.className = "contact-address";
    p.textContent = obscuredEmail;
    contactEmails.append(p);
  });
}

const intro = document.querySelector("#intro");
content.intro.forEach((line) => intro.append(makeParagraph(line)));

const focusIntro = document.querySelector("#focus-intro");
content.focusIntro.forEach((line) => focusIntro.append(makeParagraph(line)));
if (content.focusAreasIntro) {
  document.querySelector("#focus-areas-intro").append(makeParagraph(content.focusAreasIntro));
}
if (content.focusAreas) renderNestedFocusList(content.focusAreas);
if (content.focusAreasOutro) {
  document.querySelector("#focus-areas-outro").append(makeParagraph(content.focusAreasOutro));
}
if (content.education) renderExperience(content.education, "#education-list");
if (content.experience) renderExperience(content.experience);
renderPublications(content.work);
// Awards section hidden for now; re-enable once ready:
// if (content.awards) renderAwards(content.awards);


document.querySelector("#footer-name").textContent = content.name;
document.querySelector("#footer-year").textContent = new Date().getFullYear();

const sections = Array.from(document.querySelectorAll(".page-section"));
const navItems = Array.from(document.querySelectorAll(".navbar-nav .nav-item"));

const setActiveSection = (id) => {
  navItems.forEach((item) => item.classList.remove("active"));
  const activeLink = document.querySelector(`.section-link[href="#${id}"]`);
  const navItem = activeLink && activeLink.closest(".nav-item");
  if (navItem) navItem.classList.add("active");
};

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}
