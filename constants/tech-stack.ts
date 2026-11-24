interface StackLogo {
  src: string;
  darkSrc?: string;
  invertInDark?: boolean;
}

// SVGs use a 32 × 32 viewBox with proportional artwork inside a 28 × 28 area.
// Added marks: https://github.com/simple-icons/simple-icons/tree/develop/icons
// TanStack: https://tanstack.com/brand-guide
// Additional SVG sources and related-platform substitutions: public/icons/sources.json
const STACK_LOGOS: Record<string, StackLogo> = {
  springboot: { src: "/icons/springboot.svg" },
  springsecurity: { src: "/icons/springsecurity.svg" },
  nodejs: { src: "/icons/nodejs.svg" },
  typescript: { src: "/icons/typescript.svg" },
  postgresql: { src: "/icons/postgresql.svg" },
  nextjs: { src: "/icons/nextjs.svg", invertInDark: true },
  tanstackquery: { src: "/icons/tanstack.svg" },
  tanstackvirtual: { src: "/icons/tanstack.svg" },
  tinymce: { src: "/icons/tinymce.svg" },
  supabase: { src: "/icons/supabase.svg" },
  nexacro: { src: "/icons/nexacro.svg" },
  // X-UP uses the vendor mark; a dedicated product SVG was not found.
  xup: { src: "/icons/tobesoft.svg" },
  oracle: { src: "/icons/oracle.svg" },
  jetpackcompose: { src: "/icons/jetpackcompose.svg" },
  // Related language/platform marks, not dedicated library logos.
  daggerhilt: { src: "/icons/android.svg" },
  coroutines: { src: "/icons/kotlin.svg" },
  roomdb: { src: "/icons/android.svg" },
  firebase: { src: "/icons/firebase.svg" },
  cloudflarer2: { src: "/icons/cloudflarer2.svg" },
  cloudflareworker: { src: "/icons/cloudflareworkers.svg" },
  cloudflareworkers: { src: "/icons/cloudflareworkers.svg" },
  vercel: { src: "/icons/vercel.svg", invertInDark: true },
  railway: {
    src: "/icons/railway_black.svg",
    darkSrc: "/icons/railway_white.svg",
  },
};

export function getStackLogo(name: string): StackLogo | undefined {
  return STACK_LOGOS[name.toLowerCase().replace(/[^a-z0-9]/g, "")];
}
