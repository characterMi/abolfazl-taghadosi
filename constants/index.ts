import ATBMedia from "@/public/projects/atb-media.png";
import CarGame from "@/public/projects/car-game.png";
import DesignWave from "@/public/projects/design-wave.png";
import FilmHub from "@/public/projects/film-hub.png";
import GymLovers from "@/public/projects/gym-lovers.png";
import Lingo from "@/public/projects/lingo.png";
import MarbleRace from "@/public/projects/marble-race.png";
import MelodiMix from "@/public/projects/melodi-mix.png";
import type { ScaleValues } from "@/types";

// `
// uniform float uTime;
// uniform float uSize;
// attribute float size;

// varying vec3 vColor;
// varying float vAlpha;

// void main() {

//   gl_PointSize = uSize * (300.0 / -mvPosition.z); // Size attenuation
//   gl_Position = projectionMatrix * mvPosition;
// }
// ` ||

export const vertexShader = `
    uniform float uTime;

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

        vec3 newPosition = position + vec3(moveX, moveY, moveZ);
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);

        float distanceFactor = 2.0 / (0.05 + length(newPosition));

        gl_PointSize = 10.0 * distanceFactor;

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

export const heroSectionTitle = [
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "A",
    d: "M 37.5 0 L 43.2 21 Q 43.8 23.4 43.8 25.7 Q 43.8 31.3 40.45 35.95 A 37.181 37.181 0 0 1 35.195 41.859 A 32.928 32.928 0 0 1 32.9 43.75 Q 28.7 46.9 23.3 50.1 Q 21.6 51.1 20.35 51.95 A 10.755 10.755 0 0 0 19.925 52.253 Q 19.324 52.706 19.161 53.002 A 0.419 0.419 0 0 0 19.1 53.2 Q 19.1 53.479 19.794 53.499 A 3.843 3.843 0 0 0 19.9 53.5 Q 21.064 53.5 25.236 52.842 A 203.584 203.584 0 0 0 25.5 52.8 Q 33.577 51.481 38.598 51.249 A 43.567 43.567 0 0 1 40.6 51.2 A 32.459 32.459 0 0 1 44.681 51.435 Q 51.925 52.358 53.2 56.9 A 24.813 24.813 0 0 0 55.405 62.235 A 20.649 20.649 0 0 0 57.85 65.7 Q 61 69.3 63.6 69.3 L 63.6 70 L 38 70 L 38 69.3 Q 39.764 69.3 40.838 67.878 A 4.735 4.735 0 0 0 41 67.65 A 5.659 5.659 0 0 0 41.692 66.14 Q 41.909 65.422 42.01 64.553 A 14.258 14.258 0 0 0 42.1 62.9 A 15.445 15.445 0 0 0 42.051 61.73 Q 41.951 60.418 41.645 58.653 A 52.643 52.643 0 0 0 41.6 58.4 A 5.338 5.338 0 0 0 38.809 55.368 Q 36.702 54.301 33.176 54.132 A 28.795 28.795 0 0 0 31.8 54.1 A 51.22 51.22 0 0 0 26.531 54.381 A 59.041 59.041 0 0 0 24.7 54.6 L 20 54.9 A 9.55 9.55 0 0 1 19.214 54.87 Q 17.5 54.728 17.5 53.9 Q 17.5 52.96 18.649 51.931 A 7.183 7.183 0 0 1 18.8 51.8 A 22.823 22.823 0 0 1 19.544 51.2 Q 20.407 50.53 21.67 49.647 A 105.908 105.908 0 0 1 22.9 48.8 A 68.983 68.983 0 0 0 26.549 46.203 Q 29.42 44.007 31.35 41.95 Q 34.4 38.7 34.4 34.2 A 9.482 9.482 0 0 0 34.304 32.898 Q 34.212 32.236 34.032 31.502 A 17.554 17.554 0 0 0 33.9 31 L 28.1 9.6 L 12.3 56.9 Q 11.9 58.1 11.9 59.6 A 7.853 7.853 0 0 0 14.699 65.706 A 11.519 11.519 0 0 0 15.85 66.6 A 15.033 15.033 0 0 0 21.308 68.871 A 21.359 21.359 0 0 0 25.7 69.3 L 25.7 70 L 0 70 L 0 69.3 A 4.785 4.785 0 0 0 1.745 68.94 Q 3.5 68.252 5.6 66.25 A 20.486 20.486 0 0 0 9.876 60.337 A 24.404 24.404 0 0 0 10.6 58.7 L 25.9 13 Q 26.7 10.2 26.7 7.4 A 14.857 14.857 0 0 0 26.587 5.506 Q 26.464 4.551 26.207 3.763 A 6.478 6.478 0 0 0 25.65 2.5 A 4.601 4.601 0 0 0 24.974 1.595 A 2.805 2.805 0 0 0 22.9 0.7 L 22.9 0 L 37.5 0 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "B",
    d: "M 29.7 0 L 0 0 L 0 0.5 C 3.4 0.5 7.9 6 7.9 17.3 L 7.9 52.7 A 36.679 36.679 0 0 1 7.577 57.682 C 6.487 65.62 2.856 69.5 0 69.5 L 0 70 L 30.1 70 A 72.145 72.145 0 0 0 34.916 69.77 C 46.458 68.816 58 64.682 58 51.7 C 58 42.4 44.1 38.2 32.6 32.3 A 11.278 11.278 0 0 0 33.697 32.389 C 41.749 32.652 49.8 24.417 49.8 16 A 16.144 16.144 0 0 0 48.767 10.082 C 45.851 2.613 37.278 0.244 29.7 0 Z M 17.9 52.7 L 17.9 19.3 C 19.3 24.5 23.3 27.8 28 30.6 L 28.8 31.1 C 37.5 36.1 48 39.9 48 51.7 A 36.351 36.351 0 0 1 47.531 57.907 C 45.844 67.578 39.6 69.5 28.8 69.5 L 25.8 69.5 C 22.4 69.5 17.9 64 17.9 52.7 Z M 25.8 0.5 L 28.2 0.5 C 37.6 0.5 39.8 6.4 39.8 16 A 42.547 42.547 0 0 1 39.796 16.605 C 39.677 24.955 37.07 33.304 29.417 30.49 A 12.374 12.374 0 0 1 28.7 30.2 A 33.126 33.126 0 0 1 22.417 25.454 A 14.01 14.01 0 0 1 17.9 15.5 A 35.151 35.151 0 0 1 18.137 11.286 C 19.053 3.715 22.446 0.831 25.292 0.527 A 4.791 4.791 0 0 1 25.8 0.5 Z",
  },
  {
    svgViewBox: "0 0 62.501 71.001",
    id: "O",
    d: "M 18.001 0 L 44.501 0 Q 53.301 4.3 57.901 13.35 A 40.611 40.611 0 0 1 61.49 24.024 Q 62.501 29.2 62.501 35.2 A 48.103 48.103 0 0 1 61.378 45.789 A 39.701 39.701 0 0 1 58.851 53.4 Q 55.201 61.5 48.151 66.25 A 27.621 27.621 0 0 1 36.596 70.624 A 36.145 36.145 0 0 1 31.301 71 A 33.949 33.949 0 0 1 22.706 69.956 A 27.14 27.14 0 0 1 14.401 66.25 Q 7.301 61.5 3.651 53.4 A 41.331 41.331 0 0 1 0.322 41.021 A 51.377 51.377 0 0 1 0.001 35.2 A 59.462 59.462 0 0 1 0.819 25.067 Q 1.819 19.291 4.037 14.51 A 35.979 35.979 0 0 1 4.601 13.35 Q 9.201 4.3 18.001 0 Z M 31.301 70 A 14.701 14.701 0 0 0 38.761 68.133 Q 41.661 66.466 43.794 63.311 A 22.596 22.596 0 0 0 45.401 60.5 A 40.968 40.968 0 0 0 48.379 51.824 Q 49.367 47.534 49.753 42.485 A 89.102 89.102 0 0 0 50.001 35.7 A 63.234 63.234 0 0 0 49.119 24.948 A 52.506 52.506 0 0 0 47.501 18.2 A 43.213 43.213 0 0 0 45.223 12.349 Q 43.771 9.333 41.953 6.988 A 23.896 23.896 0 0 0 40.701 5.5 Q 36.802 1.239 32.246 0.841 A 10.862 10.862 0 0 0 31.301 0.8 A 11.455 11.455 0 0 0 24.585 3.015 A 17.291 17.291 0 0 0 21.801 5.5 A 26.724 26.724 0 0 0 18.165 10.631 Q 16.788 13.12 15.697 16.133 A 48.864 48.864 0 0 0 15.001 18.2 A 55.064 55.064 0 0 0 12.745 29.909 A 67.188 67.188 0 0 0 12.501 35.7 A 83.514 83.514 0 0 0 13.044 45.533 Q 14.082 54.266 17.101 60.5 Q 21.701 70 31.301 70 Z M 31.401 10.5 L 32.401 10.5 Q 32.401 19.8 32.951 24.5 A 29.234 29.234 0 0 0 33.282 26.672 Q 33.863 29.663 34.951 31.05 A 4.712 4.712 0 0 0 38.132 32.835 A 6.951 6.951 0 0 0 39.101 32.9 L 39.101 33.9 A 6.484 6.484 0 0 0 37.392 34.113 A 4.613 4.613 0 0 0 34.951 35.7 A 5.97 5.97 0 0 0 34.169 37.024 Q 33.337 38.895 32.951 42.2 Q 32.53 45.798 32.431 52.093 A 262.704 262.704 0 0 0 32.401 56.2 L 31.401 56.2 Q 31.401 46.9 30.851 42.2 Q 30.301 37.5 28.901 35.7 Q 27.501 33.9 24.801 33.9 L 24.801 32.9 A 6.254 6.254 0 0 0 26.503 32.681 A 4.44 4.44 0 0 0 28.901 31.05 Q 30.301 29.2 30.851 24.5 Q 31.272 20.902 31.371 14.607 A 262.704 262.704 0 0 0 31.401 10.5 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "L",
    d: "M 25.8 0 L 0 0 L 0 0.5 C 3.4 0.5 7.9 6 7.9 17.3 L 7.9 52.7 A 36.679 36.679 0 0 1 7.577 57.682 C 6.487 65.62 2.856 69.5 0 69.5 L 0 70 L 50.1 70 L 50.1 45.8 L 49.6 45.8 A 28.709 28.709 0 0 1 49.257 50.161 C 47.951 58.616 42.757 68.256 31.124 69.389 A 23.954 23.954 0 0 1 28.8 69.5 L 25.8 69.5 C 22.4 69.5 17.9 64 17.9 52.7 L 17.9 17.3 A 36.679 36.679 0 0 1 18.223 12.318 C 19.313 4.38 22.944 0.5 25.8 0.5 L 25.8 0 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "F",
    d: "M 17.9 33 L 43.5 33 L 43.5 32.5 L 42.8 32.5 A 30.019 30.019 0 0 1 33.899 31.246 C 24.886 28.467 19.832 21.444 15.8 14 A 73.182 73.182 0 0 1 14.746 11.652 C 11.294 3.562 12.329 1.097 15.362 0.602 A 9.003 9.003 0 0 1 16.8 0.5 L 28.8 0.5 C 43.128 0.5 48.74 12.549 49.507 21.953 A 27.695 27.695 0 0 1 49.6 24.2 L 50.1 24.2 L 50.1 0 L 0 0 L 0 0.5 C 3.4 0.5 9.4 3.9 16.9 17.3 C 21.3 24.5 27 30.7 36.9 32.5 L 7.9 32.5 L 7.9 52.7 A 36.679 36.679 0 0 1 7.577 57.682 C 6.487 65.62 2.856 69.5 0 69.5 L 0 70 L 25.8 70 L 25.8 69.5 C 22.4 69.5 17.9 64 17.9 52.7 L 17.9 33 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "A-2",
    d: "M 37.5 0 L 43.2 21 Q 43.8 23.4 43.8 25.7 Q 43.8 31.3 40.45 35.95 A 37.181 37.181 0 0 1 35.195 41.859 A 32.928 32.928 0 0 1 32.9 43.75 Q 28.7 46.9 23.3 50.1 Q 21.6 51.1 20.35 51.95 A 10.755 10.755 0 0 0 19.925 52.253 Q 19.324 52.706 19.161 53.002 A 0.419 0.419 0 0 0 19.1 53.2 Q 19.1 53.479 19.794 53.499 A 3.843 3.843 0 0 0 19.9 53.5 Q 21.064 53.5 25.236 52.842 A 203.584 203.584 0 0 0 25.5 52.8 Q 33.577 51.481 38.598 51.249 A 43.567 43.567 0 0 1 40.6 51.2 A 32.459 32.459 0 0 1 44.681 51.435 Q 51.925 52.358 53.2 56.9 A 24.813 24.813 0 0 0 55.405 62.235 A 20.649 20.649 0 0 0 57.85 65.7 Q 61 69.3 63.6 69.3 L 63.6 70 L 38 70 L 38 69.3 Q 39.764 69.3 40.838 67.878 A 4.735 4.735 0 0 0 41 67.65 A 5.659 5.659 0 0 0 41.692 66.14 Q 41.909 65.422 42.01 64.553 A 14.258 14.258 0 0 0 42.1 62.9 A 15.445 15.445 0 0 0 42.051 61.73 Q 41.951 60.418 41.645 58.653 A 52.643 52.643 0 0 0 41.6 58.4 A 5.338 5.338 0 0 0 38.809 55.368 Q 36.702 54.301 33.176 54.132 A 28.795 28.795 0 0 0 31.8 54.1 A 51.22 51.22 0 0 0 26.531 54.381 A 59.041 59.041 0 0 0 24.7 54.6 L 20 54.9 A 9.55 9.55 0 0 1 19.214 54.87 Q 17.5 54.728 17.5 53.9 Q 17.5 52.96 18.649 51.931 A 7.183 7.183 0 0 1 18.8 51.8 A 22.823 22.823 0 0 1 19.544 51.2 Q 20.407 50.53 21.67 49.647 A 105.908 105.908 0 0 1 22.9 48.8 A 68.983 68.983 0 0 0 26.549 46.203 Q 29.42 44.007 31.35 41.95 Q 34.4 38.7 34.4 34.2 A 9.482 9.482 0 0 0 34.304 32.898 Q 34.212 32.236 34.032 31.502 A 17.554 17.554 0 0 0 33.9 31 L 28.1 9.6 L 12.3 56.9 Q 11.9 58.1 11.9 59.6 A 7.853 7.853 0 0 0 14.699 65.706 A 11.519 11.519 0 0 0 15.85 66.6 A 15.033 15.033 0 0 0 21.308 68.871 A 21.359 21.359 0 0 0 25.7 69.3 L 25.7 70 L 0 70 L 0 69.3 A 4.785 4.785 0 0 0 1.745 68.94 Q 3.5 68.252 5.6 66.25 A 20.486 20.486 0 0 0 9.876 60.337 A 24.404 24.404 0 0 0 10.6 58.7 L 25.9 13 Q 26.7 10.2 26.7 7.4 A 14.857 14.857 0 0 0 26.587 5.506 Q 26.464 4.551 26.207 3.763 A 6.478 6.478 0 0 0 25.65 2.5 A 4.601 4.601 0 0 0 24.974 1.595 A 2.805 2.805 0 0 0 22.9 0.7 L 22.9 0 L 37.5 0 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "Z",
    d: "M 0 70 L 58 70 L 58 45.8 L 57.5 45.8 A 28.709 28.709 0 0 1 57.157 50.161 C 55.851 58.616 50.657 68.256 39.024 69.389 A 23.954 23.954 0 0 1 36.7 69.5 L 25.8 69.5 C 22.559 69.5 21.771 64.502 25.343 54.246 A 79.314 79.314 0 0 1 25.9 52.7 L 43.2 14.9 A 39.646 39.646 0 0 1 47.51 8.457 C 50.865 4.355 54.584 1.418 56.961 0.681 A 3.567 3.567 0 0 1 58 0.5 L 58 0 L 2.9 0 L 2.9 24.2 L 3.4 24.2 A 28.709 28.709 0 0 1 3.743 19.839 C 5.049 11.384 10.243 1.744 21.876 0.611 A 23.954 23.954 0 0 1 24.2 0.5 L 32.2 0.5 A 2.435 2.435 0 0 1 34.421 2.015 C 35.479 4.112 35.351 8.283 33.429 13.878 A 48.104 48.104 0 0 1 32.1 17.3 L 13.4 58 A 32.735 32.735 0 0 1 11.334 61.177 C 7.817 65.951 3.753 68.656 1.163 69.331 A 4.68 4.68 0 0 1 0 69.5 L 0 70 Z",
  },
  {
    svgViewBox: "0 0 60.5 71.4",
    id: "L-2",
    d: "M 25.8 0 L 0 0 L 0 0.5 C 3.4 0.5 7.9 6 7.9 17.3 L 7.9 52.7 A 36.679 36.679 0 0 1 7.577 57.682 C 6.487 65.62 2.856 69.5 0 69.5 L 0 70 L 50.1 70 L 50.1 45.8 L 49.6 45.8 A 28.709 28.709 0 0 1 49.257 50.161 C 47.951 58.616 42.757 68.256 31.124 69.389 A 23.954 23.954 0 0 1 28.8 69.5 L 25.8 69.5 C 22.4 69.5 17.9 64 17.9 52.7 L 17.9 17.3 A 36.679 36.679 0 0 1 18.223 12.318 C 19.313 4.38 22.944 0.5 25.8 0.5 L 25.8 0 Z",
  },
];

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
    desc: "Building modern and user-friendly websites and web applications using React and Next.js frameworks. while implementing powerful and scalable code with TypeScript. I prioritize attractive designs and fast performance to deliver the best use experience while enhancing the quality and maintainability of projects.",
  },
  {
    title: ["Motion and", "UI Design"],
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

export const allTech = (scaleValues: ScaleValues) => [
  {
    label: "React JS",
    imgSrc: "/tech/react.svg",
    scale: scaleValues["scale2"],
    shadow: "-10px -15px 20px #80deea",
  },
  {
    label: "Next JS",
    imgSrc: "/tech/next-js.svg",
    scale: scaleValues["scale5"],
    shadow: "-10px -5px 10px #212121b7",
  },
  {
    label: "TypeScript",
    imgSrc: "/tech/ts.svg",
    scale: scaleValues["scale4"],
    shadow: "-10px -10px 10px #1976d2b7",
  },
  {
    label: "Tailwind CSS",
    imgSrc: "/tech/tailwind.svg",
    scale: scaleValues["scale7"],
    shadow: "0 15px 10px #00acc1b7",
  },
  {
    label: "Three JS",
    imgSrc: "/tech/three-js.svg",
    scale: scaleValues["scale8"],
    shadow: "-10px -15px 10px #000000",
  },
  {
    label: "Jest",
    imgSrc: "/tech/jest.svg",
    scale: scaleValues["scale4"],
    shadow: "10px -15px 15px #9a425bb7",
  },
  {
    label: "Git",
    imgSrc: "/tech/git.svg",
    scale: scaleValues["scale2"],
    shadow: "-10px 7.5px 20px #e65100b7",
  },
  {
    label: "sass",
    imgSrc: "/tech/sass.svg",
    scale: scaleValues["scale9"],
    shadow: "10px -15px 15px #f06292",
  },
  {
    label: "MUI",
    imgSrc: "/tech/mui.svg",
    scale: scaleValues["scale5"],
    shadow: "-10px 15px 20px #0288d1b7",
  },
  {
    label: "HTML",
    imgSrc: "/tech/html.svg",
    scale: scaleValues["scale2"],
    shadow: "15px 0 20px #e65100b7",
  },
  {
    label: "CSS",
    imgSrc: "/tech/css.svg",
    scale: scaleValues["scale5"],
    shadow: "-15px 0 15px #0277bdb7",
  },
  {
    label: "redux",
    imgSrc: "/tech/redux.svg",
    scale: scaleValues["scale9"],
    shadow: "5px -15px 10px #7e57c2",
  },
  {
    label: "Bootstrap",
    imgSrc: "/tech/bootstrap.svg",
    scale: scaleValues["scale9"],
    shadow: "20px 10px 20px #6c19ffb7",
  },
];

export const aboutContent = [
  {
    title: "- My Journey",
    content:
      "I've always been drawn to the idea of creating things that I enjoy and that others can benefit from. For me, programming is one of the best ways to achieve that. Much of my knowledge comes from countless hours spent on YouTube, learning and exploring new technologies. My love for problem-solving and mathematics naturally led me to the world of coding, where every new challenge is an opportunity to learn and grow.",
  },
  {
    title: "- Beyond the Code",
    content:
      "Beyond coding, I find joy in several activities, such as painting, sculpting, playing music, working out, and reading. I'm a huge fan of J.R.R. Tolkien's works like *The Lord of the Rings* and *The Silmarillion*, as well as the legendary manga *Berserk* by Kentaro Miura. These rich, imaginative worlds inspire my creativity and drive my desire to tell compelling stories—whether in art, writing, or code. Additionally, I'm a huge fan of music, especially rock, metal, and classical genres. Music not only fuels my focus during work but also sparks inspiration in many of my creative projects.",
  },
  {
    title: "- Future Goals and Vision",
    content:
      "I'm currently working towards mastering Three.js at a deeper level. Once I'm confident in my 3D web development skills, I plan to move on to React Native to expand my knowledge of mobile app development. Afterward, I aim to dive into the field of UI/UX design, combining creativity with user-centered principles to craft more intuitive and engaging digital experiences.",
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
    name: "Conner ardman",
    link: "https://www.youtube.com/@connerardman/",
  },
];

export const aboutSectionArrowIcon = [
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
  },
  {
    name: "Metaversus",
    srcCode: "https://github.com/characterMi/metaversus",
  },
  {
    name: "Hilink travel app",
    srcCode: "https://github.com/characterMi/hilink-travel_app",
  },
  {
    name: "iPhone 15 pro",
    srcCode: "https://github.com/characterMi/apple_iphone-15",
  },
  {
    name: "AnimeVault",
    srcCode: "https://github.com/characterMi/anime_vault",
  },
  {
    name: "Nike Website",
    srcCode: "https://github.com/characterMi/nike-website",
  },
  {
    name: "Admin Panel",
    srcCode: "https://github.com/characterMi/react-admin-dashboard",
  },
  {
    name: "Customizable shirt",
    srcCode: "https://github.com/characterMi/customizable-shirt",
  },
  {
    name: "Coca-Cola",
    srcCode: "https://github.com/characterMi/coca-cola_zero",
  },
  {
    name: "Nexus rocket",
    srcCode: "https://github.com/characterMi/nasa_nexus",
  },
  {
    name: "Movies",
    srcCode: "https://github.com/characterMi/movies",
  },
];

export const arrowSvg = [
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
