import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, "..", "public", "images", "hbf-logo.png");
const outputPath = join(__dirname, "..", "public", "images", "hbf-logo-transparent.png");

const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Very aggressive: anything light becomes transparent
const hardThreshold = 210;
const softThreshold = 180;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  if (r >= hardThreshold && g >= hardThreshold && b >= hardThreshold) {
    data[i + 3] = 0;
  } else if (r >= softThreshold && g >= softThreshold && b >= softThreshold) {
    const avg = (r + g + b) / 3;
    const alpha = Math.round(255 * (1 - (avg - softThreshold) / (hardThreshold - softThreshold)));
    data[i + 3] = Math.min(data[i + 3], alpha);
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
