const updates = [
    {
        date: "2026/11/03",
        text: "Racing Masterのスクリーンショットを更新"
    },
    {
        date: "2026/11/03",
        text: "Homeの英語版を公開"
    }
];

document.addEventListener("DOMContentLoaded", () => {

    const footer = document.querySelector("footer");

    if (!footer) return;

    const section = document.createElement("section");
    section.className = "update-history";

    section.innerHTML = `
        <h2>更新履歴</h2>
        <div class="update-list">
            ${updates.map(update => `
                <div class="update-item">
                    <time>${update.date}</time>
                    <p>${update.text}</p>
                </div>
            `).join("")}
        </div>
    `;

    footer.before(section);

});