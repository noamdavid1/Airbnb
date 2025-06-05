// import { eventBus } from '../services/event-bus.service'
// import { useState, useEffect, useRef } from 'react'

// export function UserMsg() {
// 	const [msg, setMsg] = useState(null)
// 	// const timeoutIdRef = useRef()

// 	useEffect(() => {
// 		const unsubscribe = eventBus.on('show-msg', msg => {
// 			setMsg(msg)
// 			// if (timeoutIdRef.current) {
// 			// 	timeoutIdRef.current = null
// 			// 	clearTimeout(timeoutIdRef.current)
// 			// }
// 			// timeoutIdRef.current = setTimeout(closeMsg, 3000)
// 			setTimeout(() => setMsg(null), 3000)
// 		})

// 		return () => {
// 			unsubscribe()
// 		}
// 	}, [])

// 	function closeMsg() {
// 		setMsg(null)
// 	}

//     function msgClass() {
//         return msg ? 'visible' : ''
//     }
// 	return (
// 		<section className={`user-msg ${msg?.type} ${msgClass()}`}>
// 			<button onClick={closeMsg}>x</button>
// 			{msg?.txt}
// 		</section>
// 	)
// }
import { useEffect, useState } from 'react'
import { eventBus, SHOW_MSG } from '../services/event-bus.service'

export function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBus.on(SHOW_MSG, (msg) => {
      setMsg(msg)
      setTimeout(() => setMsg(null), 3000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (!msg) return null

  return (
    <div className={`user-msg ${msg.type}`}>
      {msg.txt}
    </div>
  )
}