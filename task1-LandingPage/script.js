let tl=gsap.timeline()

tl.from("#nav h1, #nav i", {
  opacity: 0,
  y: 40,
  delay: 0.3,
  duration: 1,
    // stagger:0.1
  ease:"Power1.out"
});

tl.add('eksath');
tl.from("#img1,#img3,#img5", {
  opacity: 0,
  y: 70,
  duration: 1.7,
  ease: "Power3.out",
  //   stagger: 0.1,
},'eksath');
tl.from("#img2,#img4", {
  opacity: 0,
  y: 70,
  duration: 0.9,
  ease: "Power3.out",
  //   stagger: 0.1,
},'eksath');
tl.from("#foot h3", {
  opacity: 0,
  x: -30,
  duration: 0.5,
  stagger: 0.1,
});
tl.from("#leftmove i ,#rightmove i", {
  opacity: 0,
  x: -15,
  duration: 0.5,
  stagger: 0.1,
  ease: "Power3.out",
});
tl.from("#center h1", {
  opacity: 0,
  x: -40,
  duration: 0.7,
  ease: "Power3.out",
});
tl.from("#sidebar", {
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.3,
  ease: "Power3.out",
});
tl.to('#img3 ,#img1', {
    
})

//hover
const logo = document.querySelector("#nav h1");
const hover = gsap.to(logo, {
  scaleX: 1.12,
  scaleY: 1.12,
  scaleZ: 1.5,
//   color: 'springgreen',
  duration: 1.5,
  paused: true,
  ease: "ease-in-out",
});

logo.addEventListener("mouseenter", () => hover.play());
logo.addEventListener("mouseleave", () => hover.reverse());