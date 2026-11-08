# Ardiansah Portfolio (static site, no build step)

Final URL: https://asahphys.github.io
Deployment repository: https://github.com/asahphys/asahphys.github.io (must be named exactly `asahphys.github.io`)

## Structure
index.html · favicon.svg · .nojekyll · data/content.js (ALL your content) · assets/css/styles.css · assets/js/main.js · assets/img/ (portrait.jpg, og.jpg, gallery/)

## Deploy on GitHub Pages
1. Create a new PUBLIC repository named `asahphys.github.io` under your `asahphys` account (github.com/new). If it already exists, clone it and review its contents first; do not overwrite existing work without checking.
2. Copy ALL files from this folder into the repository root, including the hidden `.nojekyll` file, so `index.html` sits at the top level.
3. Commit and push to `main`:
   git add . && git commit -m "Launch portfolio" && git push origin main
4. On GitHub: Settings > Pages > Build and deployment > Source: "Deploy from a branch" > Branch: `main` / `/ (root)` > Save.
5. Wait 1-2 minutes, then open https://asahphys.github.io (tick "Enforce HTTPS" in the same settings page if offered).

## Add photos
Portrait: save as assets/img/portrait.jpg (4:5, under 300 KB). Social preview: assets/img/og.jpg (1200x630, used by LinkedIn/WhatsApp link previews).
Gallery: save images to assets/img/gallery/ (about 1600px wide, JPG/WebP, under 300 KB each), then add or edit a line in `gallery` in data/content.js. Categories become filter buttons automatically.
Commit and push after adding photos.

## Update content
Edit data/content.js only. Replace every TODO with verified information. Projects: set type to research, software or data and add the repo link.
If you add photos in a different format (e.g. .webp), update the file name in data/content.js.
