// src/pages/sitemap-index.xml.ts
// put.in coffee · XML Sitemap (Astro endpoint)
// Served at /sitemap-index.xml

export async function GET() {
    const base = 'https://www.putincoffee.com';
    const now  = new Date().toISOString().split('T')[0];
  
    const urls = [
      { loc: `${base}/`,               priority: '1.0', changefreq: 'weekly',  lastmod: now },
      { loc: `${base}/#about`,         priority: '0.8', changefreq: 'monthly', lastmod: now },
      { loc: `${base}/#menu`,          priority: '0.9', changefreq: 'weekly',  lastmod: now },
      { loc: `${base}/#reviews`,       priority: '0.7', changefreq: 'weekly',  lastmod: now },
      { loc: `${base}/#location`,      priority: '0.8', changefreq: 'monthly', lastmod: now },
      { loc: `${base}/#contact`,       priority: '0.8', changefreq: 'monthly', lastmod: now },
      { loc: `${base}/privacy`,        priority: '0.3', changefreq: 'yearly',  lastmod: now },
      { loc: `${base}/terms`,          priority: '0.3', changefreq: 'yearly',  lastmod: now },
    ];
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${base}/sitemap-0.xml</loc>
      <lastmod>${now}</lastmod>
    </sitemap>
  </sitemapindex>`;
  
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }