const WaveEffect = ({ condition }: { condition: boolean }) => (
  <span
    className="h-0 top-0 bg-dark-blue absolute rounded-[50%] duration-1000"
    style={{
      top: condition ? "auto" : "0",
      height: condition ? "200%" : "0",
      width: condition ? "150%" : "125%",
      bottom: condition ? "0" : "auto",
    }}
  />
);

export default WaveEffect;
