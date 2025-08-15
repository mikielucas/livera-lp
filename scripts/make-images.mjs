import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const files = [
  'feat-orange.jpg',
  'feat-lab.jpg',
  'feat-exercise.jpg',
  'feat-gummies.jpg',
];

console.log('🖼️  Generating high-resolution WebP images and blur placeholders...\n');

for (const file of files) {
  const inputPath = file;
  const baseName = path.basename(file, path.extname(file));

  try {
    // Generate high-resolution WebP (@2x)
    const webp2xPath = `${baseName}@2x.webp`;
    await sharp(inputPath)
      .resize(1400, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: 90,
        effort: 6
      })
      .toFile(webp2xPath);
    console.log(`✅ Generated: ${webp2xPath}`);

    // Generate high-resolution JPEG (@2x) as fallback
    const jpg2xPath = `${baseName}@2x.jpg`;
    await sharp(inputPath)
      .resize(1400, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 90,
        progressive: true
      })
      .toFile(jpg2xPath);
    console.log(`✅ Generated: ${jpg2xPath}`);

    // Generate blur placeholder
    const blurPath = `${baseName}-blur.jpg`;
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 30,
        progressive: false
      })
      .toFile(blurPath);
    console.log(`✅ Generated: ${blurPath}`);

  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

console.log('\n🎉 Image optimization complete!');
console.log('\n📝 Next steps:');
console.log('1. Add the generated @2x.webp files to your project');
console.log('2. Add the generated @2x.jpg files as fallbacks');
console.log('3. Add the generated -blur.jpg files for LQIP placeholders');
console.log('4. Update your HTML to use the <picture> element with WebP/JPEG sources');
