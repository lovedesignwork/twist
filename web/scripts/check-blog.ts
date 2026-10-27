import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import posts from '../src/data/blog-posts.json';
import ownership from '../content/image-ownership.json';
const used=new Set<string>();
for(const post of posts){
 const content=post.body_md.replace(/!\[[^\]]*\]\([^)]+\)/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[#*|]+|---+/g,' ');
 const words=content.trim().split(/\s+/).length;
 if(words<800||words>1600)throw new Error(`${post.slug}: ${words} words`);
 if(post.images.length<3||post.images.length>5)throw new Error('Expected 3–5 images');
 const bodyImages=[...post.body_md.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m=>m[1]);
 if(bodyImages.length!==post.images.length-1||bodyImages.includes(post.cover_url))throw new Error('Repeated or missing body image');
 if(new Set(post.images.map(i=>i.src)).size!==post.images.length)throw new Error('Duplicate article image');
 for(const img of post.images){
  const record=ownership.find(r=>r.src===img.src&&r.article===post.slug);
  if(!record||used.has(record.source_sha256))throw new Error('Missing or reused image ownership');used.add(record.source_sha256);
  const file=readFileSync('public'+img.src);
  if(createHash('sha256').update(file).digest('hex')!==record.output_sha256)throw new Error('Image checksum mismatch');
  if(file.length>250000||Math.max(img.width,img.height)>1600||!img.alt||!img.caption)throw new Error('Image size or description invalid');
  if(img.generated&&!img.caption.includes('editorial illustration'))throw new Error('Missing illustration label');
 }
 for(const link of post.body_md.matchAll(/(?<!!)\[[^\]]*\]\((\/blog\/[^)]+)\)/g))if(!posts.some(p=>'/blog/'+p.slug===link[1]))throw new Error('Broken internal article link');
 if(/^# /m.test(post.body_md))throw new Error('Duplicate H1');
 console.log(`${post.slug}: ${words} words; ${post.images.length} distinct optimized images`);
}
console.log('All blog seed and image ownership checks passed.');
