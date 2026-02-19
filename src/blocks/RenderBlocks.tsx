import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Hero_Image } from '@/blocks/Hero_Image/Component'
import { Unser_ansatz } from '@/blocks/Unser_Ansatz/Component'
import { Unsere_Boxes } from '@/blocks/Unsere_Boxes/Component'
import { Unsere_Kultur } from '@/blocks/Unsere_Kultur/Component'
import { Zwei_geschaftsbereiche } from '@/blocks/Zwei_geschaftsbereiche/Component'
import { Fuhrung_Governance } from '@/blocks/Fuhrung_Governance/Component'
import { Intro_section } from '@/blocks/Intro_section/Component'
import { Was_Wir_Tun } from '@/blocks/Was_wir_tun/Component'
import { Latestnews } from '@/blocks/Latest_news/Component'
import { Latest_news_without_img } from '@/blocks/Latest_news_without_img/Component'
import { News_Hero_section } from '@/blocks/News_hero_section/Component'
import { NEWS_CTA } from '@/blocks/News_content_cta/Component'
import { News_Content_Faq } from '@/blocks/News_content_faq/Component'
import { News_Content_Kosten } from '@/blocks/News_content_Kosten/Component'
import { News_Kurvige_Lifte } from '@/blocks/News_Content_Kurvige_Lifte/Component'
import { Das_Wichtigste } from '@/blocks/Das_Wichtigste/Component'


const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  hero_image: Hero_Image,
  unser_ansatz: Unser_ansatz,
  unsere_boxes: Unsere_Boxes,
  unsere_kultur: Unsere_Kultur,
  zwei_geschaftsbereiche: Zwei_geschaftsbereiche,
  fuhrung_governance: Fuhrung_Governance,
  intro_section: Intro_section,
  was_wir_tun: Was_Wir_Tun,
  latest_news: Latestnews,
  latest_news_without_img: Latest_news_without_img,
  news_hero_section: News_Hero_section,
  news_content_cta: NEWS_CTA,
  news_content_faq:News_Content_Faq,
  news_content_kosten: News_Content_Kosten,
  kurvige_lifte:News_Kurvige_Lifte,
  das_wichtigste: Das_Wichtigste,
}

// Lexical node type (for rich text)
type LexicalNode = {
  type: string
  text?: string
  tag?: string
  children?: LexicalNode[]
  fields?: {
    id?: string
    blockType?: string
    [key: string]: any
  }
  [key: string]: any
}

type RenderBlocksProps = {
  blocks: LexicalNode[] | Page['layout']  // ← SUPPORTS BOTH
  isLexical?: boolean  // ← NEW FLAG
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ 
  blocks, 
  isLexical = false 
}) => {
  if (!blocks || !Array.isArray(blocks)) return null

  // HANDLE PAGE LAYOUT BLOCKS (your original pages)
  if (!isLexical && blocks[0]?.blockType) {
    return (
      <Fragment>
        {blocks.map((block: any, index: number) => {
          const BlockComponent = blockComponents[block.blockType as keyof typeof blockComponents]
          if (BlockComponent) {
            return React.createElement(BlockComponent as any, {
              key: block.id || `block-${index}`,
              ...block
            })
          }
          return null
        })}
      </Fragment>
    )
  }

  // HANDLE LEXICAL RICH TEXT NODES (news content)
  const renderLexicalNode = (node: LexicalNode, key: React.Key): React.ReactNode => {
    // Your existing lexical rendering logic...
    if (node.type === 'text' || node.type === 'paragraph' || node.tag) {
      const textContent = node.children?.[0]?.text || node.text || ''
      const Tag = node.tag === 'h2' ? 'h2' : node.tag === 'h3' ? 'h3' : node.type === 'paragraph' ? 'p' : 'div'
      return (
        <Tag
          key={key}
          className={node.tag ? `text-${node.tag === 'h2' ? '2xl' : 'xl'} font-bold mb-4` : 'mb-4'}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      )
    }

    if (node.type === 'linebreak') return <br key={key} />
    if (node.type === 'horizontalrule') return <hr key={key} className="my-8 border-gray-300" />

    if (node.type === 'quote') {
      const quoteText = node.children
        ?.map((child: LexicalNode) => child.children?.[0]?.text || child.text || '')
        .join(' ')
      return (
        <blockquote key={key} className="border-l-4 border-gray-300 pl-6 py-4 my-8 italic bg-gray-50 rounded-r-lg">
          {quoteText}
        </blockquote>
      )
    }

    // Lexical custom blocks
    if (node.type === 'block' && typeof node.fields?.blockType === 'string') {
      const BlockComponent = blockComponents[node.fields.blockType as keyof typeof blockComponents]
      if (BlockComponent && node.fields.id) {
        return React.createElement(BlockComponent as any, {
          key: node.fields.id,
          ...node.fields,
        })
      }
    }

    if (node.type === 'list' && node.children) {
      return (
        <ul key={key} className="list-disc pl-8 my-6 space-y-2">
          {node.children.map((item: LexicalNode, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item.children?.[0]?.text || item.text || '' }} />
          ))}
        </ul>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={key} dangerouslySetInnerHTML={{ __html: node.children?.[0]?.text || node.text || '' }} />
      )
    }

    return null
  }

  return <Fragment>{(blocks as any[]).map((node, index) => renderLexicalNode(node as LexicalNode, `node-${index}`))}</Fragment>

}
