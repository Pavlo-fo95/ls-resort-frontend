type Props = {
  src: string;
  position?: "bottom-center" | "right-center" | "bottom-right";
  sizePx?: number;
  opacity?: number;
  rotateDeg?: number;
};

export default function Watermark({
  src,
  position = "bottom-center",
  sizePx = 700,
  opacity = 0.08,
  rotateDeg = 0,
}: Props) {
  return (
    <div
      className={`wm ${position}`}
      aria-hidden="true"
      style={{
        width: sizePx,
        height: sizePx,
        opacity,
        rotate: `${rotateDeg}deg`,
        backgroundImage: `url(${src})`,
      }}
    />
  );
}