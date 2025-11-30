import { Slot } from "@radix-ui/react-slot";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";
import { cn } from "./utils";

type BadgeProps = React.ComponentProps<"span"> &
  BadgeVariantProps & {
    asChild?: boolean;
  };

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
