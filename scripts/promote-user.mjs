import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const email = process.argv[2] || process.env.EMAIL
if (!email) {
  console.error('Usage: node scripts/promote-user.mjs user@example.com')
  process.exit(1)
}

async function run() {
  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })

  const user = (found as any).docs?.[0]
  if (!user) {
    console.error('User not found:', email)
    process.exit(1)
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { roles: ['admin'] },
  })

  console.log('Promoted', email, 'to admin')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
