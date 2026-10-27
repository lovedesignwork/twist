import Image from 'next/image';
import type { ReactNode } from 'react';
import type { BlogImage } from '@/lib/types';

export const headingId = (text:string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
export function getHeadings(content:string) { return content.split('\n').filter(l=>l.startsWith('## ')).map(l=>({ title:l.slice(3), id:headingId(l.slice(3)) })); }
function safeHref(href:string) { return /^(https?:\/\/|\/(?!\/)|#|mailto:|tel:)/i.test(href) ? href : '#'; }
function inline(text:string):ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part,i)=>{
    const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if(link) return <a key={i} href={safeHref(link[2])}>{link[1]}</a>;
    if(part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2,-2)}</strong>;
    return part;
  });
}
export function ArticleFigure({ image, priority=false }: { image:BlogImage; priority?:boolean }) {
  return <figure className="article-figure">
    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) calc(100vw - 40px), 800px" priority={priority} loading={priority ? undefined : 'lazy'} className="w-full h-auto rounded-2xl" />
    <figcaption>{image.caption}</figcaption>
  </figure>;
}
export function ArticleContent({content,images}:{content:string;images:BlogImage[]}) {
  const lines=content.split('\n'); const out:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i].trim(); if(!line) continue;
    const heading=line.match(/^(#{2,3}) (.+)$/);
    if(heading) {
      const Tag=heading[1].length===2?'h2':'h3';out.push(<Tag id={headingId(heading[2])} key={i}>{inline(heading[2])}</Tag>);continue;
    }
    const match=line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if(match) { const img=images.find(m=>m.src===match[2]);if(img) out.push(<ArticleFigure image={img} key={i}/>);continue; }
    if(line.startsWith('|')) {
      const table:string[][]=[];const key=i;
      while(i<lines.length && lines[i].trim().startsWith('|')) {
        const row=lines[i].trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim());
        if(!row.every(c=>/^:?-+:?$/.test(c)))table.push(row);i++;
      }
      i--;out.push(<div className="article-table" role="region" aria-label="Comparison table" tabIndex={0} key={key}><table><thead><tr>{table[0].map((v,j)=><th scope="col" key={j}>{inline(v)}</th>)}</tr></thead><tbody>{table.slice(1).map((r,j)=><tr key={j}>{r.map((v,k)=><td key={k}>{inline(v)}</td>)}</tr>)}</tbody></table></div>);continue;
    }
    if(line.startsWith('- ')) {
      const items:string[]=[];const key=i;while(i<lines.length && lines[i].startsWith('- ')){items.push(lines[i].slice(2));i++;}i--;
      out.push(<ul key={key}>{items.map((v,j)=><li key={j}>{inline(v)}</li>)}</ul>);continue;
    }
    const para=[line];const key=i;
    while(i+1<lines.length && lines[i+1].trim() && !/^(#{2,3} |!\[|\||- )/.test(lines[i+1]))para.push(lines[++i]);
    out.push(<p key={key}>{inline(para.join(' '))}</p>);
  }
  return <div className="article-prose">{out}</div>;
}
