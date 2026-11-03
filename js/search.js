
(() => {
    const form = document.getElementById("site-search-form");
    const input = document.getElementById("site-search-input");
    const panel = document.getElementById("site-search-panel");
    const status = document.getElementById("site-search-status");
    const results = document.getElementById("site-search-results");
    const closeButton = document.getElementById("site-search-close");

    if (!form || !input || !panel || !status || !results) return;

    const pages = [
        { path: "index.html" },
        { path: "pages/about.html" },
        { path: "pages/mods.html" },
        { path: "pages/games.html" },
        { path: "pages/works.html" },
        { path: "pages/sns.html" },
        { path: "pages/jear.html" }
    ];

    // 現在のページに応じて、サイトルートからのURLを組み立てる
    const currentPath = location.pathname;
    const marker = "/pages/";
    const rootPath = currentPath.includes(marker)
        ? currentPath.slice(0, currentPath.indexOf(marker) + 1)
        : currentPath.slice(0, currentPath.lastIndexOf("/") + 1);

    const normalizedPages = pages.map(page => ({
        path: rootPath + page.path
    }));

    let searchIndex = [];
    let ready = false;

    async function loadIndex() {
        const loaded = await Promise.all(
            normalizedPages.map(async page => {
                try {
                    const response = await fetch(page.path);
                    if (!response.ok) return null;

                    const html = await response.text();
                    const doc = new DOMParser().parseFromString(html, "text/html");
                    const title = doc.querySelector("title")?.textContent.trim() || page.path;
                    const main = doc.querySelector("main") || doc.body;
                    const content = main.cloneNode(true);

                    content.querySelectorAll(
                        "script, style, nav, button, form"
                    ).forEach(element => element.remove());

                    const text = content.textContent.replace(/\s+/g, " ").trim();
                    const description =
                        doc.querySelector('meta[name="description"]')?.content || "";

                    return {
                        path: page.path,
                        title,
                        content: `${description} ${text}`.trim(),
                        searchable: `${title} ${description} ${text}`.toLocaleLowerCase()
                    };
                } catch (error) {
                    console.warn("検索対象ページの読み込みに失敗:", page.path, error);
                    return null;
                }
            })
        );

        searchIndex = loaded.filter(Boolean);
        ready = true;
    }

    function renderResults(matches, keyword) {
        results.replaceChildren();

        if (matches.length === 0) {
            status.textContent = `「${keyword}」に一致するページは見つかりませんでした。`;
            return;
        }

        status.textContent = `${matches.length}件のページが見つかりました。`;

        matches.forEach(page => {
            const link = document.createElement("a");
            link.className = "site-search-result";
            link.href = page.path;

            const heading = document.createElement("h3");
            heading.textContent = page.title;

            const description = document.createElement("p");
            const lowerContent = page.content.toLocaleLowerCase();
            const position = lowerContent.indexOf(keyword.toLocaleLowerCase());

            if (position >= 0) {
                const start = Math.max(0, position - 40);
                const end = Math.min(page.content.length, position + keyword.length + 90);
                description.textContent =
                    (start > 0 ? "…" : "") +
                    page.content.slice(start, end) +
                    (end < page.content.length ? "…" : "");
            } else {
                description.textContent = page.content.slice(0, 130);
            }

            link.append(heading, description);
            results.appendChild(link);
        });
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const keyword = input.value.trim().toLocaleLowerCase();
        panel.hidden = false;
        results.replaceChildren();

        if (!keyword) {
            status.textContent = "検索キーワードを入力してください。";
            input.focus();
            return;
        }

        if (!ready) {
            status.textContent = "ページを読み込んでいます。少し待ってから再検索してください。";
            return;
        }

        const matches = searchIndex.filter(page => page.searchable.includes(keyword));
        renderResults(matches, keyword);
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    closeButton?.addEventListener("click", () => {
        panel.hidden = true;
    });

    loadIndex().then(() => {
        if (!ready) return;
        status.textContent = "キーワードを入力して検索できます。";
    });
})();
