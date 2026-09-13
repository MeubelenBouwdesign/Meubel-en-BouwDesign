/*
====================================================================
LOGO-ANIMATION.JS
Een doorlopende, rustige standaardanimatie voor het logo op de
"Over ons" pagina — géén inlaad-/reveal-animatie. Het logo is meteen
zichtbaar en zweeft heel soepel op en neer.

Belangrijk voor de soepelheid:
  · alleen 'translate3d' (GPU-versneld) → geen repaints, geen haperen
  · geen continue schaal-beweging (die laat een afbeelding "trillen")
Houdt rekening met 'prefers-reduced-motion' van de bezoeker.
====================================================================
*/

(function () {
    const logo = document.getElementById('brandLogo');
    if (!logo) return;

    const reduceMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // logo direct zichtbaar maken (de CSS zet 'm op opacity 0)
    logo.style.opacity = '1';

    // hints voor een eigen, GPU-versnelde laag → boterzacht
    logo.style.willChange = 'transform';
    logo.style.backfaceVisibility = 'hidden';
    logo.style.transform = 'translateZ(0)';

    if (reduceMotion) {
        logo.style.transform = 'none';
        return;
    }

    // instellingen
    const amplitude = 6;   // hoogte van het zweven in px (hoger = zichtbaarder)
    const speed = 0.85;    // tempo (lager = trager/rustiger)

    let startTime = null;

    function animateLoop(timestamp) {
        if (startTime === null) startTime = timestamp;
        const t = (timestamp - startTime) / 1000; // seconden

        // zachte, doorlopende sinusbeweging — heel soepel
        const y = Math.sin(t * speed) * amplitude;

        // alleen translate3d → de browser houdt dit op de GPU, geen haperen
        logo.style.transform = 'translate3d(0, ' + y.toFixed(2) + 'px, 0)';

        requestAnimationFrame(animateLoop);
    }

    requestAnimationFrame(animateLoop);
})();