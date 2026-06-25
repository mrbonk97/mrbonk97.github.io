import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/constants";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>行法</SheetTitle>
          <SheetDescription>포트폴리오</SheetDescription>
        </SheetHeader>

        <nav>
          <ul className="px-4 space-y-4">
            {ROUTES.map((item) => (
              <li key={item.url}>
                <SheetClose asChild>
                  <Link
                    href={item.url}
                    className="block p-4 rounded-lg bg-secondary text-secondary-foreground font-medium text-right"
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}
