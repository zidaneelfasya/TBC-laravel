// "use client"

// import { useEffect, useState } from "react"
// import { usePage } from "@inertiajs/react"

// export function ErrorOverlay() {
//   const { props } = usePage()
//   const [show, setShow] = useState(false)
//   const [message, setMessage] = useState("")

//   useEffect(() => {
//     if (props.flash?.error) {
//       setMessage(props.flash.error)
//       setShow(true)
      
//       const timer = setTimeout(() => {
//         setShow(false)
//       }, 5000)
      
//       return () => clearTimeout(timer)
//     }
//   }, [props.flash?.error])

//   if (!show) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
//         <div className="flex items-center gap-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-5 w-5"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <line x1="12" x2="12" y1="8" y2="12" />
//               <line x1="12" x2="12.01" y1="16" y2="16" />
//             </svg>
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
//               Akses Ditolak
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {message}
//             </p>
//           </div>
//           <button
//             onClick={() => setShow(false)}
//             className="inline-flex h-8 w-8 items-center justify-center rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50 dark:focus:ring-gray-600"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="h-4 w-4"
//             >
//               <line x1="18" x2="6" y1="6" y2="18" />
//               <line x1="6" x2="18" y1="6" y2="18" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }