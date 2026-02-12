

import { useState } from 'react'
import { Mail, FileText, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Help() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('contact')

  const openDocs = () => navigate('/docs')

  const openMail = () => {
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=support@queryx.ai',
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Help & Support</h2>
            <p className="text-indigo-300 text-sm mt-1">
              We’re here to help you
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            SUPPORT
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-[#0f172a] border border-indigo-800/40 overflow-hidden">
              {[
                { id: 'contact', label: 'Contact Support' },
                { id: 'docs', label: 'Documentation' },
                { id: 'faqs', label: 'FAQs' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full text-left px-5 py-4 font-semibold transition ${
                    tab === item.id
                      ? 'text-orange-400 bg-orange-500/10 border-l-4 border-orange-500'
                      : 'text-indigo-300 hover:bg-indigo-900/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="relative rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/20" />

              {/* CONTACT */}
              {tab === 'contact' && (
                <>
                  <h3 className="text-2xl font-bold">Contact Support</h3>
                  <p className="text-indigo-300 mt-1">
                    Reach out to us anytime for help
                  </p>

                  <div className="mt-8 grid md:grid-cols-2 gap-6 relative z-10">
                    <div
                      onClick={openMail}
                      className="p-6 rounded-xl bg-black/40 border border-indigo-700/40
                      flex items-center gap-4 cursor-pointer
                      hover:bg-black/50 transition"
                    >
                      <Mail className="text-orange-400" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-indigo-300 text-sm">
                          support@queryx.ai
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DOCS */}
              {tab === 'docs' && (
                <>
                  <h3 className="text-2xl font-bold">Documentation</h3>
                  <p className="text-indigo-300 mt-1">
                    Developer guides & API docs
                  </p>

                  <div
                    onClick={openDocs}
                    className="mt-8 cursor-pointer p-6 rounded-xl
                    bg-black/40 border border-orange-500/40
                    hover:bg-black/50 transition flex items-center gap-4"
                  >
                    <FileText className="text-orange-400" />
                    <div>
                      <p className="font-semibold">Open Docs</p>
                      <p className="text-indigo-300 text-sm">
                        Full API & usage guide
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* FAQ */}
              {tab === 'faqs' && (
                <>
                  <h3 className="text-2xl font-bold">FAQs</h3>

                  <div className="mt-8 space-y-4">
                    <FAQ
                      q="How do I upload documents?"
                      a="Go to Upload page and add PDF, DOC or TXT files."
                    />
                    <FAQ
                      q="Is my data secure?"
                      a="Yes, your documents are private and encrypted."
                    />
                    <FAQ
                      q="Can I upgrade later?"
                      a="Yes, you can upgrade anytime from Billing."
                    />
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer p-5 rounded-xl
      bg-black/40 border border-orange-500/30
      hover:bg-black/50 transition"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold">{q}</p>
        <HelpCircle className="text-orange-400" size={18} />
      </div>

      {open && (
        <p className="text-indigo-300 text-sm mt-3">
          {a}
        </p>
      )}
    </div>
  )
}
