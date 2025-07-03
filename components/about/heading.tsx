import Motion from "../shared/motion";

export const SectionHeading = ({ title }: { title: string }) => (
  <p className="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw] text-neutral-900 !leading-tight relative">
    <Motion
      as="span"
      initial={{ scaleX: 1 }}
      whileInView={{ scaleX: 0 }}
      aria-hidden
      className="size-full absolute bg-gradient-to-r from-white from-50% to-transparent origin-left"
    />
    {title}
  </p>
);
