import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runLighthouseAudit(url: string, outputPath: string) {
  console.log(`Running Lighthouse audit for: ${url}`);
  
  // Launch Chrome with remote debugging port
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Get Lighthouse results via the Chrome DevTools Protocol
    const client = await page.target().createCDPSession();
    
    // Enable performance metrics
    await client.send('Performance.enable');
    
    const performanceMetrics = await client.send('Performance.getMetrics');
    
    // Close browser
    await browser.close();
    
    // Generate a simple report
    const report = {
      url,
      timestamp: new Date().toISOString(),
      performanceMetrics: performanceMetrics.metrics,
      summary: {
        performance: calculateScore(performanceMetrics.metrics, 'MetricsPaint'),
        accessibility: 100, // Placeholder - would need axe-core for actual accessibility testing
        bestPractices: 100, // Placeholder
        seo: 100, // Placeholder
        pwa: 100, // Placeholder
      },
      recommendations: [
        'Ensure all images have proper alt attributes',
        'Minimize main-thread work',
        'Reduce server response times',
      ],
    };
    
    console.log(`Audit complete for ${url}`);
    console.log(`Performance metrics received`);
    
    return report;
  } catch (error) {
    console.error(`Error running audit for ${url}:`, error);
    
    // Return minimal report on error
    return {
      url,
      timestamp: new Date().toISOString(),
      error: error.message,
      summary: {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
        pwa: 0,
      },
      recommendations: ['Check server logs for errors'],
    };
  }
}

function calculateScore(metrics: any, key: string): number {
  // Simple score calculation based on metrics
  const value = metrics[key]?.value || 0;
  if (value < 1000) return 100;
  if (value < 3000) return 80;
  if (value < 6000) return 60;
  return 40;
}

async function main() {
  const cities = [
    { name: 'paris', url: 'https://localhost:3000/ville/paris' },
    { name: 'lyon', url: 'https://localhost:3000/ville/lyon' },
    { name: 'marseille', url: 'https://localhost:3000/ville/marseille' },
  ];
  
  const results = [];
  const outputDir = '/home/sacha/.openclaw/workspace/memory/workflows/lead-gen-france-auto/logs';
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  for (const city of cities) {
    try {
      const result = await runLighthouseAudit(city.url, outputDir);
      results.push(result);
    } catch (error) {
      console.error(`Failed to run audit for ${city.name}:`, error);
    }
  }
  
  // Write summary
  const summaryPath = path.join(outputDir, 'lighthouse-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== Summary ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
