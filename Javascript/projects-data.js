// ===========================================================
// PROJECT DATA — Meubel & Bouw Design
// -----------------------------------------------------------
// Hier kunt u eenvoudig projecten toevoegen, wijzigen of verwijderen.
// Structuur per project:
//    id          — uniek id (vrij te kiezen)
//    title       — naam van het project
//    cover       — hoofdfoto (op de kaart in het overzicht)
//    description — uitleg in het detailvenster
//    images      — array met foto's voor de slider/carousel
//
// "bouw" en "meubel" → lijst van projecten (items[])
// "uitgelichtBouw" en "uitgelichtMeubel" → één project (single)
//
// Dit bestand wordt gebruikt door our-projects.html en moet vóór
// website.js geladen worden (website.js leest window.MBD_PROJECTS
// meteen bij het opstarten van de projectgalerij).
// ===========================================================
window.MBD_PROJECTS = {

    bouw: {
        label: "Onze",
        title: "Bouwprojecten",
        items: [
            {
                id: "bouw-1",
                title: "Gevelbekleding - Red Cedar",
                cover: "../Images/Bouw/intro2-img2-2.jpg",
                description: "Red Cedar gevelbekleding geeft deze woning een warme, natuurlijke en stijlvolle uitstraling. De horizontale lijnen zorgen voor een strak en modern gevelbeeld. In combinatie met de grote glaspartijen ontstaat een luxe en tijdloze afwerking.",
                images: [
                    "../Images/Bouw/intro2-img2-2.jpg",
                ]
            },
            {
                id: "bouw-2",
                title: "Kunstof Gevelbekleding",
                cover: "../Images/Bouw/bouw-prj2-f1.jpeg",
                description: "Kunststof gevelbekleding met karakter: strak, duurzaam en tot in detail afgewerkt.\n" +
                    "De warme uitstraling en verfijnde belijning zorgen voor een moderne gevel met blijvende klasse.",
                images: [
                    "../Images/Bouw/bouw-prj2-f1.jpeg",
                ]
            },

            {
                id: "bouw-3",
                title: "Badkamer Renovatie",
                cover: "../Images/Douche/Douche1.jpeg",
                description: "Een moderne badkamer met een rustige en luxe uitstraling. De combinatie van strakke afwerking, warme materialen en stijlvolle tegels zorgt voor een mooi geheel.",
                images: [
                    "../Images/Douche/Douche1.jpeg",
                    "../Images/Douche/Douche2.jpeg",
                    "../Images/Wastafel/Wastafel1.jpeg"
                ]
            },

            {
                id: "bouw-4",
                title: "Erker",
                cover: "../Images/Erker/Erker1.jpeg",
                description: "Deze Erker brengt extra licht in de woning en geeft de gevel meer diepte. De afwerking is rustig, netjes en passend bij de bestaande bouw.",
                images: [
                    "../Images/Erker/Erker1.jpeg",
                    "../Images/Erker/Erker2.jpeg",
                    "../Images/Erker/Erker3.jpeg"
                ]
            },

            {
                id: "bouw-5",
                title: "Ruimtebesparing Toilet",
                cover: "../Images/Toilet/Toilet1.jpeg",
                description: "In deze compacte toiletruimte is gekozen voor een slimme indeling met een hangend toilet en een smalle kraan. De donkere wandtegels geven de ruimte een rustige basis, terwijl het houtaccent zorgt voor een warme uitstraling.",
                images: [
                    "../Images/Toilet/Toilet1.jpeg",
                ]
            },


            {
                id: "bouw-6",
                title: "Ombouw Elektrische haard",
                cover: "../Images/Houtkachel/Houtkachel.jpeg",
                description: "Deze haardombouw geeft de woonkamer een duidelijk middelpunt en zorgt direct voor meer sfeer. Door de eenvoudige belijning blijft de uitstraling rustig, modern en tijdloos.",
                images: [
                    "../Images/Houtkachel/Houtkachel.jpeg"
                ]
            },




        ]
    },


    meubel: {
        label: "Onze",
        title: "Meubelprojecten",
        items: [
            {
                id: "meubel-1",
                title: "TV Kast op maat",
                cover: "../Images/TV_kast/TV-kast1.jpeg",
                description: "Deze tv-kast laat zien wat maatwerk kan toevoegen aan een interieur: rust, uitstraling en praktische opbergruimte in één meubel.",
                images: [
                    "../Images/TV_kast/TV-kast1.jpeg",
                    "../Images/TV_kast/TV-kast2.jpeg"
                ]
            },
            {
                id: "meubel-2",
                title: "Inloopkast op maat",
                cover: "../Images/Our-projects-images/meubel-prj2-f1.png",
                description: "Van rommel naar rust. Deze op maat gemaakte inloopkast biedt een perfecte balans tussen luxe uitstraling, slimme opbergruimte en dagelijks gemak. Maatwerk dat jouw woning naar een hoger niveau tilt.",
                images: [
                    "../Images/Kledingkast/Kast1.jpeg",
                    "../Images/Kledingkast/Kast2.jpeg",
                    "../Images/Kledingkast/Kast3.jpeg",
                    "../Images/Kledingkast/Kast4.jpeg",
                    "../Images/Kledingkast/Kast5.jpeg",
                    "../Images/Kledingkast/Kast-tekening.jpeg",
                ]
            },

            // Voeg hier extra meubelprojecten toe

        ]
    },

    uitgelichtBouw: {
        label: "Uitgelicht",
        title: "Bouwproject",
        single: {
            id: "uitg-bouw",
            title: "Gerenoveerde Badkamer",
            cover: "../Images/Bouw/meubel2.png",
            description: "Ons uitgelichte bouwproject: Deze gerenoveerde badkamer is ontworpen met oog voor comfort, rust en afwerking. De donkere details, warme houttinten en ruime douche geven de ruimte een moderne uitstraling met een luxe gevoel.\n",
            images: [
                "../Images/Our-projects-images/uitg-bouw.png"
            ]
        }
    },

    uitgelichtMeubel: {
        label: "Uitgelicht",
        title: "Meubelproject",
        single: {
            id: "uitg-meubel",
            title: "Op maat gemaakte Kledingkast",
            cover: "../Images/bouw-foto1.png",
            description: "Ons uitgelichte meubelproject: een op maat gemaakte kledingkast waarin fijn vakmanschap, en kwalitatieve materialen samen komen tot uw droom-meubel.",
            images: [
                "../Images/Our-projects-images/uitgelicht-meubel.png",
                "../Images/Our-projects-images/uitg-meubel2.png",
                "../Images/Our-projects-images/uitg-meubel3.png",
                "../Images/Our-projects-images/uitg-meubel4.png"
            ]
        }
    }

};