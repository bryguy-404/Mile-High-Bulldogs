/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { imageMetadata } from "astro/assets/utils";
import { image } from "./content-validation";

// Public uploads need dimensions for responsive rendering. Include a content
// hash so replacing a file at the same path cannot reuse an old transform.
export async function cmsImage(path: string) {
  image.parse(path);
  const bytes = readFileSync(resolve("public", `.${path}`));
  const metadata = await imageMetadata(bytes, path);
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  return { ...metadata, src: `${path}?v=${hash}` };
}
