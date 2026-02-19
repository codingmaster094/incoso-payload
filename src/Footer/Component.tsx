import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Footer } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import type { Media } from '@/payload-types'
export async function Footer() {
  const payload = await getPayload({ config: configPromise })

  const footerData = (await payload.findGlobal({
    slug: 'footer',
    depth: 2,
    draft: true,
  })) as Footer

  return (
    <footer className="bg-sky py-38 xl:pb-133 px-16 sm:px-67 text-sm font-medium">
      <div className="flex flex-wrap gap-30 gap-x-80">
        <div className="flex flex-col justify-between">
          <h2 className="text-18 font-semibold mb-13 xl:mb-26">{footerData.Kontakt_zu_Incoso}</h2>

          <Link href="#" className="flex items-center gap-10 font-semibold">
            <span>{footerData.Kontaktformular}</span>
            <Image src="/image/right-icon.svg" alt="" width={14} height={14} />
          </Link>
        </div>

        <div>
          <h2 className="text-18 font-semibold mb-13 xl:mb-26">Folgen Sie uns</h2>

          <div className="flex items-center gap-25">
            {footerData?.socials?.map((social, index) => {
              const icon =
                typeof social.social_icon === 'object' ? (social.social_icon as Media) : null

              if (!icon?.url || !social.social_url?.url) return null

              return (
                <Link
                  key={index}
                  aria-label={social.social_url.label || 'Social Link'}
                  href={social.social_url.url}
                  target={social.social_url.target || '_blank'}
                  rel="noopener noreferrer"
                >
                  <Image src={icon.url} alt={icon.alt || 'Social Icon'} width={28} height={28} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <hr className="border-stroke my-25 xl:my-50" />

      <div className="text max-w-910 mb-23 space-y-4" dangerouslySetInnerHTML={{ __html: footerData.description_html || '' }}>
      </div>

      <div className="flex flex-wrap items-start justify-between leading-relaxed gap-12">
        <ul className="flex flex-wrap max-w-650 gap-y-6">
          {
            footerData.privacy?.map((item, index) => {
              return (
                <li key={index} className="pr-8 mr-8 border-r last:border-none">{item.items}</li>
              )
            })
          }
        </ul>

        <p>© Copyright {new Date().getFullYear()} {footerData.copyright}</p>
      </div>
    </footer>
  )
}
