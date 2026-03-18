interface Screenshot {
  url: string;
  label: string;
}

export const productScreenshots: Record<string, Screenshot[]> = {
  "saas-dashboard": [
    { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop", label: "Analytics Overview" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop", label: "Data Tables & Reports" },
    { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=700&fit=crop", label: "User Management Panel" },
    { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop", label: "Settings & Configuration" },
  ],
  "ecommerce-storefront": [
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop", label: "Product Catalog" },
    { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=700&fit=crop", label: "Shopping Cart" },
    { url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=700&fit=crop", label: "Checkout Flow" },
    { url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=700&fit=crop", label: "Order Confirmation" },
  ],
  "portfolio-developer": [
    { url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=700&fit=crop", label: "Hero Section" },
    { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=700&fit=crop", label: "Projects Showcase" },
    { url: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=700&fit=crop", label: "Skills & Experience" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=700&fit=crop", label: "Contact Section" },
  ],
  "blog-platform": [
    { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=700&fit=crop", label: "Blog Feed" },
    { url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=700&fit=crop", label: "Article View" },
    { url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=700&fit=crop", label: "Categories & Tags" },
  ],
  "landing-saas": [
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop", label: "Landing Hero" },
    { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=700&fit=crop", label: "Features Section" },
    { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=700&fit=crop", label: "Pricing Table" },
  ],
  "task-management": [
    { url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=700&fit=crop", label: "Kanban Board" },
    { url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=700&fit=crop", label: "Task Details" },
    { url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=700&fit=crop", label: "Team Overview" },
  ],
};
