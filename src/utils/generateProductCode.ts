import JSZip from "jszip";
import { Product } from "@/data/products";
import { getSaaSDashboardFiles } from "./products/saas-dashboard";
import { getEcommerceFiles } from "./products/ecommerce";
import { getPortfolioFiles } from "./products/portfolio";
import { getBlogPlatformFiles } from "./products/blog-platform";
import { getLandingSaaSFiles } from "./products/landing-saas";
import { getTaskManagementFiles } from "./products/task-management";

export interface FileEntry {
  path: string;
  content: string;
}

const productFileGenerators: Record<string, () => FileEntry[]> = {
  "saas-dashboard": getSaaSDashboardFiles,
  "ecommerce-storefront": getEcommerceFiles,
  "portfolio-developer": getPortfolioFiles,
  "blog-platform": getBlogPlatformFiles,
  "landing-saas": getLandingSaaSFiles,
  "task-management": getTaskManagementFiles,
};

export async function generateProductZip(product: Product): Promise<Blob> {
  const zip = new JSZip();
  const getFiles = productFileGenerators[product.id];

  if (!getFiles) {
    zip.file("README.md", `# ${product.name}\n\nSource code package.`);
    return zip.generateAsync({ type: "blob" });
  }

  const files = getFiles();
  const folder = zip.folder(product.id)!;

  for (const file of files) {
    folder.file(file.path, file.content);
  }

  return zip.generateAsync({ type: "blob" });
}
