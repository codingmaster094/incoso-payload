import React from 'react'
import type { Thing, WithContext, Graph } from 'schema-dts'

type Props = {
    schema: Thing | WithContext<Thing> | Graph
}

export const Schema = ({ schema }: Props) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
