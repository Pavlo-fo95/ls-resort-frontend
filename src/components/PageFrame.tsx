import Watermark from "./ui/Watermark";
import wm from "../assets/logo1.png";

export default function PageFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pageFrame">
      {/* watermark за контентом */}
      <Watermark
        src={wm}
        position="right-center"
        sizePx={1700}   // было 820
        opacity={0.06}
        rotateDeg={-6}
        />

      <main className="pageFrame__content">
        {children}
      </main>
    </div>
  );
}