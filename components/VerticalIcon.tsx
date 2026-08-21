import { BoltIcon, ShieldIcon, WalletIcon } from "@/components/icons";
import type { VerticalIcon as VerticalIconKey } from "@/lib/verticals";

const icons = {
  bolt: BoltIcon,
  shield: ShieldIcon,
  wallet: WalletIcon,
};

export default function VerticalIcon({
  icon,
  className,
}: {
  icon: VerticalIconKey;
  className?: string;
}) {
  const Icon = icons[icon];
  return <Icon className={className} />;
}
