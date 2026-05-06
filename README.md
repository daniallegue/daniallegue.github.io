# Personal Homepage

A small, editable personal homepage inspired by a clean academic profile layout, with a blue visual tone and GitHub Pages-friendly static files.

## Edit Your Content

Most personal content lives in `content.js`:

- `name` and `tagline`
- portrait image URL and alt text
- intro paragraphs
- contact links
- selected publications or projects
- beyond-work interests
- blog post previews

You can replace the placeholder portrait with a local image by adding it to an `assets` folder and setting:

```js
src: "assets/your-photo.jpg"
```

## Preview Locally

Open `index.html` in a browser, or run a tiny static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish With GitHub Pages

1. Push this repository to GitHub.
2. In the GitHub repo, open `Settings`.
3. Go to `Pages`.
4. Set the source to `Deploy from a branch`.
5. Choose the `main` branch and `/root`.

Your page will be available at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
