# Resonance — The Hans Zimmer Collection

A responsive, dependency-free film discovery site built for GitHub Pages.

- 20-question preference survey, with browser-local progress and 3–5 ranked films.
- 12 curated Hans Zimmer films, with co-composer credits where applicable.
- Five-round soundtrack-title and musical-clue game with randomized choices and scoring.
- Optional YouTube search links for authentic soundtrack listening. No bundled music, API key, or auto-playing audio.
- Keyboard support, reduced-motion support, and responsive layouts.

## Develop

Use the existing checkout; cloud tasks are already isolated and do not need a new worktree.

```sh
cd /workspace/Hanszimmer
python3 -m http.server 8000 --bind 0.0.0.0
```

There is no dependency installation or build step. Serve the repository root. Survey answers stay in the current browser; reset them with “Take the survey again.” Recommendations use deterministic tag matching, not an external AI service.

## GitHub Pages

In the repository’s **Settings → Pages**, choose **GitHub Actions** as the source. Push these files to `main`, or run the **Deploy to GitHub Pages** workflow. The included workflow publishes the static root. Relative assets work at `/Hanszimmer/` or a custom domain. Deployment requires repository Pages permissions and has not been performed by local setup.

## Validation

With Playwright available in the development environment:

```sh
node tests/smoke.cjs
```

Start the local server first. The smoke test checks survey completion and persistence, result counts, restart, all five game rounds, replay, and mobile horizontal overflow. It also serves the app below `/Hanszimmer/` to check project-site paths.

This independent fan project is not affiliated with Hans Zimmer. Soundtracks belong to their respective rights holders. Listening is provided through external searches; availability varies by region and provider.
