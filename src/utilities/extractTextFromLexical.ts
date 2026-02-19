export function extractTextFromLexical(state: any): string {
    if (!state?.root?.children) return ''

    const extractFromNodes = (nodes: any[]): string => {
        return nodes
            .map((node) => {
                if (node.type === 'text') {
                    return node.text || ''
                }
                if (node.children) {
                    return extractFromNodes(node.children)
                }
                if (node.type === 'list' && node.children) {
                    return node.children.map((item: any) => `• ${extractFromNodes(item.children || [])}`).join('\n')
                }
                return ''
            })
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
    }

    return extractFromNodes(state.root.children)
}
