// Markdown 文章樣式
export const MarkdownStyles = `
  .article-content h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #D0C86D;
  }

  .article-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #34495E;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #eaeaea;
  }

  .article-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #34495E;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .article-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .article-content h5 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .article-content h6 {
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .article-content p {
    margin-bottom: 2rem;
    line-height: 1.8;
    color: #333;
  }

  .article-content ul, .article-content ol {
    margin-left: 1.5rem;
    margin-bottom: 2rem;
  }

  .article-content li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .article-content blockquote {
    border-left: 4px solid #D0C86D;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: #555;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 0 0.25rem 0.25rem 0;
    margin-bottom: 2rem;
  }

  .article-content code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9rem;
  }

  .article-content pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin-bottom: 2rem;
  }

  .article-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .article-content a {
    color: #D0C86D;
    text-decoration: none;
    transition: color 0.2s;
  }

  .article-content a:hover {
    color: #E67E22;
    text-decoration: underline;
  }

  .article-content hr {
    border: 0;
    height: 1px;
    background-color: #eaeaea;
    margin: 2.5rem 0;
  }

  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  .article-content th, .article-content td {
    border: 1px solid #eaeaea;
    padding: 0.75rem;
    text-align: left;
  }

  .article-content th {
    background-color: #f5f5f5;
    font-weight: 600;
  }

  .article-content tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
