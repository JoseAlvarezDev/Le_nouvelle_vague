import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Manual env reading to avoid dependency
const envPath = path.join(ROOT_DIR, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const TMDB_API_KEY = envContent.match(/VITE_TMDB_API_KEY\s*=\s*(.*)/)?.[1]?.trim();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
    console.error('Missing VITE_TMDB_API_KEY in .env');
    process.exit(1);
}

const axiosInstance = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
    }
});

async function searchTMDB(query, type = 'movie') {
    try {
        const response = await axiosInstance.get(`/search/${type}`, {
            params: { query }
        });
        return response.data.results[0];
    } catch (error) {
        console.error(`Error searching for ${query}:`, error.message);
        return null;
    }
}

async function getPersonDetails(id) {
    try {
        const response = await axiosInstance.get(`/person/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting person details ${id}:`, error.message);
        return null;
    }
}

function parseAgentFile() {
    const filePath = path.join(ROOT_DIR, 'agent.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Split by the emoji headers which are more reliable
    const directorsPart = content.split('🎬 Directores')[1]?.split('🎭 Actores')[0];
    const actorsPart = content.split('🎭 Actores')[1]?.split('🎞️ Películas')[0];
    const moviesPart = content.split('🎞️ Películas')[1];

    const directors = extractList(directorsPart);
    const actors = extractList(actorsPart);
    const movies = extractList(moviesPart);

    console.log(`Parsed: ${directors.length} directors, ${actors.length} actors, ${movies.length} movies`);
    return { directors, actors, movies };
}

function extractList(section) {
    if (!section) return [];
    return section.split('\n')
        .filter(line => /^\s*\d+\.\s+/.test(line) || /^\s*\d+\.\t+/.test(line) || /^\s*\t\d+\./.test(line))
        .map(line => {
            let name = line.replace(/^\s*[\d\.\t\s]+/, '').trim();
            // Remove parenthetical notes BUT keep (YYYY) for filtering logic
            name = name.replace(/\s*\((?!\d{4}).*?\)/, '').trim();
            return name;
        });
}

async function processEntities(items, type, targetFile) {
    console.log(`Processing ${type} for ${targetFile}...`);
    const results = [];

    for (const item of items) {
        // Rate limiting
        await new Promise(r => setTimeout(r, 200));

        let query = item;
        let yearFilter = null;

        if (type === 'movie') {
            const yearMatch = item.match(/\((\d{4})\)/);
            if (yearMatch) {
                yearFilter = parseInt(yearMatch[1]);
                query = item.replace(/\s*\(\d{4}\)/, '').trim();

                // STRICT FILTER: Only pre-1970
                if (yearFilter > 1970) {
                    console.log(`Skipping post-1970 movie: ${item}`);
                    continue;
                }
            }
        }

        const result = await searchTMDB(query, type === 'movie' ? 'movie' : 'person');

        if (result) {
            console.log(`Found: ${query} -> ${result.id}`);

            let description = '';
            if (type === 'movie') {
                description = result.overview;
            } else {
                const details = await getPersonDetails(result.id);
                description = details?.biography || '';

                // FILTER: Only include if they were relevant (simplified check for birth year or active period)
                // For actors/directors, we mostly trust the agent.md list which is curated, 
                // but we can check if they have a birthday before 1955 to ensure they are from the era.
                if (details?.birthday) {
                    const birthYear = parseInt(details.birthday.split('-')[0]);
                    if (birthYear > 1955) {
                        console.log(`Skipping possibly post-era person: ${query} (born ${birthYear})`);
                        continue;
                    }
                }
            }

            results.push({
                id: result.id,
                name: result.title || result.name,
                description: description.length > 300 ? description.substring(0, 300) + '...' : description
            });
        } else {
            console.log(`Not Found: ${query}`);
        }
    }

    const constantName = targetFile.includes('movie') ? 'NOUVELLE_VAGUE_MOVIES' :
        targetFile.includes('directors') ? 'NOUVELLE_VAGUE_DIRECTORS' : 'NOUVELLE_VAGUE_ACTORS';

    const fileContent = `export const ${constantName} = ${JSON.stringify(results, null, 4)};\n`;
    fs.writeFileSync(path.join(ROOT_DIR, targetFile), fileContent);
    console.log(`Wrote ${results.length} items to ${targetFile}`);
}

async function main() {
    const { directors, actors, movies } = parseAgentFile();

    await processEntities(directors, 'person', 'src/data/directors.ts');
    await processEntities(actors, 'person', 'src/data/actors.ts');
    await processEntities(movies, 'movie', 'src/data/movies_list.ts');

    console.log('Ingestion complete!');
}

main().catch(console.error);
