import {
  FileSearch,
  Upload,
  Bot,
  ShieldCheck,
  Zap
} from 'lucide-react'

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* HEADER */}
        <div className="mb-10 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8">
          <h1 className="text-3xl font-bold text-orange-400">
            QueryX Documentation
          </h1>
          <p className="text-indigo-300 mt-2">
            Everything you need to build, search and chat with your data.
          </p>
        </div>

        {/* SECTION */}
        <Section
          icon={<Upload />}
          title="1. Uploading Documents"
          desc="Upload documents to generate embeddings and enable semantic search."
        >
          <Code>
{`POST /documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Fields:
- file (PDF, DOC, DOCX, TXT)
- title
- description (optional)`}
          </Code>
          <p className="text-indigo-300">
            Once uploaded, documents are automatically chunked and embedded
            using AI models for fast retrieval.
          </p>
        </Section>

        <Section
          icon={<FileSearch />}
          title="2. Semantic Search"
          desc="Search documents using meaning, not keywords."
        >
          <Code>
{`POST /search/query
{
  "query": "Explain vector embeddings"
}`}
          </Code>
          <p className="text-indigo-300">
            Results are ranked by semantic similarity using vector embeddings.
          </p>
        </Section>

        <Section
          icon={<Bot />}
          title="3. Ask AI"
          desc="Ask questions and get AI-generated answers with sources."
        >
          <Code>
{`POST /search/ask
{
  "question": "Summarize uploaded documents"
}`}
          </Code>
          <p className="text-indigo-300">
            AI responses are grounded in your uploaded documents only.
          </p>
        </Section>

        <Section
          icon={<Zap />}
          title="4. Performance & Scaling"
          desc="Designed for production workloads."
        >
          <ul className="list-disc pl-6 text-indigo-300 space-y-2">
            <li>Fast vector search</li>
            <li>Background embedding jobs</li>
            <li>Chunk-level caching</li>
            <li>Scales horizontally</li>
          </ul>
        </Section>

        <Section
          icon={<ShieldCheck />}
          title="5. Security"
          desc="Enterprise-grade security practices."
        >
          <ul className="list-disc pl-6 text-indigo-300 space-y-2">
            <li>JWT-based authentication</li>
            <li>User-isolated documents</li>
            <li>Encrypted storage</li>
            <li>Role-based access control</li>
          </ul>
        </Section>

      </div>
    </div>
  )
}


function Section({ icon, title, desc, children }) {
  return (
    <div className="mb-10 rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-8">
      <div className="flex items-center gap-3 mb-3 text-orange-400">
        {icon}
        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>
      </div>
      <p className="text-indigo-400 mb-4">
        {desc}
      </p>
      {children}
    </div>
  )
}

function Code({ children }) {
  return (
    <pre className="mb-4 rounded-xl bg-black/50 border border-orange-500/30 p-4 text-sm text-orange-300 overflow-x-auto">
      {children}
    </pre>
  )
}
