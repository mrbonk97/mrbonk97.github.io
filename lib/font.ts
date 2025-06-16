import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";

export const pretendard = localFont({ src: "./fonts/pretendard/PretendardVariable.woff2" });

export const notoSerif = Noto_Serif_KR({ subsets: ["latin"] });

export const kleeOne = localFont({
  src: [
    {
      path: "./fonts/klee_one/KleeOne-Regular.ttf",
      weight: "400",
      style: "regular",
    },
  ],
});
