import type { NavigationContent } from "@/types/content";

export const navigation: NavigationContent = {
  brand: {
    name: "SERIAN LAB",
    tagline: "Calm design. Practical products.",
  },
  links: [
    { id: "products", label: "Products", href: "/products/hair-dryer-brush" },
    { id: "support", label: "Support", href: "/contact#support" },
    { id: "shipping", label: "Shipping", href: "/shipping" },
    { id: "returns", label: "Returns", href: "/refund" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
};
