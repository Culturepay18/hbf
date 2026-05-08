import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, "..", "public", "images", "hbf-logo.png");
const outputPath = join(__dirname, "..", "public", "images", "hbf-logo-transparent.png");

// Read the image, extract raw pixel data, and replace white/near-white pixels with transparent
const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const threshold = 240; // pixels with R, G, B all above this become transparent

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // If pixel is white or near-white, make it fully transparent
  if (r >= threshold && g >= threshold && b >= threshold) {
    data[i + 3] = 0; // set alpha to 0
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(outputPath);

console.log(`✅ Transparent logo saved to: ${outputPath}`);
console.log(`   Size: ${info.width}x${info.height}`);
