
import { fetch } from 'undici';

async function verify() {
    const url = 'https://incoso-payload-inky.vercel.app/';
    console.log(`Fetching ${url}...`);
    try {
        const res = await fetch(url);
        const html = await res.text();

        // Find ALL matches
        const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
        let match;
        let count = 0;

        while ((match = regex.exec(html)) !== null) {
            count++;
            const jsonString = match[1];
            try {
                const json = JSON.parse(jsonString);
                console.log(`✅ MATCH #${count}: Found Schema type "${json['@type']}"`);

                if (!json['@type']) {
                    if (json['@graph']) {
                        console.log(`ℹ️  It's a GRAPH structure! Contains types: ${json['@graph'].map(g => g['@type']).join(', ')}`);
                        console.log('FULL JSON:', JSON.stringify(json, null, 2));
                    } else {
                        console.log('⚠️  Structure unknown:', JSON.stringify(json, null, 2));
                    }
                }
            } catch (e) {
                console.log(`❌ MATCH #${count}: JSON Parsing FAILED`);
            }
        }

        if (count === 0) {
            console.log('❌ No Schema Markup found on LIVE site!');
        } else {
            console.log(`\n🎉 Total Schema scripts found: ${count}`);
        }

    } catch (e) {
        console.error('Error fetching page:', e);
    }
}

verify();
