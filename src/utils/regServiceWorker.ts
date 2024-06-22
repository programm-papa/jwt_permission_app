export default async function regServiceWorker() {
  try {
    // @ts-ignore
    const reg = await navigator.serviceWorker.register('/sw.js')
    console.log(`Registration scope: ${reg.scope}`)
  } catch (e) {
    console.log(e)
  }
}
