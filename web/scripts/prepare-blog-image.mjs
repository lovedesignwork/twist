// Usage: node scripts/prepare-blog-image.mjs input.jpg public/blog/article/photo.webp article-slug
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';
const [source,out,slug]=process.argv.slice(2);
if(!source||!out||!slug||!out.endsWith('.webp'))throw new Error('Provide input, output.webp and article slug');
const raw=await readFile(source);await mkdir(dirname(out),{recursive:true});
let buffer;let quality=88;
do{buffer=await sharp(raw).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality}).toBuffer();quality-=3;}while(buffer.length>250000&&quality>=62);
if(buffer.length>250000)throw new Error('Image still exceeds 250 KB; review dimensions/quality');
const {writeFile}=await import('node:fs/promises');await writeFile(out,buffer);
const meta=await sharp(buffer).metadata();const hash=b=>createHash('sha256').update(b).digest('hex');
console.log(JSON.stringify({article_slug:slug,source,source_sha256:hash(raw),output_sha256:hash(buffer),bytes:buffer.length,width:meta.width,height:meta.height,output:out},null,2));
