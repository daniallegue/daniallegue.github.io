const content = window.siteContent;

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const makeParagraph = (text) => {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
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
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.title;
    link.target = "_blank";
    link.rel = "noreferrer";
    title.append(link);
    details.append(title);

    if (item.authors) {
      const authors = document.createElement("p");
      authors.className = "publication-authors";

      item.authors.forEach((author, index) => {
        if (index > 0) {
          authors.append(document.createTextNode(", "));
        }

        const authorElement = document.createElement("span");
        if (author.highlight) {
          authorElement.className = "publication-author-highlight";
        }
        authorElement.textContent = author.name;
        authors.append(authorElement);
      });

      details.append(authors);
    }

    if (item.venue) {
      const venue = document.createElement("p");
      venue.className = "publication-venue";
      venue.textContent = item.venue;
      details.append(venue);
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
setText("[data-content='brandLight']", ` ${content.brandLight}`);
setText("[data-content='description']", content.description);

const portrait = document.querySelector("#portrait");
portrait.src = content.portrait.src;
portrait.alt = content.portrait.alt;

const intro = document.querySelector("#intro");
content.intro.forEach((line) => intro.append(makeParagraph(line)));

const vision = document.querySelector("#vision");
content.vision.forEach((line) => vision.append(makeParagraph(line)));

document.querySelector("#quote").textContent = content.quote;

const focusIntro = document.querySelector("#focus-intro");
content.focusIntro.forEach((line) => focusIntro.append(makeParagraph(line)));
renderNestedFocusList(content.focusAreas);
renderWork(content.work);

const socialLinks = document.querySelector("#social-links");
content.links.forEach((link) => socialLinks.append(makeLink(link)));

document.querySelector("#footer-name").textContent = content.name;
document.querySelector("#footer-year").textContent = new Date().getFullYear();
