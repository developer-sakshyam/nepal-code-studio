import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowOnHover?: boolean;
}

export const GlassCard = ({
  children,
  className = "",
  hover3D = true,
  glowOnHover = true,
}: GlassCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        glowOnHover && "hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};
