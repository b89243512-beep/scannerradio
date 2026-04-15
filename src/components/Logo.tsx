import Image from "next/image";
export function Logo({ size = 32 }: { size?: number }) {
  return <Image src="/logo.svg" alt="Scanner Radio" width={size} height={size} className="rounded-lg" />;
}
