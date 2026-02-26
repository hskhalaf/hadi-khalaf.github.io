# Hadi Khalaf – Personal site

Academic personal site (Next.js, Tailwind).

**Run locally**

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**. Edits to `src/` will auto-reload.

If changes don’t update automatically: (1) use `npm run dev` (not `npm run start`); (2) if you see “too many open files”, run `ulimit -n 10240` then `npm run dev` again; (3) or clear the cache with `rm -rf .next` and restart `npm run dev`.

If `npm run dev` fails (e.g. “too many open files” or network errors), use the production build:

```bash
npm run build
npm run start
```

**Previous design**

The old design is in the `previous-design/` folder (local only, not in this repo).
