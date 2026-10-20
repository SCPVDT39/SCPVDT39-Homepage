console.log("SCPVDT39 Website");
// ====================
// Theme Toggle
// ====================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        if (isLight) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        }

    });

}
// ====================
// Hamburger Menu
// ====================

const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = siteNav.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // メニューを選択したら閉じる

    siteNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            siteNav.classList.remove("open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });
    document.addEventListener("click", (event) => {
    if (!siteNav.classList.contains("open")) {
        return;
    }

    if (
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        siteNav.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

}
// ====================
// Active Navigation
// ====================

const currentPath = window.location.pathname;

document.querySelectorAll(".site-nav a").forEach(link => {

    const linkPath = new URL(link.href).pathname;

    if (currentPath === linkPath) {
        link.classList.add("active");
    }

});
// ====================
// Back To Top
// ====================

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ====================
// Image Lightbox
// ====================

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

const lightboxTriggers =
    document.querySelectorAll(".lightbox-trigger");

let currentImageIndex = 0;


if (
    lightbox &&
    lightboxImage &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
) {

    const updateLightbox = () => {

        const image = lightboxTriggers[currentImageIndex];

        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        // 画像が1枚だけならボタンを隠す
        if (lightboxTriggers.length <= 1) {

            lightboxPrev.style.display = "none";
            lightboxNext.style.display = "none";

        } else {

            lightboxPrev.style.display = "block";
            lightboxNext.style.display = "block";

        }

    };


    lightboxTriggers.forEach((image, index) => {

        image.addEventListener("click", () => {

            currentImageIndex = index;

            updateLightbox();

            lightbox.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


    const closeLightbox = () => {

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

    };


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightboxPrev.addEventListener("click", () => {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex =
                lightboxTriggers.length - 1;

        }

        updateLightbox();

    });


    lightboxNext.addEventListener("click", () => {

        currentImageIndex++;

        if (
            currentImageIndex >=
            lightboxTriggers.length
        ) {

            currentImageIndex = 0;

        }

        updateLightbox();

    });


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("show")) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            currentImageIndex--;

            if (currentImageIndex < 0) {

                currentImageIndex =
                    lightboxTriggers.length - 1;

            }

            updateLightbox();

        }


        if (event.key === "ArrowRight") {

            currentImageIndex++;

            if (
                currentImageIndex >=
                lightboxTriggers.length
            ) {

                currentImageIndex = 0;

            }

            updateLightbox();

        }

    });

}
// ====================
// MOD Contact Form
// ====================

const modContactForm =
    document.getElementById("mod-contact-form");

const contactSuccess =
    document.getElementById("contact-success");


if (modContactForm && contactSuccess) {

    modContactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const accountType =
                document.getElementById("account-type").value;

            const accountName =
                document.getElementById("account-name").value;

            const message =
                document.getElementById("contact-message").value;


            const submitButton =
                modContactForm.querySelector(
                    'button[type="submit"]'
                );


            submitButton.disabled = true;
            submitButton.textContent = "送信中…";


            try {

                await fetch(
                    "https://script.google.com/macros/s/AKfycbzbtoHVQGuV0g8ftJGTFdgPlYKICNWImp2oW0ulJZzC0JXW_MwENAwEvUTUbHHI-tEZ/exec",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "text/plain;charset=utf-8"
                        },

                        body: JSON.stringify({

                            accountType:
                                accountType,

                            accountName:
                                accountName,

                            message:
                                message

                        })

                    }
                );


                modContactForm.hidden = true;

                contactSuccess.hidden = false;

                window.scrollTo({
                    top:
                        contactSuccess.offsetTop - 100,
                    behavior: "smooth"
                });


            } catch (error) {

                console.error(error);

                alert(
                    "送信に失敗しました。\n時間をおいて、もう一度お試しください。"
                );


                submitButton.disabled = false;

                submitButton.textContent = "送信";

            }

        }
    );

}
// ====================
// External Link Confirmation
// ====================

const externalLinkModal =
    document.getElementById("external-link-modal");

const externalLinkCancel =
    document.getElementById("external-link-cancel");

const externalLinkGo =
    document.getElementById("external-link-go");

const externalLinks =
    document.querySelectorAll(".external-link");

let externalLinkTarget = "";


if (
    externalLinkModal &&
    externalLinkCancel &&
    externalLinkGo
) {

    externalLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            externalLinkTarget = link.href;

            externalLinkModal.hidden = false;

            document.body.style.overflow = "hidden";

        });

    });


    externalLinkCancel.addEventListener(
        "click",
        () => {

            externalLinkModal.hidden = true;

            externalLinkTarget = "";

            document.body.style.overflow = "";

        }
    );


    externalLinkGo.addEventListener(
        "click",
        () => {

            if (externalLinkTarget) {

                window.location.href =
                    externalLinkTarget;

            }

        }
    );

}