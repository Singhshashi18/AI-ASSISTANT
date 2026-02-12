

// import { useState, useEffect } from 'react'
// import { User, Mail } from 'lucide-react'
// import { useAuth } from '@/hooks/useAuth'

// export default function Settings() {
//   const { user } = useAuth()

//   const [form, setForm] = useState({
//     fullName: '',
//     organization: '',
//     contact: '',
//     email: '',
//   })

//   const [editing, setEditing] = useState(false)

//   // 🔹 Sync auth user → settings form
//   useEffect(() => {
//     if (user) {
//       setForm({
//         fullName: user.name || '',
//         email: user.email || '',
//         organization: user.organization || '',
//         contact: user.contact || '',
//       })
//     }
//   }, [user])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleClear = () => {
//     if (user) {
//       setForm({
//         fullName: user.name || '',
//         email: user.email || '',
//         organization: user.organization || '',
//         contact: user.contact || '',
//       })
//     }
//   }

//   const handleEdit = () => {
//     if (editing) {
//       // future: backend update API
//       console.log('Save profile:', form)
//     }
//     setEditing(!editing)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
//       <div className="max-w-7xl mx-auto px-8 py-10">

//         {/* HEADER CARD */}
//         <div className="mb-8 rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xl font-bold">
//               {form.fullName?.charAt(0)}
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h2 className="text-xl font-bold">
//                   {form.fullName || '—'}
//                 </h2>
//                 <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
//                   FREE
//                 </span>
//               </div>
//               <div className="mt-1 flex items-center gap-4 text-sm text-indigo-300">
//                 <span className="flex items-center gap-1">
//                   <Mail size={14} /> {form.email || '—'}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <User size={14} /> Individual
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-8">

//           {/* LEFT SIDEBAR */}
//           <div className="col-span-12 md:col-span-3">
//             <div className="rounded-2xl bg-[#0f172a] border border-indigo-800/40 overflow-hidden">
//               <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
//                 Profile Information
//               </button>
//               {/* <button className="w-full text-left px-5 py-4 text-indigo-300 hover:bg-indigo-900/40 transition">
//                 Change Password
//               </button> */}
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="col-span-12 md:col-span-9">
//             <div className="relative rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-8 overflow-hidden">

//               {/* DECOR */}
//               <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20" />
//               <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/20" />

//               <h3 className="text-2xl font-bold">
//                 Profile Information
//               </h3>
//               <p className="text-indigo-300 mt-1">
//                 Update your personal and organization details
//               </p>

//               <div className="mt-8 grid md:grid-cols-2 gap-6 relative z-10">

//                 {/* FULL NAME */}
//                 <div>
//                   <label className="block text-sm text-indigo-300 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     name="fullName"
//                     value={form.fullName}
//                     disabled={!editing}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
//                   />
//                 </div>

//                 {/* ORG NAME */}
//                 <div>
//                   <label className="block text-sm text-indigo-300 mb-2">
//                     Organization Name
//                   </label>
//                   <input
//                     name="organization"
//                     value={form.organization}
//                     disabled={!editing}
//                     onChange={handleChange}
//                     placeholder="Enter organization name"
//                     className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
//                   />
//                 </div>

//                 {/* CONTACT */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm text-indigo-300 mb-2">
//                     Contact Number
//                   </label>
//                   <input
//                     name="contact"
//                     value={form.contact}
//                     disabled={!editing}
//                     onChange={handleChange}
//                     placeholder="Enter contact number"
//                     className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
//                   />
//                 </div>

//                 {/* EMAIL */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm text-indigo-300 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     disabled
//                     value={form.email}
//                     className="w-full px-4 py-3 rounded-xl bg-black/30 border border-indigo-700/30 text-indigo-400 cursor-not-allowed"
//                   />
//                   <p className="text-xs text-indigo-400 mt-1">
//                     Email address cannot be changed
//                   </p>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-10 flex justify-end gap-4 relative z-10">
//                 <button
//                   onClick={handleClear}
//                   className="px-6 py-3 rounded-xl border border-indigo-600/40 text-indigo-300 hover:bg-indigo-900/40 transition"
//                 >
//                   Clear
//                 </button>
//                 <button
//                   onClick={handleEdit}
//                   className="px-6 py-3 rounded-xl font-semibold
//                   bg-gradient-to-r from-orange-500 to-orange-600
//                   hover:from-orange-400 hover:to-orange-500 transition"
//                 >
//                   {editing ? 'Save' : 'Edit'}
//                 </button>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }









import { useState, useEffect } from 'react'
import { User, Mail } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function Settings() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    fullName: '',
    organization: '',
    contact: '',
    email: '',
  })

  const [editing, setEditing] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // 🔹 Sync auth user → settings form
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.name || '',
        email: user.email || '',
        organization: user.organization || '',
        contact: user.contact || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleClear = () => {
    if (user) {
      setForm({
        fullName: user.name || '',
        email: user.email || '',
        organization: user.organization || '',
        contact: user.contact || '',
      })
    }
  }

  const handleEdit = () => {
    if (editing) {
      // 🔥 future: backend API call yahin hogi
      console.log('Save profile:', form)

      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
    setEditing(!editing)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER CARD */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xl font-bold">
              {form.fullName?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">
                  {form.fullName || '—'}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  FREE
                </span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-indigo-300">
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {form.email || '—'}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> Individual
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-[#0f172a] border border-indigo-800/40 overflow-hidden">
              <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
                Profile Information
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="relative rounded-2xl bg-[#0f172a] border border-indigo-800/40 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/20" />

              <h3 className="text-2xl font-bold">Profile Information</h3>
              <p className="text-indigo-300 mt-1">
                Update your personal and organization details
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-6 relative z-10">

                {/* FULL NAME */}
                <div>
                  <label className="block text-sm text-indigo-300 mb-2">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    disabled={!editing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                </div>

                {/* ORG NAME */}
                <div>
                  <label className="block text-sm text-indigo-300 mb-2">
                    Organization Name
                  </label>
                  <input
                    name="organization"
                    value={form.organization}
                    disabled={!editing}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                </div>

                {/* CONTACT */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-indigo-300 mb-2">
                    Contact Number
                  </label>
                  <input
                    name="contact"
                    value={form.contact}
                    disabled={!editing}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-indigo-300 mb-2">
                    Email Address
                  </label>
                  <input
                    disabled
                    value={form.email}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-indigo-700/30 text-indigo-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-indigo-400 mt-1">
                    Email address cannot be changed
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-10 flex justify-end gap-4 relative z-10">
                <button
                  onClick={handleClear}
                  className="px-6 py-3 rounded-xl border border-indigo-600/40 text-indigo-300 hover:bg-indigo-900/40 transition"
                >
                  Clear
                </button>
                <button
                  onClick={handleEdit}
                  className="px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-400 hover:to-orange-500 transition"
                >
                  {editing ? 'Save' : 'Edit'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ✅ TOAST */}
      {showToast && (
        <div
          className="fixed top-6 right-6 z-50
          bg-[#0f172a]
          border border-orange-500/40
          text-orange-300
          px-6 py-4
          rounded-xl
          shadow-2xl"
        >
          ✅ User info updated successfully
        </div>
      )}
    </div>
  )
}
