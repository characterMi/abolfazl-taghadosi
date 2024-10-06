const WaveEffect = ({ condition }: { condition: boolean }) => (
  <span
    className="h-0 top-0 absolute rounded-[50%] duration-500"
    style={{
      top: condition ? "auto" : "0",
      height: condition ? "100%" : "0",
      width: condition ? "125%" : "100%",
      bottom: condition ? "0" : "auto",
      background: "radial-gradient(circle, #56ccf2, #32a2c7 75%)",
    }}
  />
);

export default WaveEffect;
