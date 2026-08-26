import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
};

export function Container({ className, children, as: Tag = "div", ...props }: Props) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)} {...props}>
      {children}
    </Tag>
  );
}
