import ATBMedia from "@/public/projects/atb-media.png";
import CarGame from "@/public/projects/car-game.png";
import DesignWave from "@/public/projects/design-wave.png";
import FilmHub from "@/public/projects/film-hub.png";
import GymLovers from "@/public/projects/gym-lovers.png";
import Lingo from "@/public/projects/lingo.png";
import MarbleRace from "@/public/projects/marble-race.png";
import MelodiMix from "@/public/projects/melodi-mix.png";

export const notFound = [
  {
    viewBox: "-3.5 -5 60 80",
    d: "M 38.5 70 L 32.2 70 L 32.2 51.8 L 0 51.8 L 0 46.9 L 32.2 0 L 38.5 0 L 38.5 45.9 L 53.6 45.9 L 53.6 51.8 L 38.5 51.8 L 38.5 70 Z M 32.2 10.3 L 7.9 45.9 L 32.2 45.9 L 32.2 10.3 Z",
  },
  {
    viewBox: "-3.5 -5 60 80",
    d: "M 26.901 72.402 Q 19.001 72.402 12.951 67.752 A 28.777 28.777 0 0 1 5.861 59.704 A 37.288 37.288 0 0 1 3.451 54.952 A 42.772 42.772 0 0 1 0.571 44.42 A 56.831 56.831 0 0 1 0.001 36.202 A 55.442 55.442 0 0 1 0.81 26.509 A 41.976 41.976 0 0 1 3.451 17.452 A 35.281 35.281 0 0 1 7.403 10.378 A 27.921 27.921 0 0 1 12.951 4.652 Q 19.001 0.002 26.901 0.002 Q 34.801 0.002 40.851 4.652 A 28.777 28.777 0 0 1 47.94 12.701 A 37.288 37.288 0 0 1 50.351 17.452 A 42.772 42.772 0 0 1 53.23 27.985 A 56.831 56.831 0 0 1 53.801 36.202 A 55.442 55.442 0 0 1 52.991 45.896 A 41.976 41.976 0 0 1 50.351 54.952 A 35.281 35.281 0 0 1 46.398 62.027 A 27.921 27.921 0 0 1 40.851 67.752 Q 34.801 72.402 26.901 72.402 Z M 26.901 66.602 Q 32.901 66.602 37.551 62.702 A 22.699 22.699 0 0 0 42.35 57.031 A 30.84 30.84 0 0 0 44.801 51.952 Q 47.401 45.102 47.401 36.202 A 52.033 52.033 0 0 0 46.829 28.309 A 38.585 38.585 0 0 0 44.801 20.452 A 30.485 30.485 0 0 0 42.133 15.023 A 22.531 22.531 0 0 0 37.551 9.702 Q 32.901 5.802 26.901 5.802 Q 20.901 5.802 16.251 9.702 A 22.699 22.699 0 0 0 11.451 15.374 A 30.84 30.84 0 0 0 9.001 20.452 Q 6.401 27.302 6.401 36.202 A 52.033 52.033 0 0 0 6.972 44.096 A 38.585 38.585 0 0 0 9.001 51.952 A 30.485 30.485 0 0 0 11.668 57.382 A 22.531 22.531 0 0 0 16.251 62.702 Q 20.901 66.602 26.901 66.602 Z",
  },
  {
    viewBox: "-3.5 -5 60 80",
    d: "M 38.5 70 L 32.2 70 L 32.2 51.8 L 0 51.8 L 0 46.9 L 32.2 0 L 38.5 0 L 38.5 45.9 L 53.6 45.9 L 53.6 51.8 L 38.5 51.8 L 38.5 70 Z M 32.2 10.3 L 7.9 45.9 L 32.2 45.9 L 32.2 10.3 Z",
  },
];

