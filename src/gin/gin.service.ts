import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class GinService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async generateSampleData() {
    const titles = ["Sample Title", "Another Title", "Test Title", "Random Title"];
    const bodies = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    ];
  
    const batchSize = 1000; // Insert in batches to avoid overloading the database
    const totalRecords = 100000;
  
    for (let batch = 0; batch < totalRecords / batchSize; batch++) {
      const values = [];
      const params = [];
  
      for (let i = 0; i < batchSize; i++) {
        const title = titles[Math.floor(Math.random() * titles.length)];
        const body = bodies[Math.floor(Math.random() * bodies.length)];
        const searchText = `${title} ${body}`;
  
        values.push(`($${params.length + 1}, $${params.length + 2}, to_tsvector('english', $${params.length + 3}))`);
        params.push(title, body, searchText);
      }
  
      const query = `
        INSERT INTO articles (title, body, "searchText")
        VALUES ${values.join(", ")}
      `;
  
      await this.articleRepository.query(query, params); // Pass the parameters here
      console.log(`Inserted batch ${batch + 1} of ${batchSize} records...`);
    }
  
    console.log("Data generation complete.");
  }
  

  async searchArticles(query: string) {
    // Convert the user input into a tsquery-compatible format
    const tsQuery = query
      .split(' ') // Split the query into words
      .map(word => `${word}:*`) // Add the wildcard `:*` for partial matches
      .join(' & '); // Combine words with AND logic
    console.log(tsQuery);
    return await this.articleRepository.query(
      `
      SELECT id, title, body
      FROM articles
      WHERE "searchText" @@ to_tsquery('english', $1)
      ORDER BY ts_rank("searchText", to_tsquery('english', $1)) DESC
      LIMIT 20;
      `,
      [tsQuery],
    );
  }
  
}
