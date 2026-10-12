// ==============================
// ELEMENTOS
// ==============================

const section =
    document.querySelector(".laptops-scroll-section");

const laptop =
    document.querySelector(".laptop-mockup");

const screen =
    document.querySelector(".laptop-screen");

const image1 =
    document.querySelector(".process-image-1");

const image2 =
    document.querySelector(".process-image-2");


// ==============================
// ACTUALIZAR NOTEBOOK
// ==============================

function updateLaptop() {

    // ==============================
    // POSICIÓN DE LA SECCIÓN
    // ==============================

    const sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY;

    const sectionHeight =
        section.offsetHeight;

    const maxScroll =
        sectionHeight -
        window.innerHeight;

    const currentScroll =
        window.scrollY -
        sectionTop;


    // ==============================
    // PROGRESO GENERAL
    // ==============================

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                currentScroll / maxScroll
            )
        );


    // ==============================
    // CENTRAR NOTEBOOK
    // ==============================

    const laptopWidth =
        laptop.getBoundingClientRect().width;

    const centerX =
        (window.innerWidth - laptopWidth) / 2;

    laptop.style.left =
        `${centerX}px`;


    // ==============================
    // ALTURA DE SCROLL IMAGEN 2
    // ==============================

    const maxScroll2 =
        Math.max(
            0,
            image2.offsetHeight -
            screen.offsetHeight
        );


    // ==============================
    // FASE 1
    // 0 → 15%
    //
    // IMAGEN 1
    // ==============================

    if (progress < 0.15) {

        image1.style.opacity = 1;

        image2.style.opacity = 0;

        image2.style.transform =
            "translateY(0px)";
    }


    // ==============================
    // FASE 2
    // 15 → 16%
    //
    // CAMBIO BRUSCO
    // ==============================

    else if (progress < 0.16) {

        image1.style.opacity = 0;

        image2.style.opacity = 1;

        image2.style.transform =
            "translateY(0px)";
    }


    // ==============================
    // FASE 3
    // 16 → 100%
    //
    // SCROLL IMAGEN 2
    // ==============================

    else {

        const p =
            (progress - 0.16) / 0.84;


        image1.style.opacity = 0;

        image2.style.opacity = 1;


        image2.style.transform =
            `translateY(${-maxScroll2 * p}px)`;
    }

}


// ==============================
// EVENTOS
// ==============================

window.addEventListener(
    "scroll",
    updateLaptop
);

window.addEventListener(
    "resize",
    updateLaptop
);


// ==============================
// CARGA INICIAL
// ==============================

if (
    image1.complete &&
    image2.complete
) {

    updateLaptop();

} else {

    image1.addEventListener(
        "load",
        updateLaptop
    );

    image2.addEventListener(
        "load",
        updateLaptop
    );
}