export const vertexShader = `
    uniform float uTime;
    uniform float uPixelRatio;
    attribute float size;

    float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 9.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
    }

    void main() {
        float moveX = noise(position.xy * 1.5 + uTime * 0.05);
        float moveY = noise(position.yz * 1.5 + uTime * 0.05);
        float moveZ = noise(position.xz * 1.5 + uTime * 0.05);

        moveX = clamp(moveX, -1.0, 1.0);
        moveY = clamp(moveY, -1.0, 1.0);
        moveZ = clamp(moveZ, -1.0, 1.0);

        vec3 newPosition = position + vec3(moveX, moveY, moveZ);
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

        gl_PointSize = size * uPixelRatio;

        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const fragmentShader = `
    uniform sampler2D uAlphaMap;
    uniform vec3 uColor;

    void main() {
        float alpha = texture2D(uAlphaMap, gl_PointCoord).r;

        if (alpha < 0.1) discard;

        vec3 color = uColor;
        gl_FragColor = vec4(color, alpha);
    }
`;

export const sidebarItems = [
  {
    title: "Services",
    link: "#services",
  },
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Works",
    link: "#works",
  },
  {
    title: "Contact",
    link: "#contact",
  },
];

export const services = [
  {
    title: ["Front-end", "Development"],
    desc: "Building modern and user-friendly websites and web applications using React and Next.js frameworks. while implementing powerful and scalable code with TypeScript. I prioritize attractive designs and fast performance to deliver the best user experience while enhancing the quality and maintainability of projects.",
  },
  {
    title: ["Motion &", "UI Design"],
    desc: "Creating beautiful, responsive and accessible designs using tailwindcss, and implementing smooth animations and engaging motion designs with framer-motion and gsap. i blend creativity with functionality, ensuring a delightful user journey.",
  },
  {
    title: ["3D web", "Experiences"],
    desc: "Step into the future of web experiences with 3D Graphics! Utilizing Three.js, I create immersive visual stories that captivate users and make content interactive. whether it's for gameplay, product showcases, or artistic displays, my 3D solutions will leave a lasting impression.",
  },
];

export const mainTech = [
  {
    label: "React JS",
    imgSrc: "/tech/react.svg",
  },
  {
    label: "Next JS",
    imgSrc: "/tech/next-js.svg",
  },
  {
    label: "TypeScript",
    imgSrc: "/tech/ts.svg",
  },
  {
    label: "Tailwind CSS",
    imgSrc: "/tech/tailwind.svg",
  },
  {
    label: "Three JS",
    imgSrc: "/tech/three-js.svg",
  },
];

export const allTech = [
  {
    label: "React JS",
    imgSrc: "/tech/react.svg",
    top: "90%",
    left: "5%",
  },
  {
    label: "Next JS",
    imgSrc: "/tech/next-js.svg",
    top: "30%",
    left: "20%",
  },
  {
    label: "TypeScript",
    imgSrc: "/tech/ts.svg",
    top: "10%",
    left: "60%",
  },
  {
    label: "Tailwind CSS",
    imgSrc: "/tech/tailwind.svg",
    top: "25%",
    left: "0%",
  },
  {
    label: "Three JS",
    imgSrc: "/tech/three-js.svg",
    top: "75%",
    left: "95%",
  },
  {
    label: "Jest",
    imgSrc: "/tech/jest.svg",
    top: "80%",
    left: "80%",
  },
  {
    label: "Git",
    imgSrc: "/tech/git.svg",
    top: "45%",
    left: "5%",
  },
  {
    label: "sass",
    imgSrc: "/tech/sass.svg",
    top: "5%",
    left: "25%",
  },
  {
    label: "MUI",
    imgSrc: "/tech/mui.svg",
    top: "75%",
    left: "10%",
  },
  {
    label: "HTML",
    imgSrc: "/tech/html.svg",
    top: "35%",
    left: "80%",
  },
  {
    label: "CSS",
    imgSrc: "/tech/css.svg",
    top: "95%",
    left: "20%",
  },
  {
    label: "redux",
    imgSrc: "/tech/redux.svg",
    top: "80%",
    left: "55%",
  },
  {
    label: "Bootstrap",
    imgSrc: "/tech/bootstrap.svg",
    top: "45%",
    left: "95%",
  },
];

export const aboutContent = [
  {
    title: "- My Journey",
    content:
      "I've always loved the idea of creating something meaningful, something I enjoy and others can benefit from. Programming become the perfect outlet for that passion. In the early days, I explored a few online courses, but soon I discovered something that completely changed the game for me: <span class='dark-mark font-bold'>YouTube</span>. It became my university. I spent countless hours learning from incredible creators and developers around the world, building up my skills piece by piece, project by project. I’m a self-taught developer, driven by curiosity and a love for building things that stands out. My love for problem-solving and mathematics made coding feel natural; each challenge is not just a problem to solve, but an opportunity to learn, and grow.",
  },
  {
    title: "- Beyond the Code",
    content:
      "While coding is my craft, my curiosity goes far beyond the screen. I'm deeply passionate about <span class='dark-mark font-bold'>art</span>; from painting and sculpting to playing music. My musical taste ranges from the intensity of rock and metal, to the complexity of classical and even a touch of phonk. Outside of creation, I thrive on <span class='dark-mark font-bold'>learning</span>, whether it’s diving into the latest tech trends, computer science, understanding AI, or exploring the inner workings of hardware and modern physics. Learning is not just a habit, it's part of who I am. You’ll often find me reading <span class='dark-mark font-bold'>philosophy</span> and <span class='dark-mark font-bold'>literature</span> from thinkers like Kafka, Nietzsche, Camus, Freud, or diving into epic worlds built by Tolkien and Martin. I also enjoy working out, watching films and series, and playing chess, anything that challenges both body and mind. To me, building software is a fusion of logic and creativity, much like life itself.",
  },
  {
    title: "- Future Goals and Vision",
    content:
      "I’m currently focused on mastering <span class='dark-mark font-bold'>C</span> to strengthen my low-level understanding of computers, especially around memory management and system internals. After that, I plan to dive into <span class='dark-mark font-bold'>Rust</span>; both to build backends as a future fullstack developer and to create cross-platform apps with Tauri. I also aim to go deeper into <span class='dark-mark font-bold'>Three.js</span> and 3D on the web, explore <span class='dark-mark font-bold'>Web3</span>, and eventually learn <span class='dark-mark font-bold'>UI/UX design</span> to round out my skills. Along the way, I’m continuously learning about <span class='dark-mark font-bold'>system design</span>, <span class='dark-mark font-bold'>computer architecture</span>, and core <span class='dark-mark font-bold'>computer science</span> concepts. My goal? To become a <span class='dark-mark font-bold'>god-level programmer</span>, someone who understands the full stack, from silicon to pixel, and can build anything from scratch with both elegance and efficiency.",
  },
];

export const legends = [
  {
    name: "Jonas Schmedtmann",
    link: "https://www.udemy.com/course/the-ultimate-react-course/",
  },
  {
    name: "Maximilian Schwarzmüller",
    link: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
  },
  {
    name: "Adrian from JSM",
    link: "https://www.youtube.com/@javascriptmastery/",
  },
  {
    name: "Kevin Powell",
    link: "https://www.youtube.com/@kevinpowell/",
  },
  {
    name: "Bruno Simon",
    link: "https://threejs-journey/",
  },
  {
    name: "Dave Gray",
    link: "https://www.youtube.com/@davegrayteachescode/",
  },
  {
    name: "Olivier larose",
    link: "https://www.youtube.com/@olivierlarose1/",
  },
  {
    name: "Cosden solutions",
    link: "https://www.youtube.com/@cosdensolutions/",
  },
  {
    name: "Conner ardman",
    link: "https://www.youtube.com/@connerardman/",
  },
];

export const arrowSvg = [
  "M114 5283 c-3 -10 -10 -25 -15 -33 -5 -8 -12 -22 -15 -30 -3 -8 -12 -28 -19 -45 -22 -51 -45 -129 -45 -152 0 -12 -4 -25 -10 -28 -13 -8 -13 -262 0 -270 6 -3 10 -15 10 -25 0 -42 65 -52 99 -16 22 23 24 36 32 223 9 207 17 273 38 311 7 13 11 35 9 50 -3 23 -8 27 -41 30 -29 3 -38 -1 -43 -15z",
  "M67 4162 c-8 -11 18 -229 31 -267 6 -16 18 -57 28 -90 10 -33 29 -78 41 -100 13 -22 27 -49 32 -61 14 -30 121 -144 136 -144 7 0 18 -7 25 -15 29 -35 90 -4 90 46 0 30 -35 96 -75 142 -137 157 -162 195 -246 372 -6 11 -13 43 -17 70 -5 35 -12 51 -24 53 -9 2 -19 -1 -21 -6z",
  "M1157 3703 c-14 -13 -6 -39 34 -118 57 -112 60 -118 112 -184 43 -56 144 -141 167 -141 5 0 10 -6 10 -13 0 -29 -342 -78 -409 -59 -83 25 -132 34 -138 28 -9 -8 34 -39 67 -48 14 -3 39 -11 55 -17 60 -21 223 -44 271 -38 93 12 195 34 207 46 6 6 18 11 27 11 32 0 47 32 46 99 l-1 64 -67 41 c-37 23 -97 68 -133 100 -64 57 -155 165 -155 183 0 30 -74 66 -93 46z",
  "M2430 4127 c-24 -12 -35 -31 -135 -237 -21 -41 -45 -88 -56 -105 -10 -16 -25 -43 -34 -60 -8 -16 -51 -78 -95 -138 -83 -112 -97 -147 -57 -147 34 0 307 281 307 316 0 6 6 16 13 22 6 6 27 41 45 79 19 37 38 76 44 87 5 10 16 39 23 65 7 25 16 56 20 68 5 15 1 27 -14 42 -24 24 -28 25 -61 8z",
  "M1938 4909 c-44 -32 -38 -77 17 -149 24 -32 68 -77 96 -101 29 -24 59 -52 68 -61 8 -10 20 -18 26 -18 5 0 24 -13 40 -28 17 -16 42 -36 57 -46 26 -17 28 -17 58 0 41 25 42 81 3 130 -16 18 -37 46 -48 61 -43 60 -193 202 -229 217 -49 20 -55 20 -88 -5z",
  "M1343 4618 c-44 -46 -123 -151 -123 -165 0 -2 -11 -19 -24 -36 -13 -18 -36 -56 -51 -85 -15 -29 -31 -55 -36 -58 -5 -3 -9 -12 -9 -21 0 -9 -6 -24 -13 -32 -20 -24 -47 -103 -47 -138 0 -32 32 -63 66 -63 33 0 84 75 129 190 10 25 24 61 33 80 8 19 21 49 28 65 44 106 89 182 136 231 39 42 36 78 -7 82 -25 2 -39 -6 -82 -50z",
  "M3120 3185 c-14 -8 -33 -14 -42 -15 -9 0 -29 -6 -45 -14 -60 -30 -105 -46 -127 -46 -13 0 -40 -7 -59 -15 -50 -21 -320 -21 -400 0 -64 17 -79 14 -97 -20 -19 -36 -8 -50 61 -69 35 -9 78 -22 94 -28 81 -29 313 -41 440 -23 66 9 168 53 230 99 74 55 82 80 38 121 -31 28 -56 31 -93 10z",
  "M4623 3890 c-31 -13 -179 -114 -238 -164 -69 -58 -200 -156 -209 -156 -4 0 -33 26 -64 58 -82 82 -149 142 -159 142 -4 0 -26 12 -48 27 -58 40 -164 93 -184 93 -49 0 -56 -64 -10 -100 112 -91 227 -191 331 -292 19 -18 28 -37 28 -57 0 -39 35 -60 68 -42 11 6 31 11 43 11 13 0 34 13 48 30 14 16 56 45 93 64 78 39 230 138 272 175 86 78 136 142 136 175 0 40 -52 58 -107 36z",
  "M5095 4992 c-27 -29 -95 -172 -95 -200 0 -7 -6 -26 -14 -40 -8 -15 -21 -46 -30 -69 -42 -111 -50 -132 -78 -188 -17 -33 -43 -76 -59 -96 -34 -43 -40 -103 -12 -113 12 -5 34 12 81 61 61 66 142 166 142 178 0 3 12 24 27 48 45 70 114 216 129 274 8 30 14 74 14 98 0 39 -4 46 -30 60 -39 20 -44 19 -75 -13z",
  "M4546 5996 c-7 -29 3 -57 38 -109 14 -21 26 -40 26 -42 0 -2 20 -33 45 -69 25 -37 45 -69 45 -72 0 -3 14 -23 30 -44 17 -21 30 -42 31 -46 0 -5 24 -43 53 -84 43 -62 58 -76 83 -78 23 -2 34 3 48 24 23 36 14 69 -65 224 -53 106 -100 171 -177 248 -65 65 -77 72 -112 72 -33 0 -40 -4 -45 -24z",
  "M3950 6170 c-173 -25 -315 -95 -445 -217 -31 -29 -95 -118 -95 -132 0 -5 9 -20 21 -35 38 -48 64 -37 272 118 60 44 128 90 150 103 104 57 220 103 264 103 26 0 46 30 33 50 -10 17 -117 22 -200 10z",
  "M3453 5126 c-11 -13 -25 -43 -32 -67 -8 -24 -20 -58 -27 -76 -8 -17 -14 -46 -14 -65 0 -18 -7 -55 -15 -82 -19 -62 -19 -182 -1 -238 8 -24 16 -54 20 -68 3 -14 19 -42 36 -62 25 -30 38 -38 65 -38 28 0 37 6 50 30 9 17 13 35 9 41 -3 6 -10 45 -14 87 -4 42 -13 95 -19 117 -16 60 -14 253 4 311 19 63 19 99 -1 118 -22 22 -39 20 -61 -8z",
  "M5540 3109 c-41 -4 -95 -12 -120 -18 -25 -6 -70 -10 -100 -11 -30 0 -80 -7 -110 -15 -75 -20 -283 -20 -340 0 -48 17 -136 20 -145 5 -13 -20 6 -47 43 -62 74 -30 108 -40 157 -48 28 -4 64 -14 80 -20 20 -9 99 -13 245 -13 179 0 221 3 254 16 21 10 49 17 62 17 42 0 92 33 110 73 17 37 17 39 -2 56 -26 26 -47 29 -134 20z",
  "M6520 3179 c-25 -4 -78 -8 -117 -8 -59 -1 -77 -5 -93 -21 -39 -39 -21 -65 50 -73 25 -3 70 -10 100 -16 30 -5 121 -10 202 -10 140 -1 148 0 168 21 27 29 35 64 20 82 -26 32 -214 46 -330 25z",
  "M7685 3246 c-61 -27 -131 -46 -170 -46 -22 0 -62 -7 -89 -15 -27 -8 -73 -15 -101 -15 -60 0 -78 -14 -73 -57 3 -25 8 -29 53 -35 285 -42 445 -24 554 61 18 14 24 28 24 58 0 22 -3 46 -7 52 -10 15 -154 13 -191 -3z",
  "M7858 4075 c-39 -26 -56 -73 -44 -113 10 -31 131 -140 236 -212 52 -36 99 -67 105 -69 15 -6 188 -141 295 -230 163 -136 171 -144 163 -152 -13 -12 -247 -129 -259 -129 -6 0 -17 -7 -24 -15 -7 -8 -20 -15 -30 -15 -10 0 -23 -7 -30 -15 -7 -8 -19 -15 -26 -15 -8 0 -42 -13 -76 -29 -35 -16 -72 -31 -83 -34 -11 -3 -45 -15 -75 -27 -30 -12 -66 -24 -80 -27 -14 -3 -38 -15 -55 -29 -25 -20 -30 -31 -30 -69 0 -66 27 -90 103 -88 32 1 71 7 87 13 17 7 50 15 75 20 25 4 61 14 80 20 86 31 117 43 142 56 14 8 33 14 42 14 16 0 47 12 153 61 35 16 68 29 75 29 7 0 22 7 32 15 11 8 27 15 37 15 9 0 22 7 29 15 7 8 19 15 26 15 13 0 103 38 183 78 19 9 42 29 50 44 9 16 22 28 29 28 8 0 12 19 12 60 0 37 -4 60 -11 60 -6 0 -41 26 -78 58 -55 48 -114 96 -166 134 -18 14 -110 89 -135 112 -14 12 -40 33 -59 47 -42 29 -52 37 -171 135 -128 106 -178 144 -190 144 -6 0 -10 4 -10 9 0 5 -12 14 -27 20 -16 5 -48 21 -73 34 -53 28 -136 57 -165 57 -11 0 -37 -11 -57 -25z",
];

export const projects = [
  {
    imgSrc: Lingo,
    srcCode: "https://github.com/charactermi/lingo",
    title: "Lingo",
    year: 2024,
    backgroundColor: "#e5e5e5",
  },
  {
    imgSrc: MelodiMix,
    srcCode: "https://github.com/charactermi/melodi-mix",
    title: "MelodiMix",
    year: 2024,
    backgroundColor: "#525252",
  },
  {
    imgSrc: DesignWave,
    srcCode: "https://github.com/charactermi/design-wave",
    title: "DesignWave",
    year: 2023,
    backgroundColor: "#cbd5e1",
  },
  {
    imgSrc: FilmHub,
    srcCode: "https://github.com/charactermi/film_hub",
    title: "FilmHub",
    year: 2023,
    backgroundColor: "#27272a",
  },
  {
    imgSrc: MarbleRace,
    srcCode: "https://github.com/charactermi/marble-race",
    title: "Marble Race",
    year: 2023,
    backgroundColor: "#e7e5e4",
  },
  {
    imgSrc: ATBMedia,
    srcCode: "https://github.com/charactermi/atb_media",
    title: "ATB Media",
    year: 2022,
    backgroundColor: "#292524",
  },
  {
    imgSrc: CarGame,
    srcCode: "https://github.com/charactermi/car-game",
    title: "Car Game",
    year: 2024,
    backgroundColor: "#e5e7eb",
  },
  {
    imgSrc: GymLovers,
    srcCode: "https://github.com/charactermi/gym-lovers",
    title: "Gym Lovers",
    year: 2022,
    backgroundColor: "#000000",
  },
];

export const allProjects = [
  {
    name: "Hoobank Project",
    srcCode: "https://github.com/characterMi/hoobank_project",
    year: 2022,
  },
  {
    name: "Metaversus",
    srcCode: "https://github.com/characterMi/metaversus",
    year: 2023,
  },
  {
    name: "Hilink travel app",
    srcCode: "https://github.com/characterMi/hilink-travel_app",
    year: 2022,
  },
  {
    name: "iPhone 15 pro",
    srcCode: "https://github.com/characterMi/apple_iphone-15",
    year: 2024,
  },
  {
    name: "AnimeVault",
    srcCode: "https://github.com/characterMi/anime_vault",
    year: 2023,
  },
  {
    name: "Nike Website",
    srcCode: "https://github.com/characterMi/nike-website",
    year: 2022,
  },
  {
    name: "Admin Panel",
    srcCode: "https://github.com/characterMi/react-admin-dashboard",
    year: 2022,
  },
  {
    name: "Customizable shirt",
    srcCode: "https://github.com/characterMi/customizable-shirt",
    year: 2022,
  },
  {
    name: "Coca-Cola",
    srcCode: "https://github.com/characterMi/coca-cola_zero",
    year: 2023,
  },
  {
    name: "Nexus rocket",
    srcCode: "https://github.com/characterMi/nasa_nexus",
    year: 2023,
  },
  {
    name: "Movies",
    srcCode: "https://github.com/characterMi/movies",
    year: 2022,
  },
];

export const footerArrowSvg = [
  "M133 1258 c-26 -13 -31 -38 -7 -38 18 0 44 23 44 39 0 13 -8 13 -37 -1z",
  "M48 1123 c-16 -19 -38 -58 -38 -67 0 -24 45 27 68 77 7 14 -15 7 -30 -10z",
  "M0 973 c0 -35 14 -73 23 -63 7 10 -5 100 -14 100 -5 0 -9 -17 -9 -37z",
  "M40 871 c0 -14 66 -34 90 -26 35 11 22 24 -24 23 -24 0 -49 3 -55 6 -6 4 -11 3 -11 -3z",
  "M240 940 c-25 -21 -40 -39 -34 -40 11 0 104 67 104 75 0 15 -31 0 -70 -35z",
  "M375 1089 c-25 -23 -43 -44 -40 -47 4 -5 115 76 115 84 0 16 -38 -3 -75 -37z",
  "M605 1212 c-60 -12 -95 -24 -90 -32 3 -5 19 -5 38 1 17 5 44 9 59 9 16 0 28 4 28 9 0 14 -12 18 -35 13z",
  "M720 1173 c0 -10 64 -92 73 -93 19 0 4 39 -26 68 -32 31 -47 39 -47 25z",
  "M794 1003 c-3 -16 -10 -44 -15 -63 -10 -41 6 -66 19 -29 15 39 23 119 12 119 -5 0 -12 -12 -16 -27z",
  "M702 783 c-36 -53 -44 -73 -28 -73 11 0 66 80 66 96 0 13 -22 0 -38 -23z",
  "M590 628 c-37 -48 -49 -71 -50 -91 0 -31 22 -14 39 30 9 22 22 47 29 56 8 9 12 21 10 27 -2 6 -15 -4 -28 -22z",
  "M472 423 c-28 -40 -52 -90 -52 -108 0 -21 19 -19 26 3 4 9 17 41 31 70 28 60 26 78 -5 35z",
  "M420 191 c0 -33 22 -81 41 -92 35 -18 40 2 9 31 -18 17 -30 38 -30 54 0 14 -4 26 -10 26 -5 0 -10 -8 -10 -19z",
  "M560 61 c0 -5 21 -19 46 -30 49 -24 114 -25 122 -3 3 9 -12 12 -53 12 -31 0 -69 7 -85 15 -17 9 -30 11 -30 6z",
  "M878 170 c-14 -10 -37 -22 -51 -25 -31 -8 -36 -25 -8 -25 32 0 76 20 89 40 17 27 -1 33 -30 10z",
  "M951 274 c-40 -46 -49 -64 -32 -64 15 0 92 90 86 100 -9 15 -10 14 -54 -36z",
  "M1050 346 c0 -5 83 -46 93 -46 18 0 4 21 -23 35 -27 14 -70 21 -70 11z",
  "M1171 387 c-8 -10 -2 -32 24 -85 l34 -72 -34 0 c-39 0 -65 -8 -65 -21 0 -12 137 -12 144 0 6 10 -68 176 -82 185 -6 3 -15 0 -21 -7z",
];

export const socials = [
  {
    title: "Linkedin",
    link: "https://linkedin.com/in/abolfazl-taghadosi",
  },
  {
    title: "Github",
    link: "https://github.com/characterMi",
  },
  {
    title: "Email",
    link: "mailto:abol1385fx@gmail.com",
  },
  {
    title: "Telegram",
    link: "https://t.me/character_mi",
  },
];
