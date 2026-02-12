

// import { Gift, Link as LinkIcon, Users } from 'lucide-react'

// export default function Refer() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
//       <div className="max-w-7xl mx-auto px-8 py-10">

//         {/* HEADER CARD */}
//         <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-orange-400">
//               Refer & Earn
//             </h2>
//             <p className="text-orange-200/80 text-sm mt-1">
//               Invite friends and earn rewards
//             </p>
//           </div>

//           <div className="flex items-center gap-2 text-orange-300">
//             <Gift size={18} />
//             <span className="text-sm font-semibold">
//               Earn Credits
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-8">

//           {/* LEFT SIDEBAR */}
//           <div className="col-span-12 md:col-span-3">
//             <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 overflow-hidden">
//               <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
//                 Referral Program
//               </button>
//               <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
//                 Referral History
//               </button>
//               <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
//                 Rewards
//               </button>
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="col-span-12 md:col-span-9">
//             <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

//               {/* DECOR */}
//               <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/15" />
//               <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/15" />

//               <h3 className="text-2xl font-bold">
//                 Your Referral Link
//               </h3>
//               <p className="text-orange-200/80 mt-1">
//                 Share this link and earn credits when someone signs up
//               </p>

//               <div className="mt-6 relative z-10">
//                 <div className="flex items-center gap-4">
//                   <input
//                     readOnly
//                     value="https://queryx.ai/ref/your-id"
//                     className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-orange-500/30 text-orange-200"
//                   />
//                   <button
//                     className="px-6 py-3 rounded-xl font-semibold
//                     bg-gradient-to-r from-orange-500 to-orange-600
//                     hover:from-orange-400 hover:to-orange-500 transition"
//                   >
//                     Copy
//                   </button>
//                 </div>
//               </div>

//               {/* STATS */}
//               <div className="mt-10 grid md:grid-cols-3 gap-6 relative z-10">

//                 <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
//                   <div className="flex items-center gap-3 text-orange-300">
//                     <Users size={18} />
//                     <span>Total Referrals</span>
//                   </div>
//                   <p className="mt-2 text-2xl font-bold">0</p>
//                 </div>

//                 <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
//                   <div className="flex items-center gap-3 text-orange-300">
//                     <Gift size={18} />
//                     <span>Credits Earned</span>
//                   </div>
//                   <p className="mt-2 text-2xl font-bold">0</p>
//                 </div>

//                 <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
//                   <div className="flex items-center gap-3 text-orange-300">
//                     <LinkIcon size={18} />
//                     <span>Referral Status</span>
//                   </div>
//                   <p className="mt-2 text-lg font-semibold text-orange-300">
//                     Active
//                   </p>
//                 </div>

//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }






import { useEffect, useState } from 'react'
import { Gift, Link as LinkIcon, Users } from 'lucide-react'
import { authService } from '@/services/api'

export default function Refer() {
  const [refLink, setRefLink] = useState('')
  const [copied, setCopied] = useState(false)

  // stats (backend se later replace kar sakte ho)
  const [stats, setStats] = useState({
    referrals: 0,
    credits: 0,
    status: 'Active'
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authService.getCurrentUser()
        const userId =
          res.data?.user?._id ||
          res.data?._id ||
          res.data?.id

        if (userId) {
          setRefLink(`https://queryx.ai/ref/${userId}`)
        }
      } catch (err) {
        console.error('Failed to load user', err)
      }
    }

    loadUser()
  }, [])

  const copyLink = async () => {
    if (!refLink) return
    await navigator.clipboard.writeText(refLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER CARD */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-400">
              Refer & Earn
            </h2>
            <p className="text-orange-200/80 text-sm mt-1">
              Invite friends and earn rewards
            </p>
          </div>

          <div className="flex items-center gap-2 text-orange-300">
            <Gift size={18} />
            <span className="text-sm font-semibold">
              Earn Credits
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 overflow-hidden">
              <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
                Referral Program
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Referral History
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Rewards
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/15" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/15" />

              <h3 className="text-2xl font-bold">
                Your Referral Link
              </h3>
              <p className="text-orange-200/80 mt-1">
                Share this link and earn credits when someone signs up
              </p>

              {/* LINK */}
              <div className="mt-6 relative z-10">
                <div className="flex items-center gap-4">
                  <input
                    readOnly
                    value={refLink || 'Loading...'}
                    className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-orange-500/30 text-orange-200"
                  />
                  <button
                    onClick={copyLink}
                    className="px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500 transition"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-10 grid md:grid-cols-3 gap-6 relative z-10">

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Users size={18} />
                    <span>Total Referrals</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {stats.referrals}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Gift size={18} />
                    <span>Credits Earned</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {stats.credits}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <LinkIcon size={18} />
                    <span>Referral Status</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-orange-300">
                    {stats.status}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
