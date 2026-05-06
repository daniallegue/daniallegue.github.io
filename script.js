const content = window.siteContent;

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const paragraph = (text) => {
  const element = document.createElement("p");
  element.textContent = text;
  return element;
};

const externalLink = (label, href) => {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  if (href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  return link;
};

const renderItem = ({ title, href, venue, authors, date, summary }) => {
  const article = document.createElement("article");
  article.className = "item";

  const heading = document.createElement("h3");
  heading.append(externalLink(title, href));

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = [date, venue, authors].filter(Boolean).join(" / ");

  const description = document.createElement("p");
  description.className = "summary";
  description.textContent = summary;

  article.append(heading, meta, description);
  return article;
};

setText("[data-content='name']", content.name);
setText("[data-content='tagline']", content.tagline);
document.title = content.name;

const portrait = document.querySelector("#portrait");
portrait.src = content.portrait.src;
portrait.alt = content.portrait.alt;

const intro = document.querySelector("#intro");
content.intro.forEach((line) => intro.append(paragraph(line)));

const socialLinks = document.querySelector("#social-links");
content.links.forEach((link) => socialLinks.append(externalLink(link.label, link.href)));

document.querySelector("#publications-note").textContent = content.publicationsNote;

const publications = document.querySelector("#publications-list");
content.publications.forEach((item) => publications.append(renderItem(item)));

const beyond = document.querySelector("#beyond-list");
content.beyond.forEach((item) => {
  const element = document.createElement("li");
  element.textContent = item;
  beyond.append(element);
});

const posts = document.querySelector("#blog-list");
content.posts.forEach((post) => posts.append(renderItem(post)));

document.querySelector("#footer-name").textContent = content.name;
document.querySelector("#footer-year").textContent = new Date().getFullYear();
