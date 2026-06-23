'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createStartup = async (newStartup) => {
  const res = await fetch(`${baseUrl}/api/myStartup`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(newStartup),
  })
  return res.json();
}