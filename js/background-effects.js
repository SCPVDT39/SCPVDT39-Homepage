
/* ========================================
   SCPVDT39 Background Events
======================================== */

(() => {
    // 同じページに二重でイベントを登録しない
    if (document.getElementById("background-car-event")) return;

    // 車の表示要素を作る
    const car = document.createElement("div");
    car.id = "background-car-event";
    car.textContent = "🚗";
    car.setAttribute("aria-hidden", "true");

    Object.assign(car.style, {
        position: "fixed",
        left: "0",
        bottom: "12%",
        zIndex: "999",
        fontSize: "48px",
        lineHeight: "1",
        pointerEvents: "none",
        opacity: "0",
        transform: "translateX(-100px)",
        whiteSpace: "nowrap"
    });

    document.body.appendChild(car);

    // 車を画面の端から端まで走らせる
    function runCarEvent() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        car.style.transition = "none";
        car.style.opacity = "1";
        car.style.transform = "translateX(-100px) scaleX(-1)";

        // ブラウザに初期状態を反映させる
        void car.offsetWidth;

        const distance = window.innerWidth + 160;

        car.style.transition = "transform 5s linear";
        car.style.transform = `translateX(${distance}px) scaleX(-1)`;

        window.setTimeout(() => {
            car.style.transition = "none";
            car.style.opacity = "0";
        }, 5100);
    }

    // ページを開いてから5分後に最初のイベントを発生させる
window.setTimeout(runCarEvent, 5 * 60 * 1000);

    // 以降は5分ごとに発生
    window.setInterval(runCarEvent, 5 * 60 * 1000);
})();
