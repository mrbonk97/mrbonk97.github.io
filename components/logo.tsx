import Link from "next/link";
import { kleeOne } from "@/lib/font";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Logo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"/"}
            className={`block text-2xl sm:text-4xl tracking-tighter ${kleeOne.className}`}
          >
            行法
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="mt-2 text-center">행법</p>
          <p className="my-2 text-center">저의 법명 입니다.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
